import { useDispatch, useSelector } from "react-redux";
import {
    CustomCheckbox,
    WrapperCountOrder,
    WrapperInfo,
    WrapperItemOrder,
    WrapperLeft,
    WrapperListOrder,
    WrapperOrder,
    WrapperRight,
    WrapperStyleHeader,
    WrapperStyleHeaderDilivery,
    WrapperTotal,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import StepComponent from "../../components/StepConponent/StepComponent";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Image } from "antd";
import {
    decreaseAmount,
    increaseAmount,
    removeAllOrderProduct,
    removeOrderProduct,
    selectedOrder,
} from "../../redux/slice/orderSlide";
import { WrapperInputNumber } from "../../components/StepConponent/style";
import { convertPrice } from "../../ultils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import UseMutationHook from "../../hooks/UseMutationHook";
import * as UserService from "../../services/UserService";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { updateUser } from "../../redux/slice/UserSlide";
import * as message from "../../components/Message/Message";

const OrderPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);

    const [listChecked, setListChecked] = useState([]);
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

    const mutationUpdate = UseMutationHook((data) => {
        const res = UserService.updateUser(data.id, data.values, data.token);
        return res;
    });
    const { isPending } = mutationUpdate;
    const itemsDelivery = [
        {
            title: "20.000 VND",
            description: "Dưới 200.000 VND",
        },
        {
            title: "10.000 VND",
            description: "Từ 200.000 VND đến dưới 500.000 VND",
        },
        {
            title: "Free ship",
            description: "Trên 500.000 VND",
        },
    ];
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
        // eslint-disable-next-line no-use-before-define
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

    const handleAddCard = () => {
        if (!order?.orderItemsSlected?.length) {
            message.error("Vui lòng chọn sản phẩm");
        } else if (!user?.phone || !user.address || !user.name) {
            setIsOpenModalUpdateInfo(true);
        } else {
            navigate("/payment");
        }
    };

    const handleChangeCount = (type, idProduct, limited) => {
        if (type === "increase") {
            if (!limited) {
                dispatch(increaseAmount({ idProduct }));
            }
        } else {
            if (!limited) {
                dispatch(decreaseAmount({ idProduct }));
            }
        }
    };
    const handleOnchangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = [];
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product);
            });

            setListChecked(newListChecked);
        } else {
            setListChecked([]);
        }
    };

    const handleCancleUpdate = () => {
        form.setFieldsValue(user);
        setIsOpenModalUpdateInfo(false);
    };

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true);
    };

    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }));
        }
    };

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter(
                (item) => item !== e.target.value
            );
            setListChecked(newListChecked);
        } else {
            setListChecked([...listChecked, e.target.value]);
        }
    };

    useEffect(() => {
        dispatch(selectedOrder({ listChecked }));
    }, [dispatch, listChecked]);

    useEffect(() => {
        form.setFieldsValue(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    return (
        <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
            <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
                <WrapperOrder>Giỏ hàng</WrapperOrder>
                <div style={{ display: "flex" }}>
                    <WrapperLeft>
                        <WrapperStyleHeaderDilivery>
                            <h4>Phí giao hàng</h4>
                            <StepComponent
                                items={itemsDelivery}
                                current={
                                    diliveryPriceMemo === 10000
                                        ? 2
                                        : diliveryPriceMemo === 20000
                                        ? 1
                                        : order.orderItemsSlected.length === 0
                                        ? 0
                                        : 3
                                }
                            />
                        </WrapperStyleHeaderDilivery>
                        <WrapperStyleHeader>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "390px",
                                }}
                            >
                                <CustomCheckbox
                                    onChange={handleOnchangeCheckAll}
                                    checked={
                                        listChecked?.length ===
                                        order?.orderItems?.length
                                    }
                                ></CustomCheckbox>
                                <span>
                                    Tất cả ({order?.orderItems?.length} sản
                                    phẩm)
                                </span>
                            </span>
                            <div
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined
                                    style={{ cursor: "pointer" }}
                                    onClick={handleRemoveAllOrder}
                                />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            {order?.orderItems?.map((order) => {
                                return (
                                    <WrapperItemOrder key={order?.product}>
                                        <div
                                            style={{
                                                width: "390px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                            }}
                                        >
                                            <CustomCheckbox
                                                onChange={onChange}
                                                value={order?.product}
                                                checked={listChecked.includes(
                                                    order?.product
                                                )}
                                            ></CustomCheckbox>
                                            <Image
                                                src={order?.image}
                                                style={{
                                                    width: "77px",
                                                    height: "79px",
                                                    objectFit: "cover",
                                                }}
                                                preview={false}
                                            />
                                            <div
                                                style={{
                                                    width: 260,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {order?.name}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                flex: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <span>
                                                <span
                                                    style={{
                                                        fontSize: "13px",
                                                        color: "#242424",
                                                    }}
                                                >
                                                    {convertPrice(order?.price)}
                                                </span>
                                            </span>
                                            <WrapperCountOrder>
                                                <button
                                                    style={{
                                                        border: "none",
                                                        background:
                                                            "transparent",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handleChangeCount(
                                                            "decrease",
                                                            order?.product,
                                                            order?.amount === 1
                                                        )
                                                    }
                                                >
                                                    <MinusOutlined
                                                        style={{
                                                            color: "#000",
                                                            fontSize: "10px",
                                                        }}
                                                    />
                                                </button>
                                                <WrapperInputNumber
                                                    defaultValue={order?.amount}
                                                    value={order?.amount}
                                                    size="small"
                                                    min={1}
                                                    max={order?.countInstock}
                                                />
                                                <button
                                                    style={{
                                                        border: "none",
                                                        background:
                                                            "transparent",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handleChangeCount(
                                                            "increase",
                                                            order?.product,
                                                            order?.amount ===
                                                                order.countInstock,
                                                            order?.amount === 1
                                                        )
                                                    }
                                                >
                                                    <PlusOutlined
                                                        style={{
                                                            color: "#000",
                                                            fontSize: "10px",
                                                        }}
                                                    />
                                                </button>
                                            </WrapperCountOrder>
                                            <span
                                                style={{
                                                    color: "rgb(255, 66, 78)",
                                                    fontSize: "13px",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {convertPrice(
                                                    order?.price * order?.amount
                                                )}
                                            </span>
                                            <DeleteOutlined
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    handleDeleteOrder(
                                                        order?.product
                                                    )
                                                }
                                            />
                                        </div>
                                    </WrapperItemOrder>
                                );
                            })}
                        </WrapperListOrder>
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
                                        {" "}
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
                        <ButtonComponent
                            onClick={() => handleAddCard()}
                            size={40}
                            styleButton={{
                                background: "rgb(255, 57, 69)",
                                height: "48px",
                                width: "340px",
                                border: "none",
                                borderRadius: "4px",
                            }}
                            textbutton={"Mua hàng"}
                            styleTextButton={{
                                color: "#fff",
                                fontSize: "15px",
                                fontWeight: "700",
                            }}
                        ></ButtonComponent>
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
        </div>
    );
};
export default OrderPage;
