import React, { useEffect } from "react";
import { WrapperItemContent } from "../HomaPage/style";
import { Flex, Form, Typography, notification } from "antd";
import {
    WrapperInput,
    WrapperLabelText,
    WrapperSaveButton,
} from "../ProfilePage/style";
import { HiOutlineMail } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import UseMutationHook from "../../hooks/UseMutationHook";
import * as userService from "../../services/UserService";
import { updateUser } from "../../redux/slice/UserSlide";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { WrapperForm } from "../PhonePage/style";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const EmailPage = () => {
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
            <WrapperLabelText>Cập nhật email</WrapperLabelText>
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
                    <LoadingComponent isPending={mutation.isPending}>
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
                                label="Địa chỉ email"
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
                                <WrapperInput
                                    style={{ padding: "0 12px" }}
                                    prefix={
                                        <HiOutlineMail
                                            className="site-form-item-icon"
                                            size={24}
                                            style={{
                                                color: "rgb(155, 155, 155)",
                                            }}
                                        />
                                    }
                                    placeholder="Email"
                                />
                            </Form.Item>

                            <Form.Item>
                                <WrapperSaveButton htmlType="submit">
                                    Lưu thay đổi
                                </WrapperSaveButton>
                            </Form.Item>
                        </WrapperForm>
                    </LoadingComponent>
                </Flex>
            </WrapperItemContent>
        </div>
    );
};

export default EmailPage;
