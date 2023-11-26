import {
    DatePicker,
    Form,
    Modal,
    Radio,
    Upload,
    notification,
    Row,
} from "antd";
import { WrapperInput } from "./style";
import { useEffect, useState } from "react";
import { getBase64 } from "../../../ultils";
import { FaPlus } from "react-icons/fa6";
import * as UserService from "../../../services/UserService";
import UseMutationHook from "../../../hooks/UseMutationHook";
import { useSelector } from "react-redux";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
const AdminUserUpdateModalComponent = ({
    setIsModalOpen,
    isModalOpen,
    user,
    refetch,
}) => {
    const [formUpdate] = Form.useForm();
    const userLogin = useSelector((state) => state?.user);

    const handleCancelModal = () => {
        formUpdate.resetFields();
        setIsModalOpen(false);
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            duration: "3",
        });
    };

    const mutation = UseMutationHook((data) =>
        UserService.updateUser(user._id, data, userLogin?.access_token).then(
            (res) => {
                if (res?.status === "ERR") {
                    openNotificationWithIcon("error", res.message);
                } else if (res?.status === "OK") {
                    openNotificationWithIcon("success", res.message);
                    handleCancelModal();
                    refetch();
                }
            }
        )
    );

    const onFinish = async (values) => {
        let avatar;

        const file = values?.avatar?.file;
        let birthday;
        if (values?.birthday) {
            const { $D, $M, $y } = values.birthday;
            birthday = new Date(Date.UTC($y, $M, $D, 0, 0, 0));
        }

        if (file) {
            avatar = await getBase64(file);
        }

        mutation.mutate({
            ...values,
            birthday: birthday,
            avatar: avatar ? avatar : values.avatar,
        });
    };

    const handleOk = () => {
        formUpdate.submit();
    };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    const uploadButton = (
        <div>
            <FaPlus />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    useEffect(() => {
        formUpdate.setFieldsValue(user);
        setFileList([
            {
                uid: user._id,
                status: "done",
                url: user.avatar,
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div>
            {contextHolder}

            <Modal
                title="Cập nhập thông tin sản phẩm"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancelModal}
                okText="Cập nhập"
                cancelText="Hủy"
                okButtonProps={{ disabled: mutation.isPending && true }}
                cancelButtonProps={{ disabled: mutation.isPending && true }}
            >
                <LoadingComponent isPending={mutation.isPending}>
                    <Form
                        name="formUpdate"
                        style={{
                            maxWidth: 600,
                            padding: "10px",
                        }}
                        initialValues={user}
                        onFinish={onFinish}
                        autoComplete="off"
                        form={formUpdate}
                        layout="vertical"
                        colon={false}
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ và tên",
                                },
                            ]}
                        >
                            <WrapperInput placeholder="Nhập họ và tên" />
                        </Form.Item>

                        <Row justify={"space-between"}>
                            <Form.Item
                                name="gender"
                                label="Giới tính"
                                colon={false}
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn giới tính",
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value="Nam">Nam</Radio>
                                    <Radio value="Nữ">Nữ</Radio>
                                    <Radio value="Khác">Khác</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                colon={false}
                                label="Ngày sinh"
                                name="birthday"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn ngày sinh",
                                    },
                                ]}
                            >
                                <DatePicker format="DD-MM-YYYY" />
                            </Form.Item>
                        </Row>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại",
                                },
                            ]}
                        >
                            <WrapperInput placeholder="Nhập số điện thoại" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
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
                            <WrapperInput placeholder="Nhập email" />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ",
                                },
                            ]}
                        >
                            <WrapperInput placeholder="Nhập địa chỉ" />
                        </Form.Item>

                        <Form.Item label="Quốc tịch" name="quoctich">
                            <WrapperInput placeholder="Nhập quốc tịch" />
                        </Form.Item>

                        <Form.Item label="Hình ảnh" name="avatar">
                            <Upload
                                listType="picture-card"
                                beforeUpload={() => false}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                maxCount={1}
                                fileList={fileList}
                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </Modal>

            <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: "100%",
                    }}
                    src={previewImage}
                />
            </Modal>
        </div>
    );
};

export default AdminUserUpdateModalComponent;
