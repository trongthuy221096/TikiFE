import { Flex, Form, Image, Radio } from "antd";
import React, { useEffect, useState } from "react";
import {
    WrapperInfo,
    WrapperLabelText,
    WrapperLeft,
    WrapperNameProductText,
    WrapperPriceText,
    WrapperProduct,
    WrapperRadio,
    WrapperRight,
    WrapperTotal,
} from "./style";

import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../ultils";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import UseMutationHook from "../../hooks/UseMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import * as PaymentService from "../../services/PaymentService";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slice/UserSlide";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slice/orderSlide";
import { PayPalButton } from "react-paypal-button-v2";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { WrapperOrder } from "../OrderPage/style";

const PaymentPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);

    const [delivery, setDelivery] = useState("fast");
    const [payment, setPayment] = useState("later_money");
    const navigate = useNavigate();
    const [sdkReady, setSdkReady] = useState(false);

    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true);
    };

    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSlected?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [order]);

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSlected?.reduce((total, cur) => {
            const totalDiscount = cur.discount ? cur.discount : 0;
            return total + (priceMemo * (totalDiscount * cur.amount)) / 100;
        }, 0);
        if (Number(result)) {
            return result;
        }
        return 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order]);

    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo >= 20000 && priceMemo < 500000) {
            return 10000;
        } else if (
            priceMemo >= 500000 ||
            order?.orderItemsSlected?.length === 0
        ) {
            return 0;
        } else {
            return 20000;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
        return (
            Number(priceMemo) -
            Number(priceDiscountMemo) +
            Number(diliveryPriceMemo)
        );
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

    const handleAddOrder = () => {
        if (
            user?.access_token &&
            order?.orderItemsSlected &&
            user?.name &&
            user?.address &&
            user?.phone &&
            priceMemo &&
            user?.id
        ) {
            // eslint-disable-next-line no-unused-expressions
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.orderItemsSlected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: diliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                email: user?.email,
                delivery: delivery,
            });
        }
    };

    const mutationUpdate = UseMutationHook((data) => {
        const res = UserService.updateUser(data.id, data.values, data.token);
        return res;
    });

    const mutationAddOrder = UseMutationHook((data) => {
        const { token, ...rests } = data;
        const res = OrderService.createOrder({ ...rests }, token);
        return res;
    });

    const { isPending } = mutationUpdate;

    const { data: dataAdd, isSuccess, isError } = mutationAddOrder;

    useEffect(() => {
        if (isSuccess && dataAdd?.status === "OK") {
            const arrayOrdered = [];
            order?.orderItemsSlected?.forEach((element) => {
                arrayOrdered.push(element.product);
            });
            dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
            message.success("Đặt hàng thành công");
            navigate("/myorder", {
                state: {
                    delivery,
                    payment,
                    orders: order?.orderItemsSlected,
                    totalPriceMemo: totalPriceMemo,
                },
            });
        } else if (isError) {
            message.error();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError]);

    const handleCancleUpdate = () => {
        form.setFieldsValue(user);
        setIsOpenModalUpdateInfo(false);
    };

    const onSuccessPaypal = (details, data) => {
        mutationAddOrder.mutate({
            token: user?.access_token,
            orderItems: order?.orderItemsSlected,
            fullName: user?.name,
            address: user?.address,
            phone: user?.phone,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: diliveryPriceMemo,
            totalPrice: totalPriceMemo,
            user: user?.id,
            isPaid: true,
            paidAt: details.update_time,
            email: user?.email,
        });
    };
    const handleUpdateInforUser = () => {
        form.submit();
    };

    const onFinish = (values) => {
        mutationUpdate.mutate(
            {
                id: user?.id,
                values,
                token: user?.access_token,
            },
            {
                onSuccess: () => {
                    dispatch(updateUser({ ...values }));
                    setIsOpenModalUpdateInfo(false);
                },
            }
        );
    };

    const handleDilivery = (e) => {
        setDelivery(e.target.value);
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
    };

    const addPaypalScript = async () => {
        const { data } = await PaymentService.getConfig();
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSdkReady(true);
        }
    }, []);
    useEffect(() => {
        form.setFieldsValue(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
            {/* <LoadingComponent isLoading={isLoadingAddOrder}> */}
            <div
                style={{
                    height: "100%",
                    width: "1270px",
                    margin: "0 auto",
                }}
            >
                <WrapperOrder>Thanh toán</WrapperOrder>
                <div style={{ display: "flex" }}>
                    <WrapperLeft>
                        <Flex vertical gap={16}>
                            <WrapperInfo>
                                <WrapperLabelText>
                                    Sản phẩm đã chọn
                                </WrapperLabelText>
                                <WrapperProduct>
                                    <Flex vertical style={{ width: "100%" }}>
                                        {order &&
                                            order.orderItemsSlected?.map(
                                                (item, index) => (
                                                    <Flex
                                                        key={index}
                                                        align="center"
                                                        gap={8}
                                                        style={{
                                                            width: "100%",
                                                            margin: "10px 0",
                                                        }}
                                                    >
                                                        <Image
                                                            src={item.image}
                                                            style={{
                                                                maxHeight:
                                                                    "64px",
                                                                border: "1px solid #ccc",
                                                                borderRadius:
                                                                    "6px",
                                                            }}
                                                            preview={false}
                                                        ></Image>
                                                        <Flex
                                                            vertical
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                            gap={8}
                                                        >
                                                            <WrapperNameProductText>
                                                                {item.name}
                                                            </WrapperNameProductText>
                                                            <Flex justify="space-between">
                                                                <WrapperNameProductText>
                                                                    SL : x
                                                                    {
                                                                        item.amount
                                                                    }
                                                                </WrapperNameProductText>
                                                                <WrapperPriceText>
                                                                    {convertPrice(
                                                                        item.price *
                                                                            item.amount
                                                                    )}
                                                                    <sup>₫</sup>
                                                                </WrapperPriceText>
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                )
                                            )}
                                    </Flex>
                                </WrapperProduct>
                            </WrapperInfo>

                            <WrapperInfo>
                                <div>
                                    <WrapperLabelText>
                                        Chọn phương thức giao hàng
                                    </WrapperLabelText>
                                    <WrapperRadio
                                        onChange={handleDilivery}
                                        value={delivery}
                                    >
                                        <Radio value="fast">
                                            <span
                                                style={{
                                                    color: "#ea8500",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                FAST
                                            </span>{" "}
                                            Giao hàng tiết kiệm
                                        </Radio>
                                        <Radio value="gojek">
                                            <span
                                                style={{
                                                    color: "#ea8500",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                GO_JEK
                                            </span>{" "}
                                            Giao hàng tiết kiệm
                                        </Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <WrapperLabelText>
                                        Chọn phương thức thanh toán
                                    </WrapperLabelText>
                                    <WrapperRadio
                                        onChange={handlePayment}
                                        value={payment}
                                    >
                                        <Radio value="later_money">
                                            Thanh toán tiền mặt khi nhận hàng
                                        </Radio>
                                        <Radio value="paypal">
                                            Thanh toán tiền bằng paypal
                                        </Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                        </Flex>
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{ width: "100%" }}>
                            <WrapperInfo>
                                <div>
                                    <span>Địa chỉ: </span>
                                    <span style={{ fontWeight: "bold" }}>
                                        {user?.address}
                                    </span>
                                    <span
                                        onClick={handleChangeAddress}
                                        style={{
                                            color: "#9255FD",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Thay đổi
                                    </span>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>Tạm tính</span>
                                    <span
                                        style={{
                                            color: "#000",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {convertPrice(priceMemo)}
                                        <sup>₫</sup>
                                    </span>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>Phí giao hàng</span>
                                    <span
                                        style={{
                                            color: "#000",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {convertPrice(diliveryPriceMemo)}
                                        <sup>₫</sup>
                                    </span>
                                </div>
                            </WrapperInfo>
                            <WrapperTotal>
                                <span>Tổng tiền</span>
                                <span
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "rgb(254, 56, 52)",
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {convertPrice(totalPriceMemo)}
                                        <sup>₫</sup>
                                    </span>
                                    <span
                                        style={{
                                            color: "#000",
                                            fontSize: "11px",
                                        }}
                                    >
                                        (Đã bao gồm VAT nếu có)
                                    </span>
                                </span>
                            </WrapperTotal>
                        </div>

                        {payment === "paypal" && sdkReady ? (
                            <div style={{ width: "320px" }}>
                                <PayPalButton
                                    amount={(totalPriceMemo / 24000).toFixed(2)}
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={onSuccessPaypal}
                                    onError={() => {
                                        alert("Erroe");
                                    }}
                                />
                            </div>
                        ) : (
                            <ButtonComponent
                                onClick={() => handleAddOrder()}
                                size={40}
                                styleButton={{
                                    background: "rgb(255, 57, 69)",
                                    height: "48px",
                                    width: "320px",
                                    border: "none",
                                    borderRadius: "4px",
                                }}
                                textbutton={"Đặt hàng"}
                                styleTextButton={{
                                    color: "#fff",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                }}
                            ></ButtonComponent>
                        )}
                    </WrapperRight>
                </div>
            </div>
            <ModalComponent
                title="Cập nhật thông tin giao hàng"
                open={isOpenModalUpdateInfo}
                onCancel={handleCancleUpdate}
                onOk={handleUpdateInforUser}
            >
                <LoadingComponent isPending={isPending}>
                    <Form
                        name="basic"
                        autoComplete="on"
                        form={form}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your name!",
                                },
                            ]}
                        >
                            <InputComponent
                                name="name"
                                style={{ height: "36px" }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your  phone!",
                                },
                            ]}
                        >
                            <InputComponent
                                name="phone"
                                style={{ height: "36px" }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your  address!",
                                },
                            ]}
                        >
                            <InputComponent
                                name="address"
                                style={{ height: "36px" }}
                            />
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </ModalComponent>
            {/* </LoadingComponent> */}
        </div>
    );
};

export default PaymentPage;
