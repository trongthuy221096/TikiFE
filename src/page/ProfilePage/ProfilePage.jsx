import { useEffect, useState } from "react";
import {
    WrapperButton,
    WrapperInfo,
    WrapperInfoLeft,
    WrapperInfoRight,
    WrapperInfoTitle,
    WrapperInput,
    WrapperLabelInput,
    WrapperLabelText,
    WrapperSaveButton,
    WrapperStyleAvatar,
    WrapperUploadButton,
    WrapperUploadFile,
} from "./style";
import { DatePicker, Flex, Form, Image, Radio, notification } from "antd";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { PiLockFill } from "react-icons/pi";
import { BiCheckShield } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "../../services/UserService";
import UseMutationHook from "../../hooks/UseMutationHook";
import { updateUser } from "../../redux/slice/UserSlide";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { getBase64 } from "../../ultils";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const styleIcon = {
    width: "22px",
    height: "22px",
    fontSize: "22px",
    color: "rgb(155, 155, 155)",
};

const Profile = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState("");
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);

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

    const handleChangeAvatar = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };

    const onFinish = (values) => {
        let birthday;
        if (values?.birthday) {
            const { $D, $M, $y } = values.birthday;
            birthday = new Date(Date.UTC($y, $M, $D, 0, 0, 0));
        }
        const finalAvatar = avatar ? avatar : user.avatar;
        values = { ...values, birthday: birthday, avatar: finalAvatar };
        mutation.mutate(values);
    };

    useEffect(() => {
        if (form.getFieldsValue().name) {
            form.setFieldsValue(form.getFieldsValue());
        } else {
            const birthday = user.birthday
                ? dayjs(user.birthday, "YYYY-MM-DD")
                : null;
            const data = { ...user, birthday };
            form.setFieldsValue(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    return (
        <>
            {contextHolder}
            <WrapperLabelText>Thông tin tài khoản</WrapperLabelText>
            <WrapperInfo style={{ width: "973px" }}>
                <WrapperInfoLeft vertical>
                    <WrapperInfoTitle>Thông tin cá nhân</WrapperInfoTitle>
                    <LoadingComponent isPending={mutation.isPending}>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 7,
                            }}
                            wrapperCol={{
                                span: 17,
                            }}
                            onFinish={onFinish}
                            autoComplete="on"
                            style={{ marginTop: "16px" }}
                            form={form}
                        >
                            <Flex style={{ position: "relative" }}>
                                <WrapperStyleAvatar>
                                    <Image
                                        src={avatar || user.avatar}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: "110px",
                                            maxHeight: "110px",
                                            minWidth: "105px",
                                            minHeight: "105px",
                                        }}
                                    />
                                </WrapperStyleAvatar>
                                <WrapperUploadFile
                                    maxCount={1}
                                    beforeUpload={() => false}
                                    name="fileList"
                                    onChange={(value) => {
                                        const file = value.fileList[0];
                                        handleChangeAvatar(file);
                                    }}
                                >
                                    <WrapperUploadButton>
                                        <MdOutlineModeEdit />
                                    </WrapperUploadButton>
                                </WrapperUploadFile>

                                <div style={{ width: "100%" }}>
                                    <Form.Item
                                        colon={false}
                                        label="Họ & Tên"
                                        name="name"
                                        style={{ marginBottom: "34px" }}
                                    >
                                        <WrapperInput />
                                    </Form.Item>

                                    <Form.Item
                                        style={{ marginBottom: "34px" }}
                                        colon={false}
                                        label="Ngày sinh"
                                        name="birthday"
                                    >
                                        <DatePicker format="DD-MM-YYYY" />
                                    </Form.Item>
                                </div>
                            </Flex>
                            <Form.Item
                                name="gender"
                                label="Giới tính"
                                colon={false}
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 17,
                                }}
                                style={{ marginBottom: "34px" }}
                            >
                                <Radio.Group>
                                    <Radio value="Nam">Nam</Radio>
                                    <Radio value="Nữ">Nữ</Radio>
                                    <Radio value="Khác">Khác</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                style={{ marginBottom: "34px" }}
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 18,
                                }}
                                colon={false}
                                label="Địa chỉ"
                                name="address"
                            >
                                <WrapperInput placeholder="Thêm địa chỉ" />
                            </Form.Item>
                            <Form.Item
                                label="Quốc tịch"
                                colon={false}
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 18,
                                }}
                                style={{ marginBottom: "34px" }}
                                name="quoctich"
                            >
                                <WrapperInput placeholder="Thêm quốc tịch" />
                            </Form.Item>

                            <Form.Item
                                label={<span>&nbsp;</span>}
                                labelCol={{
                                    span: 6,
                                }}
                                colon={false}
                                wrapperCol={{
                                    span: 10,
                                }}
                            >
                                <WrapperSaveButton htmlType="submit">
                                    Lưu thay đổi
                                </WrapperSaveButton>
                            </Form.Item>
                        </Form>
                    </LoadingComponent>
                </WrapperInfoLeft>
                <WrapperInfoRight vertical>
                    <WrapperInfoTitle>Số điện thoại và Email</WrapperInfoTitle>
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{
                            padding: "19px 0",
                            borderBottom: "1px solid rgb(248, 248, 248)",
                        }}
                    >
                        <Flex gap={3}>
                            <FiPhone style={styleIcon} />
                            <Flex vertical>
                                <WrapperLabelInput>
                                    Số điện thoại
                                </WrapperLabelInput>
                                <WrapperLabelInput>
                                    {user.phone}
                                </WrapperLabelInput>
                            </Flex>
                        </Flex>
                        <Flex>
                            <WrapperButton
                                onClick={() => {
                                    navigate("/profile/phone");
                                }}
                            >
                                Cập nhập
                            </WrapperButton>
                        </Flex>
                    </Flex>
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{
                            padding: "19px 0",
                            borderBottom: "1px solid rgb(248, 248, 248)",
                        }}
                    >
                        <Flex gap={3}>
                            <HiOutlineMail style={styleIcon} />
                            <Flex vertical>
                                <WrapperLabelInput>Email</WrapperLabelInput>
                                <WrapperLabelInput>
                                    {user.email}
                                </WrapperLabelInput>
                            </Flex>
                        </Flex>
                        <Flex>
                            <WrapperButton
                                onClick={() => {
                                    navigate("/profile/email");
                                }}
                            >
                                Cập nhập
                            </WrapperButton>
                        </Flex>
                    </Flex>
                    <WrapperInfoTitle>Bảo mật</WrapperInfoTitle>
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{
                            padding: "19px 0",
                            borderBottom: "1px solid rgb(248, 248, 248)",
                        }}
                    >
                        <Flex align="center">
                            <PiLockFill style={styleIcon} />
                            <WrapperLabelInput>
                                Thiết lập mật khẩu
                            </WrapperLabelInput>
                        </Flex>
                        <Flex>
                            <WrapperButton
                                onClick={() => {
                                    navigate("/profile/changepassword");
                                }}
                            >
                                Cập nhập
                            </WrapperButton>
                        </Flex>
                    </Flex>
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{
                            padding: "19px 0",
                            borderBottom: "1px solid rgb(248, 248, 248)",
                        }}
                    >
                        <Flex align="center">
                            <BiCheckShield style={styleIcon} />
                            <WrapperLabelInput>
                                Thiết lập mã PIN
                            </WrapperLabelInput>
                        </Flex>
                        <Flex>
                            <WrapperButton>Thiết lập</WrapperButton>
                        </Flex>
                    </Flex>
                    <WrapperInfoTitle>Liên kết mạng xã hội</WrapperInfoTitle>
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{
                            padding: "19px 0",
                            borderBottom: "1px solid rgb(248, 248, 248)",
                        }}
                    >
                        <Flex align="center">
                            <FaFacebook
                                style={{
                                    ...styleIcon,
                                    color: "rgb(11, 116, 229)",
                                }}
                            />
                            <WrapperLabelInput>FaceBook</WrapperLabelInput>
                        </Flex>
                        <Flex>
                            <WrapperButton>Liên kết</WrapperButton>
                        </Flex>
                    </Flex>
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{
                            padding: "19px 0",
                            borderBottom: "1px solid rgb(248, 248, 248)",
                        }}
                    >
                        <Flex align="center">
                            <FcGoogle style={styleIcon} />
                            <WrapperLabelInput>Google</WrapperLabelInput>
                        </Flex>
                        <Flex>
                            <WrapperButton>Liên kết</WrapperButton>
                        </Flex>
                    </Flex>
                </WrapperInfoRight>
            </WrapperInfo>
        </>
    );
};

export default Profile;
