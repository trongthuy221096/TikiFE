import { Avatar, Badge, Flex, Image, Popover } from "antd";
import {
    WrapperAddressHeader,
    WrapperButtonHeader,
    WrapperButtonSearchHeader,
    WrapperContentHeader,
    WrapperHeader,
    WrapperItemtHeader,
    WrapperLinkHeader,
    WrapperLocationHeader,
    WrapperNameHeader,
} from "./style";
import Search from "antd/es/input/Search";
import imageLogo from "../../assests/images/logo.png";
import {
    SearchOutlined,
    HomeFilled,
    SmileOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { CiLocationOn } from "react-icons/ci";
import SignInComponent from "../SignInComponent/SignInComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "../../services/UserService";
import { resetUser } from "../../redux/slice/UserSlide";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { getFirstLetters } from "../../ultils";
const dataItemHeader = [
    { name: "11.11 Siêu Sale" },
    { name: "khỏe đẹp" },
    { name: "nhà cửa" },
    { name: "sách" },
    { name: "thể thao" },
    { name: "trái cây" },
    { name: "thịt, trứng" },
    { name: "rau củ quả" },
    { name: "sữa, bơ, phô mai" },
    { name: "hải sản" },
];

function HeaderComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const onSearch = (value) => {
        navigate(`/search?q=${value}`);
    };
    const [isModalOpen, setIsModalOpen] = useState(true);
    const user = useSelector((state) => state.user);
    const order =  useSelector((state) => state.order);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleLogout = async () => {
        setLoading(true);
        await userService.logoutUser();
        dispatch(resetUser());
        localStorage.setItem("access_token", "");
        localStorage.setItem("refresh_token", "");
        localStorage.setItem("isAdmin", "");
        setLoading(false);
        navigate("/");
    };
    const content = (
        <div>
            <WrapperItemtHeader
                onClick={() => {
                    navigate("/profile");
                }}
            >
                <WrapperContentHeader>Thông tin tài khoản</WrapperContentHeader>
            </WrapperItemtHeader>
            {user?.isAdmin && (
                <WrapperItemtHeader onClick={() => navigate("/admin/user")}>
                    <WrapperContentHeader>
                        Quản lí hệ thống
                    </WrapperContentHeader>
                </WrapperItemtHeader>
            )}

            <WrapperItemtHeader onClick={handleLogout}>
                <WrapperContentHeader>Đăng xuất</WrapperContentHeader>
            </WrapperItemtHeader>
        </div>
    );

    return (
        <div style={{ backgroundColor: "#fff" }}>
            <WrapperHeader gap={48}>
                <div>
                    <Image
                        width={72}
                        height={72}
                        src={imageLogo}
                        alt="logo"
                        preview={false}
                    />
                </div>
                <Flex vertical gap={8} flex={1}>
                    <Flex gap={20}>
                        <Flex flex={1} style={{ position: "relative" }}>
                            <Search
                                placeholder="Tìm sản phẩm"
                                onSearch={onSearch}
                                prefix={
                                    <SearchOutlined
                                        style={{
                                            color: "rgb(128, 128, 137)",
                                            fontSize: "20px",
                                        }}
                                    />
                                }
                                enterButton={
                                    <WrapperButtonSearchHeader>
                                        Tìm kiếm
                                    </WrapperButtonSearchHeader>
                                }
                                size="large"
                                style={{ color: "rgb(128, 128, 137)" }}
                                className="inputsearch"
                            />
                        </Flex>
                        <Flex gap={8}>
                            <WrapperButtonHeader
                                onClick={() => {
                                    navigate("/");
                                }}
                                className={pathname === "/" ? "active" : ""}
                            >
                                <Flex align="center" gap={5}>
                                    <HomeFilled style={{ fontSize: "22px" }} />
                                    <span>Trang chủ</span>
                                </Flex>
                            </WrapperButtonHeader>

                            {user.name || user.email ? (
                                <LoadingComponent
                                    isPending={loading}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Popover
                                        placement="bottom"
                                        content={content}
                                        trigger={"click"}
                                    >
                                        <Flex align="center">
                                            <Avatar
                                                size="large"
                                                src={user && user.avatar}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {user.avatar
                                                    ? ""
                                                    : getFirstLetters(
                                                          user?.name ||
                                                              user?.email
                                                      )}
                                            </Avatar>
                                            <WrapperNameHeader>
                                                {user.name || user.email}
                                            </WrapperNameHeader>
                                        </Flex>
                                    </Popover>
                                </LoadingComponent>
                            ) : (
                                <WrapperButtonHeader
                                    className=""
                                    onClick={showModal}
                                >
                                    <Flex align="center" gap={5}>
                                        <SmileOutlined
                                            style={{ fontSize: "22px" }}
                                        />
                                        <span>Tài khoản</span>
                                    </Flex>
                                </WrapperButtonHeader>
                            )}

                            <WrapperButtonHeader
                                className="enable"
                                onClick={() => {
                                    navigate("/order");
                                }}
                            >
                                <Badge
                                    count={order?.orderItems?.length}
                                    size="small"
                                >
                                    <ShoppingCartOutlined
                                        style={{
                                            fontSize: "22px",
                                            color: "rgb(10, 104, 255)",
                                        }}
                                    />
                                </Badge>
                            </WrapperButtonHeader>
                        </Flex>
                    </Flex>

                    <Flex>
                        <Flex style={{ height: "22px" }} flex={1}>
                            {dataItemHeader.map((item) => (
                                <WrapperLinkHeader href="#" key={item.name}>
                                    {item.name}
                                </WrapperLinkHeader>
                            ))}
                        </Flex>
                        <Flex justify="space-between" wrap="nowrap">
                            <CiLocationOn
                                size={22}
                                style={{ color: "rgb(128, 128, 137)" }}
                            />
                            <WrapperLocationHeader>
                                Giao đến :
                                <WrapperAddressHeader>
                                &nbsp;{user.address || "chưa cập nhập thông tin"}
                                </WrapperAddressHeader>
                            </WrapperLocationHeader>
                        </Flex>
                    </Flex>
                </Flex>

                <SignInComponent
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </WrapperHeader>
        </div>
    );
}
export default HeaderComponent;
