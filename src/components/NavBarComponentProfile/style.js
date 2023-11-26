import { Flex, Image } from "antd";
import styled from "styled-components";

export const WrapperCategorySiderBar = styled(Flex)`
    &:hover {
        background-color: rgb(235, 235, 240);
        color: rgb(0, 0, 0);
    }
    &.active {
        background-color: rgb(235, 235, 240);
        color: rgb(0, 0, 0);
    }
    padding: 7px 16px;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
`;
export const WrapperDescriptionSiderBar = styled(Flex)`
    gap: 4px;
    align-items: center;
    font-weight: 450;
    font-size: 14px;
    line-height: 150%;
    color: rgb(39, 39, 42);
`;

export const WrapperItemProfileSiderBar = styled(Flex)`
    padding-left: 7px;
    margin: 0px 0px 12px;
`;

export const WrapperImageProfileSiderBar = styled(Image)`
    width: 45px !important;
    margin: 0px 12px 0px 0px;
    border-radius: 50%;
`;

export const WrapperInfoProfileSiderBar = styled(Flex)`
    flex: 1 1 0%;
    font-size: 13px;
    line-height: 15px;
    color: rgb(51, 51, 51);
    font-weight: 400;
`;

export const WrapperNameProfileSiderBar = styled.strong`
    font-size: 16px;
    line-height: 19px;
    font-weight: 450;
    display: block;
    margin: 4px 0px 0px;
`;
