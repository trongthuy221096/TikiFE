import { Button, Select } from "antd";
import { styled } from "styled-components";

export const WrapperItemContent = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
`;

export const WrapperButtonHeader = styled(Button)`
  border: none;
  height: 40px;
  font-weight: 500;
  color: rgb(10, 104, 255);
  border: 1px solid rgb(10, 104, 255);
  margin-left: 10px;
  &:hover {
    color: #fff !important;
    opacity: 0.8;
    border: 1px solid rgb(10, 104, 255) !important;
    background-color: rgb(10, 104, 255);
  }
`;
export const WrapperSelect = styled(Select)`
  width: 160px !important;
  height: 40px;
`;
