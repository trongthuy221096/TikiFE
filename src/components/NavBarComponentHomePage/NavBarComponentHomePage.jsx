import Sider from "antd/es/layout/Sider";
import {
    WrapperCategorySiderBar,
    WrapperDescriptionSiderBar,
    WrapperItemSiderBar,
    WrapperLabelText,
} from "./style";
import { Flex, Image } from "antd";
import * as TypeProductService from "../../services/TypeProductService";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { convertToSlug } from "../../ultils";

function NavBarComponentHomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const getAllTypeProducts = async () => {
        const res = await TypeProductService.getAllTypeProduct();
        return res;
    };

    const { data: product } = useQuery({
        queryKey: ["type"],
        queryFn: () => getAllTypeProducts(),
    });

    return (
        <Sider trigger={null} breakpoint="lg" theme="light" width={230}>
            <Flex vertical wrap="nowrap" style={{ padding: "0 8px" }}>
                <WrapperItemSiderBar>
                    <WrapperLabelText>Danh mục</WrapperLabelText>
                </WrapperItemSiderBar>
                {product &&
                    product.data?.map((item, index) => (
                        <WrapperCategorySiderBar
                            className={state === item.name ? "active" : ""}
                            gap={8}
                            key={index}
                            onClick={() => {
                                navigate(
                                    `/product/${convertToSlug(item.name)}`,
                                    {
                                        state: item.name,
                                    }
                                );
                            }}
                        >
                            <Image
                                height={32}
                                width={32}
                                src={item.image}
                                preview={false}
                            ></Image>
                            <WrapperDescriptionSiderBar>
                                {item.name}
                            </WrapperDescriptionSiderBar>
                        </WrapperCategorySiderBar>
                    ))}
            </Flex>
        </Sider>
    );
}

export default NavBarComponentHomePage;
