import { Divider, Modal, notification } from "antd";
import UseMutationHook from "../../../hooks/UseMutationHook";
import * as ProductService from "../../../services/ProductService";
import { useSelector } from "react-redux";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
const AdminProductDeleteModalComponent = ({
    isModalOpen,
    setIsModalOpen,
    refetch,
    product,
}) => {
    const user = useSelector((state) => state?.user);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            duration: "3",
        });
    };
    const mutation = UseMutationHook(() =>
        ProductService.deleteProduct(product._id, user?.access_token).then(
            (res) => {
                if (res?.status === "ERR") {
                    openNotificationWithIcon("error", res.message);
                } else if (res?.status === "OK") {
                    openNotificationWithIcon("success", res.message);
                    setIsModalOpen(false);
                    refetch();
                }
            }
        )
    );

    const onFinish = async () => {
        mutation.mutate();
    };
    return (
        <>
            {contextHolder}
            <Modal
                title="Xóa sản phẩm"
                style={{
                    top: 20,
                }}
                open={isModalOpen}
                onOk={onFinish}
                onCancel={() => setIsModalOpen(false)}
                okText="Xác nhận"
                cancelText="Hủy"
                okButtonProps={{
                    style: {
                        backgroundColor: "#DD6B20",
                    },
                    disabled: mutation.isPending && true,
                }}
                cancelButtonProps={{ disabled: mutation.isPending && true }}
            >
                <LoadingComponent isPending={mutation.isPending}>
                    <Divider style={{ margin: "0" }}></Divider>
                    <p style={{ fontSize: "15px" }}>
                        Bạn có chắc muốn xóa sản phẩm {product.name}
                    </p>
                    <p>Lưu ý sau khi xóa không thể khôi phục. </p>
                    <Divider style={{}}></Divider>
                </LoadingComponent>
            </Modal>
        </>
    );
};

export default AdminProductDeleteModalComponent;
