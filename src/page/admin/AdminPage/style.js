import { Button, Select } from "antd";
import { styled } from "styled-components";

export const WrapperItemContent = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
`;

export const WrapperExportExcelButton = styled(Button)`
  border: none;
  height: 40px;
  font-weight: 500;
  color: #179848;
  border: 1px solid #179848;

  &:hover {
    color: #fff !important;
    opacity: 0.8;
    border: 1px solid #179848 !important;
    background-color: #179848;
  }
`;

export const WrapperSelect = styled(Select)`
  width: 160px !important;
  height: 40px;
`;
