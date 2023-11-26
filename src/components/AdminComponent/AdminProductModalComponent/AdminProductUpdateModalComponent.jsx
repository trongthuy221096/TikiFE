import { Form, Modal, Select, Upload, notification } from "antd";
import { WrapperInput } from "./style";
import { useEffect, useState } from "react";
import { getBase64, renderOptions } from "../../../ultils";
import { FaPlus } from "react-icons/fa6";
import * as ProductService from "../../../services/ProductService";
import * as TypeProductService from "../../../services/TypeProductService";
import UseMutationHook from "../../../hooks/UseMutationHook";
import { useSelector } from "react-redux";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";

const AdminProductUpdateModalComponent = ({
    setIsModalOpen,
    isModalOpen,
    product,
    refetch,
}) => {
    const [formUpdate] = Form.useForm();
    const user = useSelector((state) => state?.user);

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            duration: "3",
        });
    };

    const getAllTypeProducts = async () => {
        const res = await TypeProductService.getAllTypeProduct();
        return res;
    };

    const { data: typeProduct } = useQuery({
        queryKey: ["type"],
        queryFn: () => getAllTypeProducts(),
    });

    const mutation = UseMutationHook((data) =>
        ProductService.updateProduct(
            product._id,
            user?.access_token,
            data
        ).then((res) => {
            if (res?.status === "ERR") {
                openNotificationWithIcon("error", res.message);
            } else if (res?.status === "OK") {
                openNotificationWithIcon("success", res.message);
                handleCancelModal();
                refetch();
            }
        })
    );

    const onFinish = async (values) => {
        const file = values.image.fileList && values?.image.fileList[0];
        if (file && !file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        mutation.mutate({
            ...values,
            image: file && file.preview ? file.preview : values.image,
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
        formUpdate.setFieldsValue(product);
        setFileList([
            {
                uid: product._id,
                status: "done",
                url: product.image,
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

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
                        initialValues={product}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={formUpdate}
                        layout="vertical"
                    >
                        <Form.Item
                            label=" Tên sản phẩm"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên sản phẩm",
                                },
                            ]}
                        >
                            <WrapperInput placeholder="Nhập tên sản phẩm" />
                        </Form.Item>

                        <Form.Item
                            label="Loại sản phẩm"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập loại sản phẩm",
                                },
                            ]}
                        >
                            <Select
                                options={renderOptions(typeProduct?.data)}
                                style={{ height: "36px" }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập giá sản phẩm",
                                },
                                {
                                    pattern: /^[0-9]*$/,
                                    message: "Vui lòng chỉ nhập số",
                                },
                            ]}
                        >
                            <WrapperInput placeholder="Nhập giá sản phẩm" />
                        </Form.Item>

                        <Form.Item
                            label="Đánh giá"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập đánh giá sản phẩm",
                                },
                                {
                                    pattern: /^[1-5](\.[0-9])?$/,
                                    message: "Vui lòng chỉ nhập từ 1.0 - 5.0",
                                },
                            ]}
                        >
                            <WrapperInput placeholder="Nhập đánh giá sản phẩm" />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng hàng"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số lượng sản phẩm",
                                },
                            ]}
                        >
                            <WrapperInput placeholder="Nhập số lượng hàng" />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mô tả sản phẩm",
                                },
                            ]}
                        >
                            <WrapperInput placeholder="Nhập mô tả sản phẩm" />
                        </Form.Item>

                        <Form.Item
                            label="Hình ảnh"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn hình ảnh sản phẩm",
                                },
                            ]}
                        >
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

export default AdminProductUpdateModalComponent;
