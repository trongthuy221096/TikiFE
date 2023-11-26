import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
    background: rgb(255, 255, 255);
    padding: 9px 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    span {
        color: rgb(36, 36, 36);
        font-weight: 400;
        font-size: 13px;
    }
`;

export const WrapperLeft = styled.div`
    width: 910px;
`;

export const WrapperListOrder = styled.div``;

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 9px 16px;
    background: #fff;
    margin-top: 12px;
`;

export const WrapperPriceDiscount = styled.span`
    color: #999;
    font-size: 12px;
    text-decoration: line-through;
    margin-left: 4px;
`;
export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    width: 84px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const WrapperRight = styled.div`
    width: 340px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;

export const WrapperInfo = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-radius: 8px;
    width: 100%;
`;

export const WrapperTotal = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 17px 20px;
    background: #fff;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`;

export const Lable = styled.span`
    font-size: 12px;
    color: #000;
    font-weight: bold;
`;

export const WrapperRadio = styled(Radio.Group)`
    margin-top: 10px;
    background: rgb(240, 248, 255);
    border: 1px solid rgb(194, 225, 255);
    width: 500px;
    border-radius: 4px;
    height: 100px;
    padding: 16px;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
`;

export const WrapperNameProductText = styled.span`
    font-size: 14px;
    line-height: 20px;
    color: rgb(128, 128, 137);
`;
export const WrapperPriceText = styled.div`
    color: rgb(56, 56, 61);
    font-weight: 500;
`;
export const WrapperLabelText = styled.h3`
    color: rgb(56, 56, 61);
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    margin: 0px;
`;
export const WrapperProduct = styled.div`
    width: 100%;
    border-radius: 12px;
    border: 1px solid rgb(221, 221, 227);
    margin-top: 20px;
    padding: 20px 16px 16px;
    position: relative;
    display: flex;
    z-index: 0;
`;
