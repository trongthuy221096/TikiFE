import { Spin } from "antd";
import React from "react";

const LoadingComponent = ({ children, isPending, delay = 200, style }) => {
    return (
        <div style={style}>
            <Spin spinning={isPending} delay={delay}>
                {children}
            </Spin>
        </div>
    );
};

export default LoadingComponent;
