import Sider from "antd/es/layout/Sider";
import {
    WrapperItemSiderBar,
    WrapperLabelText,
    WrapperPriceSiderBar,
} from "./style";
import { Checkbox, Divider, Flex, Menu, Rate } from "antd";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
function NavBarComponent() {
    const onChange = (checkedValues) => {};
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
            collapsible
            theme="light"
            width={240}
        >
            <div className="demo-logo-vertical" />
            <WrapperItemSiderBar>
                <WrapperLabelText>Danh mục sản phẩm</WrapperLabelText>{" "}
            </WrapperItemSiderBar>

            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                    {
                        key: "1",
                        icon: <UserOutlined />,
                        label: "nav 1111111111111111",
                    },
                    {
                        key: "2",
                        icon: <VideoCameraOutlined />,
                        label: "nav 2",
                    },
                    {
                        key: "3",
                        icon: <UploadOutlined />,
                        label: "nav 3",
                    },
                ]}
            />
            <WrapperItemSiderBar>
                <Divider />
                <WrapperLabelText>Nơi bán</WrapperLabelText>
                <Checkbox.Group
                    style={{
                        width: "100%",
                    }}
                    onChange={onChange}
                >
                    <Flex vertical>
                        <Checkbox value="A">Đà Nẵng</Checkbox>
                        <Checkbox value="B">Quảng Nam</Checkbox>
                        <Checkbox value="C">Hội An</Checkbox>
                    </Flex>
                </Checkbox.Group>
                <Divider />
            </WrapperItemSiderBar>
            <WrapperItemSiderBar>
                <WrapperLabelText>Đánh giá</WrapperLabelText>
                <Flex align="center">
                    <Rate
                        disabled
                        defaultValue={5}
                        style={{ fontSize: "16px" }}
                    />
                    <span>&nbsp;Từ 5 sao</span>
                </Flex>
                <Flex align="center">
                    <Rate
                        disabled
                        defaultValue={4}
                        style={{ fontSize: "16px" }}
                    />
                    <span>&nbsp;Từ 4 sao</span>
                </Flex>
                <Flex align="center">
                    <Rate
                        disabled
                        defaultValue={3}
                        style={{ fontSize: "16px" }}
                    />
                    <span>&nbsp;Từ 3 sao</span>
                </Flex>
                <Divider />
            </WrapperItemSiderBar>
            <WrapperItemSiderBar>
                <WrapperLabelText>Giá</WrapperLabelText>
                <div>
                    <WrapperPriceSiderBar>
                        <span style={{ padding: "4px" }}>Dưới 40.000d</span>
                    </WrapperPriceSiderBar>
                </div>
                <Divider />
            </WrapperItemSiderBar>
        </Sider>
    );
}
export default NavBarComponent;
