import { Col, Divider, Drawer, Image, Row } from "antd";
import { convertDateTimeFormat } from "../../../ultils";
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

const AdminDrawerUserComponent = ({ user, onClose, open }) => {
    let birthday;
    if (user?.birthday) {
        const { $D, $M, $y } = user.birthday;
        birthday = `${$D}-${$M + 1}-${$y}`;
    }

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
                    Thông tin chi tiết người dùng
                </p>
                <p className="site-description-item-profile-p">
                    Thông tin cá nhân
                </p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Mã người dùng"
                            content={user._id}
                        />
                    </Col>

                    <Col span={24}>
                        <DescriptionItem
                            title="Họ và tên"
                            content={user.name}
                        />
                    </Col>

                    <Col span={12}>
                        <DescriptionItem
                            title="Giới tính"
                            content={user.gender}
                        />
                    </Col>

                    <Col span={12}>
                        <DescriptionItem title="Ngày sinh" content={birthday} />
                    </Col>

                    <Col span={24}>
                        <DescriptionItem
                            title="Địa chỉ"
                            content={user.address}
                        />
                    </Col>

                    <Col span={24}>
                        <DescriptionItem
                            title="Quốc tịch"
                            content={user.quoctich}
                        />
                    </Col>
                </Row>

                <Divider />
                <p className="site-description-item-profile-p">
                    Thông tin liên hệ
                </p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem
                            title="Số điện toại"
                            content={user.phone}
                        />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Email" content={user.email} />
                    </Col>
                </Row>

                <Divider />
                <p className="site-description-item-profile-p">Ngày khởi tạo</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem
                            title="Ngày tạo"
                            content={convertDateTimeFormat(user.createdAt)}
                        />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem
                            title="Ngày cập nhập"
                            content={convertDateTimeFormat(user.updatedAt)}
                        />
                    </Col>
                </Row>

                <Divider />
                <p className="site-description-item-profile-p">Image</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Ảnh đại diện"
                            content={<Image src={user.avatar}></Image>}
                        />
                    </Col>
                </Row>
            </Drawer>
        </>
    );
};
export default AdminDrawerUserComponent;
