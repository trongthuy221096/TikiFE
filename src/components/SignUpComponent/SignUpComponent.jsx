import { WrapperButoonProduct, WrapperContainerLeft } from "./style";
import { Form, Input, Tooltip, Typography } from "antd";
import * as userService from "../../services/UserService";
import UseMutationHook from "../../hooks/UseMutationHook";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const SignUpComponent = ({ setIsLogin, formRef, openNotificationWithIcon }) => {
    const mutation = UseMutationHook((data) =>
        userService.signupUser(data).then((res) => {
            if (res?.status === "ERR") {
                openNotificationWithIcon("error", res.message);
            } else if (res?.status === "OK") {
                openNotificationWithIcon("success", res.message);
                setIsLogin(false);
            }
        })
    );

    const onFinish = (values) => {
        mutation.mutate(values);
    };

    return (
        <WrapperContainerLeft>
            <h1>Xin chào</h1>
            <p>Tạo tài khoản</p>
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
                            message: "Vui lòng nhập email đúng định dạng ",
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
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
                            message:
                                "Mật khẩu gồm 8 ký tự ít nhất 1 chữ hoa 1 chữ thường và 1 số",
                        },
                    ]}
                >
                    <Input.Password
                        name="password"
                        size="large"
                        placeholder="********"
                    />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Mật khẩu không khớp")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        name="confirmPassword"
                        size="large"
                        placeholder="********"
                    />
                </Form.Item>

                <Form.Item>
                    <LoadingComponent isPending={mutation.isPending}>
                        <WrapperButoonProduct
                            type="primary"
                            danger
                            htmlType="submit"
                        >
                            Đăng ký
                        </WrapperButoonProduct>
                    </LoadingComponent>
                </Form.Item>
                <div>
                    <Tooltip>
                        <Typography.Link
                            onClick={() => {
                                setIsLogin(false);
                            }}
                        >
                            Đăng nhập
                        </Typography.Link>
                    </Tooltip>
                </div>
            </Form>
        </WrapperContainerLeft>
    );
};

export default SignUpComponent;
