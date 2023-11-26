import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../ultils/";
import {
    WrapperItemOrder,
    WrapperListOrder,
    WrapperHeaderItem,
    WrapperFooterItem,
    WrapperContainer,
    WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import UseMutationHook from "../../hooks/UseMutationHook";
import * as message from "../../components/Message/Message";
import { Empty, Flex, Image } from "antd";
import { WrapperNameProductText, WrapperPriceText } from "../PaymentPage/style";
import { WrapperLabelText } from "../ProfilePage/style";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const MyOrderPage = () => {
    const user = useSelector((state) => state.user);
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(
            user?.id,
            user?.access_token
        );
        return res.data;
    };

    const queryOrder = useQuery({
        queryKey: ["orders"],
        queryFn: fetchMyOrder,
    });
    const { data, isLoading, isRefetching } = queryOrder;

    const mutation = UseMutationHook((data) => {
        const { id, token, orderItems, userId } = data;
        const res = OrderService.cancelOrder(id, token, orderItems, userId);
        return res;
    });

    const handleCanceOrder = (order) => {
        mutation.mutate(
            {
                id: order._id,
                token: user?.token,
                orderItems: order?.orderItems,
                userId: user.id,
            },
            {
                onSuccess: () => {
                    queryOrder.refetch();
                },
            }
        );
    };
    const {
        isSuccess: isSuccessCancel,
        isError: isErrorCancle,
        data: dataCancel,
    } = mutation;

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === "OK") {
            message.success();
        } else if (isSuccessCancel && dataCancel?.status === "ERR") {
            message.error(dataCancel?.message);
        } else if (isErrorCancle) {
            message.error();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isErrorCancle, isSuccessCancel]);

    const renderProduct = (data) => {
        return data?.map((order, index) => {
            return (
                <WrapperHeaderItem key={order?._id}>
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
                            src={order.image}
                            style={{
                                maxHeight: "64px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
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
                                {order.name}
                            </WrapperNameProductText>
                            <Flex justify="space-between">
                                <WrapperNameProductText>
                                    SL : x{order.amount}
                                </WrapperNameProductText>
                                <WrapperPriceText>
                                    {convertPrice(order.price * order.amount)}
                                    <sup>₫</sup>
                                </WrapperPriceText>
                            </Flex>
                        </Flex>
                    </Flex>
                </WrapperHeaderItem>
            );
        });
    };
    return (
        <LoadingComponent isPending={isLoading || isRefetching}>
            <WrapperContainer>
                <div
                    style={{
                        height: "100%",
                        width: "1270px",
                        margin: "0 auto",
                    }}
                >
                    <WrapperLabelText>Đơn hàng của tôi</WrapperLabelText>
                    <WrapperListOrder>
                        {data && data.length > 0 ? (
                            data?.map((order) => {
                                return (
                                    <WrapperItemOrder key={order?._id}>
                                        <WrapperStatus>
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Trạng thái
                                            </span>
                                            <div>
                                                <span
                                                    style={{
                                                        color: "rgb(255, 66, 78)",
                                                    }}
                                                >
                                                    Giao hàng:{" "}
                                                </span>
                                                <span
                                                    style={{
                                                        color: "rgb(90, 32, 193)",
                                                        fontWeight: "bold",
                                                    }}
                                                >{`${
                                                    order.isDelivered
                                                        ? "Đã giao hàng"
                                                        : "Chưa giao hàng"
                                                }`}</span>
                                            </div>
                                            <div>
                                                <span
                                                    style={{
                                                        color: "rgb(255, 66, 78)",
                                                    }}
                                                >
                                                    Thanh toán:{" "}
                                                </span>
                                                <span
                                                    style={{
                                                        color: "rgb(90, 32, 193)",
                                                        fontWeight: "bold",
                                                    }}
                                                >{`${
                                                    order.isPaid
                                                        ? "Đã thanh toán"
                                                        : "Chưa thanh toán"
                                                }`}</span>
                                            </div>
                                        </WrapperStatus>
                                        {renderProduct(order?.orderItems)}
                                        <WrapperFooterItem>
                                            <div>
                                                <span
                                                    style={{
                                                        color: "rgb(255, 66, 78)",
                                                    }}
                                                >
                                                    Tổng tiền:{" "}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: "13px",
                                                        color: "rgb(56, 56, 61)",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {convertPrice(
                                                        order?.totalPrice
                                                    )}
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                }}
                                            >
                                                <ButtonComponent
                                                    onClick={() =>
                                                        handleCanceOrder(order)
                                                    }
                                                    size={40}
                                                    styleButton={{
                                                        height: "36px",
                                                        border: "1px solid #9255FD",
                                                        borderRadius: "4px",
                                                    }}
                                                    textbutton={"Hủy đơn hàng"}
                                                    styleTextButton={{
                                                        color: "#9255FD",
                                                        fontSize: "14px",
                                                    }}
                                                ></ButtonComponent>
                                            </div>
                                        </WrapperFooterItem>
                                    </WrapperItemOrder>
                                );
                            })
                        ) : (
                            <WrapperItemOrder>
                                <Empty />
                            </WrapperItemOrder>
                        )}
                    </WrapperListOrder>
                    <div style={{ background: "#fff" }}></div>
                </div>
            </WrapperContainer>
        </LoadingComponent>
    );
};

export default MyOrderPage;
