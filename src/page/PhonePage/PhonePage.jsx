import React, { useEffect } from "react";
import { WrapperItemContent } from "../HomaPage/style";
import { Flex, Form, Typography, notification } from "antd";
import {
    WrapperInput,
    WrapperLabelText,
    WrapperSaveButton,
} from "../ProfilePage/style";
import { WrapperForm } from "./style";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UseMutationHook from "../../hooks/UseMutationHook";
import * as userService from "../../services/UserService";
import { updateUser } from "../../redux/slice/UserSlide";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const PhonePage = () => {
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
        userService.updateUser(user.id, data, user.access_token).then((res) => {
            if (res?.status === "ERR") {
                openNotificationWithIcon("error", res.message);
            } else if (res?.status === "OK") {
                openNotificationWithIcon("success", res.message);
                dispatch(updateUser({ ...res?.data }));
            }
        })
    );

    const onFinish = (values) => {
        mutation.mutate(values);
    };

    useEffect(() => {
        form.setFieldsValue(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    return (
        <div style={{ height: "44vh" }}>
            {contextHolder}
            <WrapperLabelText>Cập nhật số điện thoại</WrapperLabelText>
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
                            style={{ marginBottom: "30px" }}
                            colon={false}
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email",
                                },
                                {
                                    pattern: /^(0[3|5|7|8|9])+([0-9]{8})\b$/,
                                    message:
                                        "Số điện thoại bắt đầu (03,05,07,08,09) bao gồm 10 số",
                                },
                            ]}
                        >
                            <WrapperInput
                                prefix={
                                    <FaPhoneAlt
                                        className="site-form-item-icon"
                                        style={{ color: "rgb(155, 155, 155)" }}
                                    />
                                }
                                placeholder="Số điện thoại"
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

export default PhonePage;
