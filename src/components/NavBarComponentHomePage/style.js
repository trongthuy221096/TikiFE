import { Flex } from "antd";
import styled from "styled-components";
export const WrapperLabelText = styled.h4`
    color: rgb(56, 56, 61);
    font-size: 14px;
    font-weight: 700;
    margin: 8px 0;
`;

export const WrapperItemSiderBar = styled.div`
    padding: 0 24px;
`;
export const WrapperPriceSiderBar = styled.div`
    padding: 4px;
    background-color: rgb(238, 238, 238);
    border-radius: 10px;
    width: fit-content;
`;
export const WrapperCategorySiderBar = styled(Flex)`
    &:hover {
        background: rgba(39, 39, 42, 0.12);
        opacity: 0.8;
    }
    &.active {
        background: rgba(39, 39, 42, 0.12);
    }
    padding: 7px 16px;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
`;
export const WrapperDescriptionSiderBar = styled(Flex)`
    gap: 4px;
    -webkit-box-align: center;
    align-items: center;
    font-weight: 450;
    font-size: 14px;
    line-height: 150%;
    color: rgb(39, 39, 42);
`;
