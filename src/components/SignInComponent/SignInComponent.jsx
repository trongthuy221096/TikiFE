import {
    Col,
    Form,
    Image,
    Input,
    Row,
    Tooltip,
    Typography,
    notification,
} from "antd";
import {
    WrapperButoonProduct,
    WrapperContainerLeft,
    WrapperContainerRight,
    WrapperModalProduct,
} from "./style";
import { useRef, useState } from "react";
import SignUpComponent from "../SignUpComponent/SignUpComponent";
import * as userService from "../../services/UserService";
import UseMutationHook from "../../hooks/UseMutationHook";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slice/UserSlide";

const SignInComponent = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch();
    const [islogin, setIsLogin] = useState(false);
    const handleSetLogin = (value) => {
        setIsLogin(value);
    };

    const formRef = useRef();

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            duration: "3",
            className: "error",
        });
    };

    const handleOk = () => {
        setIsModalOpen(false);
        formRef.current?.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        formRef.current?.resetFields();
        handleSetLogin(false);
    };

    const mutation = UseMutationHook((data) =>
        userService.loginUser(data).then((res) => {
            if (res?.status === "ERR") {
                openNotificationWithIcon("error", res.message);
            } else if (res?.status === "OK") {
                localStorage.setItem(
                    "access_token",
                    JSON.stringify(res?.access_token)
                );
                localStorage.setItem(
                    "refresh_token",
                    JSON.stringify(res?.refresh_token)
                );

                if (res?.access_token) {
                    const decoded = jwtDecode(res?.access_token);
                    const role = decoded.isAdmin ? "ADMIN" : "USER";
                    localStorage.setItem("isAdmin", role);
                    if (decoded?.id) {
                        handleGetDetailsUser(decoded?.id, res?.access_token);
                    }
                }
                handleCancel();
            }
        })
    );

    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem("refresh_token");
        const refreshToken = JSON.parse(storage);
        const res = await userService.getDetailsUser(id, token);
        dispatch(
            updateUser({ ...res?.data, access_token: token, refreshToken })
        );
    };

    const onFinish = (values) => {
        mutation.mutate(values);
    };

    return (
        <WrapperModalProduct
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            footer={null}
            style={{ padding: "0" }}
        >
            <Row style={{ padding: "0" }}>
                <Col span={14}>
                    {islogin ? (
                        <SignUpComponent
                            setIsLogin={setIsLogin}
                            formRef={formRef}
                            openNotificationWithIcon={openNotificationWithIcon}
                        />
                    ) : (
                        <WrapperContainerLeft>
                            <h1>Xin chào</h1>
                            <p>Đăng nhập vào tài khoản</p>
                            <Form
                                onFinish={onFinish}
                                scrollToFirstError
                                ref={formRef}
                                autoComplete="on"
                            >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập email",
                                        },
                                        {
                                            pattern:
                                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                            message:
                                                "Vui lòng nhập email đúng định dạng ",
                                        },
                                    ]}
                                >
                                    <Input
                                        name="email"
                                        size="large"
                                        placeholder="abc@gmail.com"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mật khẩu",
                                        },
                                        {
                                            pattern:
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
                                            message:
                                                "Mật khẩu gồm 8 ký tự ít nhất 1 chữ hoa 1 chữ thường và 1 số",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        name="password"
                                        size="large"
                                        placeholder="********"
                                        autoComplete="on"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <LoadingComponent
                                        isPending={mutation.isPending}
                                    >
                                        <WrapperButoonProduct
                                            type="primary"
                                            danger
                                            htmlType="submit"
                                        >
                                            Đăng nhập
                                        </WrapperButoonProduct>
                                    </LoadingComponent>
                                </Form.Item>
                                <div>
                                    <Tooltip>
                                        <Typography.Link>
                                            Quên mật khẩu?
                                        </Typography.Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip>
                                        <span>Chưa có tài khoản ? </span>
                                        <Typography.Link
                                            onClick={() => {
                                                setIsLogin(true);
                                            }}
                                        >
                                            Tạo tài khoản?
                                        </Typography.Link>
                                    </Tooltip>
                                </div>
                            </Form>
                        </WrapperContainerLeft>
                    )}
                </Col>
                <Col span={10}>
                    <WrapperContainerRight>
                        <Image
                            height={203}
                            width={203}
                            preview={false}
                            src="https://github.com/khanhnttu/Ecommerce/blob/master/src/assets/images/logo-login.png?raw=true"
                        ></Image>
                        <h4 style={{ color: "rgb(26, 148, 255)" }}>
                            Mua sắm tại tiki
                        </h4>
                    </WrapperContainerRight>
                </Col>
            </Row>
            {contextHolder}
        </WrapperModalProduct>
    );
};

export default SignInComponent;
