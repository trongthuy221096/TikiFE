import { Menu } from "antd";
import { LuUser2 } from "react-icons/lu";
import { AiOutlineAppstore } from "react-icons/ai";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router-dom";

const AdminNavBarComponent = ({ collapsed }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const getDefaultKey = () => {
        if (location.pathname === "/users") return "1";
        if (location.pathname === "/products") return "2";
        return "1";
    };
    const handleClick = (e) => {
        if (e.key === "1") {
            navigate("/admin/user");
        } else if (e.key === "2") {
            navigate("/admin/product");
        }
    };
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            theme="light"
            width={230}
            style={{
                padding: "4px",
                boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.5)",
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={[getDefaultKey()]}
                onClick={handleClick}
                items={[
                    {
                        key: "1",
                        icon: <LuUser2 size={20} />,
                        label: "Người dùng",
                    },
                    {
                        key: "2",
                        icon: <AiOutlineAppstore size={20} />,
                        label: "Sản phẩm",
                    },
                ]}
            />
        </Sider>
    );
};

export default AdminNavBarComponent;
