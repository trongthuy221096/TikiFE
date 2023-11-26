import { Carousel, Empty, Flex, Image, Rate } from "antd";
import {
    WrapperItemContent,
    WrapperImageHeader,
    WrapperDescriptionContent,
    WrapperItemFirstContent,
    WrapperButtonCarouselContent,
    WrapperContentCard,
    WrapperPriceCard,
    WrapperSupPriceCard,
    WrapperItemCard,
    WrapperFooterCard,
    WrapperFooterContentCard,
} from "./style";
import banner1 from "../../assests/images/banner1.webp";
import banner2 from "../../assests/images/banner2.webp";
import banner3 from "../../assests/images/banner3.webp";
import banner4 from "../../assests/images/banner4.webp";
import banner5 from "../../assests/images/banner5.webp";
import banner6 from "../../assests/images/banner6.webp";
import banner7 from "../../assests/images/banner7.webp";
import banner8 from "../../assests/images/banner8.webp";
import banner9 from "../../assests/images/banner9.webp";
import chinhhang from "../../assests/images/chinhhang.png";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import {
    convertPrice,
    getStringDate,
    showMax90,
    splitArray,
} from "../../ultils";
import { WrapperButtonIcon } from "../ProfilePage/style";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const bannerImage = [
    { image: banner2 },
    { image: banner3 },
    { image: banner4 },
    { image: banner5 },
    { image: banner6 },
    { image: banner7 },
    { image: banner8 },
    { image: banner9 },
];

function HomaPage() {
    const navigate = useNavigate();
    const [valueProduct, setValueProduct] = useState("Thời trang nam");
    const [valueProductTechnology, setValueProductTechnology] = useState(
        "Điện Thoại - Máy Tính Bảng"
    );
    const fetchProductFashionAll = async () => {
        const res = await ProductService.getAllProduct(
            1,
            0,
            "type",
            valueProduct
        );
        return res;
    };

    const { data, refetch, isLoading, isRefetching } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductFashionAll,
        retry: 3,
        retryDelay: 1000,
    });

    const fetchProductTechnologyAll = async () => {
        const res = await ProductService.getAllProduct(
            1,
            0,
            "type",
            valueProductTechnology
        );
        return res;
    };

    const {
        data: dataTechnology,
        refetch: refetchTechnology,
        isLoading: isLoadingTechnology,
        isRefetching: isRefetchingTechnology,
    } = useQuery({
        queryKey: ["productsTechonology"],
        queryFn: fetchProductTechnologyAll,
        retry: 3,
        retryDelay: 1000,
    });
    const products = data && splitArray(data.data);
    const productsTechnology =
        dataTechnology && splitArray(dataTechnology.data);

    const SlickButtonFix = ({
        currentSlide,
        slideCount,
        children,
        ...props
    }) => <span {...props}>{children}</span>;

    const SETTINGS = {
        prevArrow: (
            <SlickButtonFix>
                <WrapperButtonIcon style={{ marginLeft: "5px" }}>
                    <div style={{ marginTop: "-5px" }}>
                        <CiCircleChevLeft />
                    </div>
                </WrapperButtonIcon>
            </SlickButtonFix>
        ),
        nextArrow: (
            <SlickButtonFix>
                <WrapperButtonIcon style={{ marginLeft: "-15px" }}>
                    <div style={{ marginTop: "-5px" }}>
                        <CiCircleChevRight />
                    </div>
                </WrapperButtonIcon>
            </SlickButtonFix>
        ),
    };
    const handleChangeType = (value) => {
        setValueProduct(value);
    };
    const handleChangeTypeTechonology = (value) => {
        setValueProductTechnology(value);
    };
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueProduct]);
    useEffect(() => {
        refetchTechnology();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueProductTechnology]);
    return (
        <Flex vertical gap={16}>
            <WrapperItemContent>
                <WrapperItemFirstContent>
                    <WrapperImageHeader style={{ gridArea: "span 2 / span 2" }}>
                        <Image
                            height={"100%"}
                            width={"100%"}
                            src={banner1}
                            preview={false}
                        ></Image>
                    </WrapperImageHeader>
                    {bannerImage.map((item, index) => (
                        <WrapperImageHeader key={index}>
                            <Image
                                height={"100%"}
                                width={"100%"}
                                src={item.image}
                                preview={false}
                            ></Image>
                        </WrapperImageHeader>
                    ))}
                </WrapperItemFirstContent>
            </WrapperItemContent>
            <WrapperItemContent>
                <Flex vertical gap={10}>
                    <WrapperDescriptionContent>
                        Thời trang
                    </WrapperDescriptionContent>
                    <Flex gap={12}>
                        <WrapperButtonCarouselContent
                            className={
                                valueProduct === "Thời trang nam"
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                handleChangeType("Thời trang nam");
                            }}
                        >
                            Thời trang nam
                        </WrapperButtonCarouselContent>
                        <WrapperButtonCarouselContent
                            className={
                                valueProduct === "Túi thời trang nam"
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                handleChangeType("Túi thời trang nam");
                            }}
                        >
                            Túi thời trang nam
                        </WrapperButtonCarouselContent>
                        <WrapperButtonCarouselContent
                            className={
                                valueProduct === "Giày - Dép nam"
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                handleChangeType("Giày - Dép nam");
                            }}
                        >
                            Giày - Dép nam
                        </WrapperButtonCarouselContent>
                        <WrapperButtonCarouselContent
                            className={
                                valueProduct === "Thời trang nữ" ? "active" : ""
                            }
                            onClick={() => {
                                handleChangeType("Thời trang nữ");
                            }}
                        >
                            Thời trang nữ
                        </WrapperButtonCarouselContent>
                        <WrapperButtonCarouselContent
                            className={
                                valueProduct === "Giày - Dép nữ" ? "active" : ""
                            }
                            onClick={() => {
                                handleChangeType("Giày - Dép nữ");
                            }}
                        >
                            Giày - Dép nữ
                        </WrapperButtonCarouselContent>
                        <WrapperButtonCarouselContent
                            className={
                                valueProduct === "Túi thời trang nữ"
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                handleChangeType("Túi thời trang nữ");
                            }}
                        >
                            Túi thời trang nữ
                        </WrapperButtonCarouselContent>
                    </Flex>
                    <LoadingComponent isPending={isLoading || isRefetching}>
                        {products && products.length > 0 ? (
                            <Carousel
                                arrows
                                prevArrow={SETTINGS.prevArrow}
                                nextArrow={SETTINGS.nextArrow}
                                dots={null}
                                autoplay
                                autoplaySpeed={3000}
                            >
                                {products &&
                                    products?.map((item, index) => (
                                        <div key={index}>
                                            <Flex gap={16}>
                                                {item.map((product, index) => (
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
                                                                src={
                                                                    product.image
                                                                }
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
                                                                    {showMax90(
                                                                        product.name
                                                                    )}
                                                                </WrapperContentCard>
                                                            </div>
                                                            <Rate
                                                                disabled
                                                                defaultValue={
                                                                    product.rating
                                                                }
                                                                style={{
                                                                    fontSize:
                                                                        "12px",
                                                                }}
                                                            />
                                                            <WrapperPriceCard>
                                                                {convertPrice(
                                                                    product.price
                                                                )}
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
                                        </div>
                                    ))}
                            </Carousel>
                        ) : (
                            <Empty />
                        )}
                    </LoadingComponent>
                </Flex>
            </WrapperItemContent>
            <WrapperItemContent>
                <Flex vertical gap={10}>
                    <WrapperDescriptionContent>
                        Công nghệ
                    </WrapperDescriptionContent>
                    <Flex gap={12}>
                        <WrapperButtonCarouselContent
                            className={
                                valueProductTechnology ===
                                "Điện Thoại - Máy Tính Bảng"
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                handleChangeTypeTechonology(
                                    "Điện Thoại - Máy Tính Bảng"
                                );
                            }}
                        >
                            Điện Thoại - Máy Tính Bảng
                        </WrapperButtonCarouselContent>
                        <WrapperButtonCarouselContent
                            className={
                                valueProductTechnology ===
                                "Laptop - Máy Vi Tính - Linh kiện"
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                handleChangeTypeTechonology(
                                    "Laptop - Máy Vi Tính - Linh kiện"
                                );
                            }}
                        >
                            Laptop - Máy Vi Tính - Linh kiện
                        </WrapperButtonCarouselContent>
                    </Flex>
                    <LoadingComponent
                        isPending={
                            isRefetchingTechnology || isLoadingTechnology
                        }
                    >
                        {dataTechnology && dataTechnology.data.length > 0 ? (
                            <Carousel
                                arrows
                                prevArrow={SETTINGS.prevArrow}
                                nextArrow={SETTINGS.nextArrow}
                                dots={null}
                                autoplay
                                autoplaySpeed={3000}
                            >
                                {productsTechnology &&
                                    productsTechnology?.map((item, index) => (
                                        <div key={index}>
                                            <Flex gap={16}>
                                                {item.map((product, index) => (
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
                                                                src={
                                                                    product.image
                                                                }
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
                                                                    {showMax90(
                                                                        product.name
                                                                    )}
                                                                </WrapperContentCard>
                                                            </div>
                                                            <Rate
                                                                disabled
                                                                defaultValue={
                                                                    product.rating
                                                                }
                                                                style={{
                                                                    fontSize:
                                                                        "12px",
                                                                }}
                                                            />
                                                            <WrapperPriceCard>
                                                                {convertPrice(
                                                                    product.price
                                                                )}
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
                                        </div>
                                    ))}
                            </Carousel>
                        ) : (
                            <Empty />
                        )}
                    </LoadingComponent>
                </Flex>
            </WrapperItemContent>
        </Flex>
    );
}
export default HomaPage;
