import { Button, Flex, Input, Upload } from "antd";
import styled from "styled-components";

export const WrapperLabelText = styled.h4`
    font-size: 20px;
    line-height: 32px;
    font-weight: 350;
    margin: 4px 0px 12px;
`;

export const WrapperInfo = styled(Flex)`
    flex-wrap: nowrap;
    justify-content: space-between;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
`;

export const WrapperInfoLeft = styled(Flex)`
    width: 553px;
    padding: 16px 24px 16px 16px;
    border-right: 1px solid rgb(235, 235, 240);
`;

export const WrapperInfoRight = styled(Flex)`
    width: calc(100% - 553px);
    padding: 16px 16px 16px 24px;
    display: flex;
    flex-direction: column;
`;

export const WrapperInfoTitle = styled.span`
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: rgb(100, 100, 109);
`;

export const WrapperStyleAvatar = styled.div`
    background-color: rgb(240, 248, 255);
    border-radius: 50%;
    min-width: 112px;
    height: 112px;
    border: 4px solid rgb(194, 225, 255);
    position: relative;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-right: 16px;
    overflow: hidden;
    position: relative;
`;

export const WrapperInput = styled(Input)`
    transition: border-color 0.15s ease-in-out 0s,
        box-shadow 0.15s ease-in-out 0s, -webkit-box-shadow 0.15s ease-in-out 0s;
    height: 36px;
    width: 100%;
    border-radius: 4px;
    padding: 10px 12px;
    line-height: 20px;
    outline: none;
    flex: 1 1 0%;
    border: 1px solid rgb(196, 196, 207);
`;

export const WrapperLabelInput = styled.span`
    font-size: 14px;
    line-height: 20px;
    margin: 0px 0px 0px 6px;
    color: rgb(56, 56, 61);
    font-weight: 400;
`;

export const WrapperButton = styled(Button)`
    height: 30px;
    border-radius: 4px;
    font-size: 14px;
    padding: 0px 12px;
    color: rgb(11, 116, 229);
    border: 1px solid rgb(11, 116, 229);
    min-width: 86px;
`;

export const WrapperSaveButton = styled(Button)`
    width: 100%;
    height: 40px;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    font-size: 14px;
    background-color: rgb(11, 116, 229);
`;

export const WrapperUploadButton = styled(Button)`
    left: 94px;
    bottom: 20px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    padding: 0;
    font-size: 20px;
    color: #4096ff;
    border-color: #4096ff;
    &:hover {
        opacity: 0.8;
    }
`;

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload-list-item-container {
        display: none;
    }
`;

export const WrapperButtonIcon = styled(Button)`
    padding: 0;
    font-size: 28px;
    height: 28px;
    width: 28px;
    color: rgb(10, 104, 255);
    border: none;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 50%;
    z-index: 1;
`;
