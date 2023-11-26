import { Layout } from "antd";
import React, { useState } from "react";
import AdminNavBarComponent from "../AdminNavBarComponent/AdminNavBarComponent";
import AdminHeaderComponent from "../AdminHeaderComponent/AdminHeaderComponent";
import { Content } from "antd/es/layout/layout";

const AdminDefaultComponent = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div>
            <Layout style={{ minHeight: "100vh" }}>
                <AdminNavBarComponent
                    collapsed={collapsed}
                ></AdminNavBarComponent>
                <Layout>
                    <AdminHeaderComponent
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                    ></AdminHeaderComponent>
                    <Content
                        style={{
                            margin: "16px 16px 0",
                            background: "#fff",
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default AdminDefaultComponent;
