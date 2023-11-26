import { WrapperItemContent } from "../HomaPage/style";
import { Flex, Form, Typography, notification } from "antd";
import {
    WrapperInput,
    WrapperLabelText,
    WrapperSaveButton,
} from "../ProfilePage/style";
import { WrapperForm } from "./style";
import { useDispatch, useSelector } from "react-redux";
import UseMutationHook from "../../hooks/UseMutationHook";
import * as userService from "../../services/UserService";
import { updateUser } from "../../redux/slice/UserSlide";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const PassWordPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            duration: "3",
            className: "error",
        });
    };

    const mutation = UseMutationHook((data) =>
        userService.changePassWord(data).then((res) => {
            if (res?.status === "ERR") {
                openNotificationWithIcon("error", res.message);
            } else if (res?.status === "OK") {
                openNotificationWithIcon("success", res.message);
                dispatch(updateUser({ ...res?.data }));
                form.resetFields();
            }
        })
    );

    const onFinish = (values) => {
        const newData = { ...values, id: user.id };
        mutation.mutate(newData);
    };

    return (
        <div>
            {contextHolder}
            <WrapperLabelText>Đổi mật khẩu</WrapperLabelText>
            <WrapperItemContent>
                <Typography.Link
                    onClick={() => {
                        navigate("/profile");
                    }}
                >
                    <Flex align="center" gap={3}>
                        <IoArrowBack /> Quay lại
                    </Flex>
                </Typography.Link>

                <Flex vertical gap={10} align="center" justify="center">
                    <WrapperForm
                        name="basic"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            name="password"
                            label="Mật khẩu hiện tại"
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
                            <WrapperInput.Password
                                name="password"
                                size="large"
                                placeholder="********"
                            />
                        </Form.Item>
                        <Form.Item
                            name="newpassword"
                            label="Mật khẩu mới"
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
                            <WrapperInput.Password
                                name="password"
                                size="large"
                                placeholder="********"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={["newpassword"]}
                            label="Xác nhận mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("newpassword") ===
                                                value
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
                            <WrapperInput.Password
                                name="confirmPassword"
                                size="large"
                                placeholder="********"
                            />
                        </Form.Item>
                        <Form.Item>
                            <WrapperSaveButton htmlType="submit">
                                Lưu thay đổi
                            </WrapperSaveButton>
                        </Form.Item>
                    </WrapperForm>
                </Flex>
            </WrapperItemContent>
        </div>
    );
};

export default PassWordPage;
