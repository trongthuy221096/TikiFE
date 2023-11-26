import { Button, Modal } from "antd";
import styled from "styled-components";

export const WrapperContainerLeft = styled.div`
    padding: 20px;
`;
export const WrapperButoonProduct = styled(Button)`
    height: 46px;
    width: 100%;
    font-weight: 600;
    color: rgb(13, 92, 182);
`;
export const WrapperContainerRight = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        136deg,
        rgb(240, 248, 255) -1%,
        rgb(219, 238, 255) 85%
    );
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
`;
export const WrapperModalProduct = styled(Modal)`
    overflow: hidden;
    .ant-modal-content {
        padding: 0;
    }
`;
