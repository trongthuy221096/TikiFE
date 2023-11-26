import { Col, Flex, Image, InputNumber, Rate, Row } from "antd";
import React, { useMemo, useState } from "react";
import {
    WrapperAddressProduct,
    WrapperAssurance,
    WrapperButoonProduct,
    WrapperImageItem,
    WrapperPriceProduct,
    WrapperQuanlitiProduct,
    WrapperSold,
    WrapperTitle,
    WrapperTitleH1,
} from "./style";
import chinhhang from "../../assests/images/chinhhang.png";
import mohang from "../../assests/images/mohang.png";
import doitra from "../../assests/images/doitra.png";
import hoantien from "../../assests/images/hoantien.png";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { WrapperItemContent } from "../HomaPage/style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import SignInComponent from "../../components/SignInComponent/SignInComponent";
import { addOrderProduct } from "../../redux/slice/orderSlide";
import { convertPrice, getStringDate } from "../../ultils";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const ProductDetailPage = () => {
    const user = useSelector((state) => state?.user);
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorLimitOrder, setErrorLimitOrder] = useState(false);
    const [count, setCount] = useState(1);
    const location = useLocation();
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location]
    );
    const id = searchParams.get("id");
    const getDetailsProduct = async (id) => {
        const res = await ProductService.getDetailsProduct(id);
        return res;
    };

    const { data: product ,isFetching} = useQuery({
        queryKey: ["products"],
        queryFn: () => getDetailsProduct(id),
    });
    const onChange = (value) => {
        setCount(value);
    };

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            setIsModalOpen(true);
        } else {
            const orderRedux = order?.orderItems?.find(
                (item) => item.product === product?.data._id
            );
            if (
                orderRedux?.amount + count <= orderRedux?.countInstock ||
                (!orderRedux && product?.data.countInStock > 0)
            ) {
                dispatch(
                    addOrderProduct({
                        orderItem: {
                            name: product?.data?.name,
                            amount: count,
                            image: product?.data?.image,
                            price: product?.data.price,
                            product: product?.data._id,
                            discount: product.data?.discount,
                            countInstock: product?.data?.countInStock,
                        },
                    })
                );
            } else {
                setErrorLimitOrder(true);
            }
        }
    };
    return (
        <div>
            <LoadingComponent isPending={isFetching}>
            <Row style={{ padding: "16px" }}>
                <SignInComponent
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
                <Col span={18} gutter={16}>
                    <Flex gap={13}>
                        <WrapperItemContent style={{ width: "400px" }}>
                            <Flex vertical gap={16}>
                                <Flex vertical gap={8}>
                                    <Image
                                        src={product?.data?.image}
                                        alt=""
                                        style={{
                                            border: "1px solid rgb(235, 235, 240)",
                                            borderRadius: "6px",
                                            overflow: "hidden",
                                        }}
                                    ></Image>
                                    <Flex gap={8}>
                                        <WrapperImageItem>
                                            <Image
                                                src={product?.data?.image}
                                                alt=""
                                                preview={false}
                                                style={{
                                                    width: "54px",
                                                    height: "54px",
                                                }}
                                            ></Image>
                                        </WrapperImageItem>
                                    </Flex>
                                </Flex>
                                <Flex vertical gap={8}>
                                    <WrapperTitle>Mô tả sản phẩm</WrapperTitle>
                                    <div>{product?.data?.description}</div>
                                </Flex>
                            </Flex>
                        </WrapperItemContent>

                        <Flex vertical style={{ width: "585px" }} gap={16}>
                            <WrapperItemContent>
                                <Flex gap={8} vertical>
                                    <Image
                                        src={chinhhang}
                                        preview={false}
                                        style={{
                                            width: "89px",
                                            height: "20px",
                                        }}
                                    />
                                    <WrapperTitleH1>
                                        {product?.data?.name}
                                    </WrapperTitleH1>

                                    <WrapperSold>
                                        {product?.data?.rating}
                                        <Rate
                                            allowHalf
                                            value={
                                                product && product.data.rating
                                            }
                                            disabled
                                            style={{
                                                fontSize: "14px",
                                                margin: "0 8px",
                                            }}
                                        />
                                        (52) | Đã bán{" "}
                                        {product?.data?.selled || 0}
                                    </WrapperSold>
                                    <WrapperPriceProduct>
                                        {convertPrice(product?.data?.price)}
                                        <sup>₫</sup>
                                    </WrapperPriceProduct>
                                </Flex>
                            </WrapperItemContent>
                            <WrapperItemContent>
                                <Flex gap={16} vertical>
                                    <WrapperTitle>
                                        Thông tin vận chuyển
                                    </WrapperTitle>
                                    <WrapperAddressProduct justify="space-between">
                                        <div>Giao đến : {user?.address || "chưa cập nhập thông tin"}</div>
                                      
                                    </WrapperAddressProduct>
                                    <WrapperAddressProduct vertical>
                                        <Flex align="center">
                                            <LiaShippingFastSolid size={24} />
                                            <div
                                                style={{
                                                    fontSize: "15px",
                                                    marginLeft: "10px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                     {getStringDate()}
                                            </div>
                                        </Flex>
                                     
                                    </WrapperAddressProduct>
                                </Flex>
                            </WrapperItemContent>

                            <WrapperItemContent>
                                <Flex gap={16} vertical>
                                    <WrapperTitle>An tâm mua sắm</WrapperTitle>
                                    <Flex vertical>
                                        <WrapperAssurance>
                                            <Flex align="center">
                                                <Image
                                                    src={mohang}
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                    preview={false}
                                                />
                                                <div
                                                    style={{
                                                        fontSize: "15px",
                                                        marginLeft: "10px",
                                                    }}
                                                >
                                                    Được mở hộp kiểm tra khi
                                                    nhận hàng.
                                                </div>
                                            </Flex>
                                        </WrapperAssurance>
                                        <WrapperAssurance>
                                            <Flex align="center">
                                                <Image
                                                    src={hoantien}
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                    preview={false}
                                                />
                                                <div
                                                    style={{
                                                        fontSize: "15px",
                                                        marginLeft: "10px",
                                                    }}
                                                >
                                                    Được hoàn tiền 111% nếu là
                                                    hàng giả.
                                                </div>
                                            </Flex>
                                        </WrapperAssurance>
                                        <WrapperAssurance>
                                            <Flex align="center">
                                                <Image
                                                    src={doitra}
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                    preview={false}
                                                />
                                                <div
                                                    style={{
                                                        fontSize: "15px",
                                                        marginLeft: "10px",
                                                    }}
                                                >
                                                    Đổi trả miễn phí tại nhà
                                                    trong 30 ngày nếu sản phẩm
                                                    lỗi.
                                                </div>
                                            </Flex>
                                        </WrapperAssurance>
                                    </Flex>
                                </Flex>
                            </WrapperItemContent>
                        </Flex>
                    </Flex>
                </Col>
                <Col span={6}>
                    <WrapperItemContent>
                        <Flex gap={14} vertical>
                            <Flex vertical>
                                <WrapperQuanlitiProduct>
                                    <span>Số lượng</span>
                                </WrapperQuanlitiProduct>
                                <InputNumber
                                    min={1}
                                    defaultValue={1}
                                    onChange={onChange}
                                    controls={{
                                        upIcon: <PlusOutlined />,
                                        downIcon: <MinusOutlined />,
                                    }}
                                />
                            </Flex>
                            <Flex vertical>
                                <WrapperTitle>Tạm tính</WrapperTitle>
                                <WrapperPriceProduct>
                                    {convertPrice(product?.data?.price * count)}
                                    <sup>₫</sup>
                                </WrapperPriceProduct>
                            </Flex>
                            <Flex vertical gap={8}>
                                <WrapperButoonProduct
                                    type="primary"
                                    danger
                                    onClick={handleAddOrderProduct}
                                >
                                    Thêm vào giỏ hàng
                                </WrapperButoonProduct>
                                {errorLimitOrder && (
                                    <div style={{ color: "red" }}>
                                        San pham het hang
                                    </div>
                                )}
                            </Flex>
                        </Flex>
                    </WrapperItemContent>
                </Col>
            </Row>
            </LoadingComponent>
        </div>
    );
};

export default ProductDetailPage;
