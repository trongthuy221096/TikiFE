import React, { useEffect, useState } from "react";
import {
    WrapperContentCard,
    WrapperFooterCard,
    WrapperFooterContentCard,
    WrapperItemCard,
    WrapperItemContent,
    WrapperPriceCard,
    WrapperSupPriceCard,
} from "../HomaPage/style";
import { Empty, Flex, Image, Rate } from "antd";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import chinhhang from "../../assests/images/chinhhang.png";
import { WrapperButtonShowMore } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { convertPrice, getStringDate, showMax90 } from "../../ultils";

const TypeProductPage = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [paramPage, setParamPage] = useState({
        page: 1,
        limit: 12,
        type: state,
    });

    const getAllProducts = async (type, page, limit) => {
        const res = await ProductService.getProductType(type, page, limit);
        return res;
    };

    const {
        data: listProduct,
        refetch,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["producttype"],
        queryFn: () =>
            getAllProducts(paramPage.type, paramPage.page, paramPage.limit),
    });

    const getMoreProduct = () => {
        setParamPage({ ...paramPage, limit: paramPage.limit + 12 });
    };

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramPage]);

    useEffect(() => {
        setParamPage((prevParamPage) => ({
            ...prevParamPage,
            type: state,
        }));
    }, [state]);
    return (
        <WrapperItemContent style={{ height: "100%" }}>
            <LoadingComponent isPending={isLoading || isRefetching}>
                {listProduct &&
                listProduct.data &&
                listProduct.data.length > 0 ? (
                    <Flex wrap="wrap" gap={16}>
                        {listProduct.data.map((product, index) => (
                            <WrapperItemCard
                                key={index}
                                vertical
                                onClick={() => {
                                    navigate(
                                        `/product-detail?id=${product._id}`
                                    );
                                }}
                            >
                                <div
                                    style={{
                                        width: "147px",
                                        height: "147px",
                                        margin: "10px auto",
                                    }}
                                >
                                    <Image
                                        src={product.image}
                                        preview={false}
                                        style={{
                                            width: "147px",
                                            height: "147px",
                                            margin: "auto",
                                        }}
                                    ></Image>
                                </div>
                                <Flex
                                    vertical
                                    style={{
                                        padding: "8px",
                                        height: "156px",
                                    }}
                                    gap={4}
                                >
                                    <Image
                                        src={chinhhang}
                                        preview={false}
                                        style={{
                                            width: "89px",
                                            height: "20px",
                                        }}
                                    ></Image>
                                    <div>
                                        <WrapperContentCard>
                                            {showMax90(product.name)}
                                        </WrapperContentCard>
                                    </div>
                                    <Rate
                                        disabled
                                        defaultValue={product.rating}
                                        style={{
                                            fontSize: "12px",
                                        }}
                                    />
                                    <WrapperPriceCard>
                                        {convertPrice(product.price)}
                                        <WrapperSupPriceCard>
                                            ₫
                                        </WrapperSupPriceCard>
                                    </WrapperPriceCard>
                                </Flex>
                                <WrapperFooterCard>
                                    <WrapperFooterContentCard>
                                        {getStringDate()}
                                    </WrapperFooterContentCard>
                                </WrapperFooterCard>
                            </WrapperItemCard>
                        ))}
                    </Flex>
                ) : (
                    <Empty />
                )}
            </LoadingComponent>
            {listProduct && listProduct.total > paramPage.limit && (
                <Flex justify="center" style={{ margin: "32px 0" }}>
                    <WrapperButtonShowMore onClick={getMoreProduct}>
                        Xem thêm
                    </WrapperButtonShowMore>
                </Flex>
            )}
        </WrapperItemContent>
    );
};

export default TypeProductPage;
