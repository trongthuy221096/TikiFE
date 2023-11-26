import { Avatar, Button, Flex, Popover } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { WrapperHeader } from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
    WrapperContentHeader,
    WrapperItemtHeader,
    WrapperNameHeader,
} from "../../HeaderComponent/style";
import { useNavigate } from "react-router-dom";
import * as userService from "../../../services/UserService";
import { resetUser } from "../../../redux/slice/UserSlide";
import { getFirstLetters } from "../../../ultils";

const AdminHeaderComponent = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await userService.logoutUser();
        dispatch(resetUser());
        localStorage.setItem("access_token", "");
        localStorage.setItem("refresh_token", "");
    };
    const content = (
        <div>
            <WrapperItemtHeader
                onClick={() => {
                    navigate("/");
                }}
            >
                <WrapperContentHeader>Trang chủ sản phẩm</WrapperContentHeader>
            </WrapperItemtHeader>

            <WrapperItemtHeader onClick={handleLogout}>
                <WrapperContentHeader>Đăng xuất</WrapperContentHeader>
            </WrapperItemtHeader>
        </div>
    );
    const user = useSelector((state) => state.user);

    return (
        <div>
            <WrapperHeader justify="space-between">
                <Button
                    type="text"
                    icon={
                        collapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        )
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: "16px",
                        width: 46,
                        height: 46,
                    }}
                />

                <Popover placement="bottom" content={content} trigger={"click"}>
                    <Flex align="center">
                        <Avatar
                            size="large"
                            src={user && user.avatar}
                            style={{ cursor: "pointer" }}
                        >
                            {user.avatar
                                ? ""
                                : getFirstLetters(user?.name || user?.email)}
                        </Avatar>
                        <WrapperNameHeader>
                            {user.name || user.email}
                        </WrapperNameHeader>
                    </Flex>
                </Popover>
            </WrapperHeader>
        </div>
    );
};

export default AdminHeaderComponent;
