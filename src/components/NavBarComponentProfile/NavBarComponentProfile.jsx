import Sider from "antd/es/layout/Sider";
import { WrapperCategorySiderBar, WrapperDescriptionSiderBar } from "./style";
import { Flex } from "antd";
import { BiSolidUser } from "react-icons/bi";
import { RiBookReadFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const styleIcon = {
    width: "22px",
    height: "22px",
    margin: "0px 20px 0px 0px",
    fontSize: "22px",
    color: "rgb(155, 155, 155)",
};
// const listCategory = [
//     {
//         description: "Thông tin tài khoản",
//         icon: <BiSolidUser style={styleIcon} />,
//     },
//     {
//         description: "Thông báo của tôi",
//         icon: <BsFillBellFill style={styleIcon} />,
//     },
//     {
//         description: "Quản lý đơn hàng",
//         icon: <RiBookReadFill style={styleIcon} />,
//     },
// ];

function NavBarComponentProfile() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    return (
        <Sider
            trigger={null}
            breakpoint="lg"
            theme="light"
            width={250}
            style={{ background: "#f5f5f5" }}
        >
            <Flex vertical wrap="nowrap" style={{ padding: "0 8px" }}>
                <WrapperCategorySiderBar
                    className={pathname === "/profile" ? "active" : ""}
                    onClick={() => {
                        navigate("/profile");
                    }}
                >
                    <BiSolidUser style={styleIcon} />
                    <WrapperDescriptionSiderBar>
                        Thông tin tài khoản
                    </WrapperDescriptionSiderBar>
                </WrapperCategorySiderBar>
                <WrapperCategorySiderBar
                    className={pathname === "/myorder" ? "active" : ""}
                    onClick={() => {
                        navigate("/myorder", {
                            state: {
                                id: user.id,
                                token: user.access_token,
                            },
                        });
                    }}
                >
                    <RiBookReadFill style={styleIcon} />
                    <WrapperDescriptionSiderBar>
                        Quản lý đơn hàng
                    </WrapperDescriptionSiderBar>
                </WrapperCategorySiderBar>
            </Flex>
        </Sider>
    );
}
export default NavBarComponentProfile;
