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
import { Flex, Image, Rate } from "antd";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import chinhhang from "../../assests/images/chinhhang.png";
import { WrapperBreadcrumb, WrapperButtonShowMore } from "./style";
import { useLocation } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const ProductPage = () => {
  const location = useLocation();
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
    const res = await ProductService.getAllProduct(page, limit, type, search);
    return res;
  };

  const {
    data: listProduct,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
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
      <WrapperBreadcrumb
        items={[
          {
            title: <a href="/">Trang chủ</a>,
          },
          {
            title: "Tìm kiếm",
          },
        ]}
      />
      <WrapperItemContent>
        <WrapperDescriptionContent style={{ marginBottom: "16px" }}>
          Tìm thấy 30 sản phẩm
        </WrapperDescriptionContent>
        <LoadingComponent isPending={isLoading || isRefetching}>
          <Flex wrap="wrap" gap={25}>
            {listProduct &&
              listProduct.data.map((product, index) => (
                <WrapperItemCard key={index} vertical>
                  <Image
                    src={product.image}
                    preview={false}
                    style={{
                      height: "147px",
                      margin: "auto",
                      minHeight: "147px",
                    }}
                  ></Image>
                  <Flex
                    vertical
                    style={{ padding: "8px", height: "160px" }}
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
                        Máy Tăm Nước Không Dây LocknLock Cordless Oral Irrigator
                        ENR156BLU - Màu Xanh Da Trời
                      </WrapperContentCard>
                    </div>
                    <Rate
                      disabled
                      defaultValue={2}
                      style={{
                        fontSize: "12px",
                      }}
                    />
                    <WrapperPriceCard>
                      111.000
                      <WrapperSupPriceCard>₫</WrapperSupPriceCard>
                    </WrapperPriceCard>
                  </Flex>
                  <WrapperFooterCard>
                    <WrapperFooterContentCard>
                      Giao thứ 5, 16/11
                    </WrapperFooterContentCard>
                  </WrapperFooterCard>
                </WrapperItemCard>
              ))}
          </Flex>
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

export default ProductPage;
