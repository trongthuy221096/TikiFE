import { Input, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperInput = styled(Input)`
    transition: border-color 0.15s ease-in-out 0s,
        box-shadow 0.15s ease-in-out 0s, -webkit-box-shadow 0.15s ease-in-out 0s;
    height: 36px;
    width: 100%;
    border-radius: 6px;
    padding: 10px 12px;
    line-height: 20px;
    outline: none;
    flex: 1 1 0%;
    border: 1px solid rgb(196, 196, 207);
`;

export const WrapperInputNumber = styled(InputNumber)`
    transition: border-color 0.15s ease-in-out 0s,
        box-shadow 0.15s ease-in-out 0s, -webkit-box-shadow 0.15s ease-in-out 0s;
    height: 36px;
    width: 100%;
    border-radius: 6px;
    padding: 10px 12px;
    line-height: 20px;
    outline: none;
    flex: 1 1 0%;
    border: 1px solid rgb(196, 196, 207);
`;
