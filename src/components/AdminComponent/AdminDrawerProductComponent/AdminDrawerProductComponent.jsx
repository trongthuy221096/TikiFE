import { Col, Divider, Drawer, Image, Row } from "antd";
import { convertDateTimeFormat } from "../../../ultils";
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

const AdminDrawerProductComponent = ({ product, onClose, open }) => {
    return (
        <>
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
            >
                <p
                    className="site-description-item-profile-p"
                    style={{
                        marginBottom: 24,
                    }}
                >
                    Thông tin chi tiết sản phẩm
                </p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Tên sản phẩm"
                            content={product.name}
                        />
                    </Col>
                    <Col span={24}>
                        <DescriptionItem
                            title="Mã sản phẩm"
                            content={product._id}
                        />
                    </Col>
                    <Col span={24}>
                        <DescriptionItem
                            title="Loại sản phẩm"
                            content={product.type}
                        />
                    </Col>
                    <Col span={24}>
                        <DescriptionItem
                            title="Đánh giá"
                            content={`${product.rating} sao`}
                        />
                    </Col>
                    <Col span={24}>
                        <DescriptionItem
                            title="Mô tả"
                            content={product.description}
                        />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Thống kê hàng</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem
                            title="Số hàng tồn"
                            content={product.countInStock}
                        />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem
                            title="Số hàng đã bán"
                            content={product.selled}
                        />
                    </Col>
                </Row>

                <Divider />
                <p className="site-description-item-profile-p">Ngày khởi tạo</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem
                            title="Ngày tạo"
                            content={convertDateTimeFormat(product.createdAt)}
                        />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem
                            title="Ngày cập nhập"
                            content={convertDateTimeFormat(product.updatedAt)}
                        />
                    </Col>
                </Row>

                <Divider />
                <p className="site-description-item-profile-p">Image</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Hình ảnh"
                            content={
                                <Image
                                    src={product.image}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        maxWidth: "110px",
                                        maxHeight: "110px",
                                        minWidth: "105px",
                                        minHeight: "105px",
                                    }}
                                ></Image>
                            }
                        />
                    </Col>
                </Row>
            </Drawer>
        </>
    );
};
export default AdminDrawerProductComponent;
