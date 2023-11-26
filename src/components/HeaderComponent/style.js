import { Button, Flex } from "antd";
import { styled } from "styled-components";

export const WrapperHeader = styled(Flex)`
    margin: auto;
    position: relative;
    min-width: 1380px;
    max-width: 1380px;
    background: rgb(255, 255, 255);
    padding: 8px 0;
    z-index: 999;
`;

export const WrapperLinkHeader = styled.a`
    display: block;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: rgb(128, 128, 137);
    margin-right: 12px;
    white-space: nowrap;
`;

export const WrapperButtonSearchHeader = styled(Button)`
    color: rgb(10, 104, 255) !important;
    border-left: none;
    &:hover {
        background-color: rgba(10, 104, 255, 0.2);
        border-color: #d9d9d9 !important;
    }
`;

export const WrapperButtonHeader = styled(Button)`
    border: none;
    height: 40px;
    font-weight: 500;
    color: rgb(128, 128, 137);
    &.enable {
        color: rgb(10, 104, 255) !important;
    }
    &.enable:hover {
        color: rgb(10, 104, 255) !important;
        background-color: rgba(10, 104, 255, 0.2);
    }
    &.active {
        color: rgb(10, 104, 255) !important;
        background-color: rgba(10, 104, 255, 0.2);
    }

    &.active:hover {
        color: rgb(10, 104, 255) !important;
        background-color: rgba(10, 104, 255, 0.2);
    }

    &:hover {
        background-color: rgba(39, 39, 42, 0.12);
        color: rgb(128, 128, 137) !important;
    }
`;

export const WrapperLocationHeader = styled.span`
    margin: 0px;
    color: rgb(128, 128, 137);
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    padding-right: 4px;
    white-space: nowrap;
`;

export const WrapperAddressHeader = styled.span`
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(39, 39, 42);
    &:hover {
        cursor: pointer;
    }
`;

export const WrapperNameHeader = styled.div`
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: rgb(128, 128, 137);
    margin-right: 12px;
    white-space: nowrap;

    &:hover {
        cursor: pointer;
    }
`;

export const WrapperItemtHeader = styled.div``;

export const WrapperContentHeader = styled.div`
    display: flex;
    align-items: center;
    margin: 0px;
    padding: 8px 16px;
    color: rgb(39, 39, 42);
    font-size: 14px;
    line-height: 150%;
    font-weight: 450;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        background-color: rgba(39, 39, 42, 0.12);
    }
`;
