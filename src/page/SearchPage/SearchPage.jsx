import React, { useEffect, useMemo, useState } from "react";
import {
    WrapperContentCard,
    WrapperDescriptionContent,
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

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location]
    );
    const search = searchParams.get("q");
    const [paramPage, setParamPage] = useState({
        page: 1,
        limit: 14,
        type: "name",
        search,
    });

    const getAllProducts = async (page, limit, type, search) => {
        const res = await ProductService.getAllProduct(
            page,
            limit,
            type,
            search
        );
        return res;
    };

    const {
        data: listProduct,
        refetch,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["productSearch"],
        queryFn: () =>
            getAllProducts(
                paramPage.page,
                paramPage.limit,
                paramPage.type,
                paramPage.search
            ),
    });

    const getMoreProduct = () => {
        setParamPage({ ...paramPage, limit: paramPage.limit + 14 });
    };
    useEffect(() => {
        refetch();
    }, [paramPage, refetch]);

    useEffect(() => {
        const search = searchParams.get("q");

        setParamPage((prev) => ({
            ...prev,
            search,
        }));
    }, [searchParams]);

    return (
        <>
            <WrapperItemContent>
                <WrapperDescriptionContent style={{ marginBottom: "16px" }}>
                    Tìm thấy {listProduct && listProduct?.total} sản phẩm
                </WrapperDescriptionContent>
                <LoadingComponent isPending={isLoading || isRefetching}>
                    {listProduct && listProduct?.data.length > 0 ? (
                        <Flex wrap="wrap" gap={25}>
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
        </>
    );
};

export default SearchPage;
