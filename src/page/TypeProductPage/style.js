import { Breadcrumb } from "antd";
import { styled } from "styled-components";

export const WrapperBreadcrumb = styled(Breadcrumb)`
  background-color: rgb(245, 245, 250);
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 15px;
`;
export const WrapperButtonShowMore = styled.div`
  padding: 10px 40px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(10, 104, 255);
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  color: rgb(10, 104, 255);
  &:hover {
    color: rgb(10, 104, 255);
    border: 1px solid rgb(10, 104, 255);
    background: rgba(10, 104, 255, 0.12);
    opacity: 0.8;
    font-weight: 500;
    cursor: pointer;
  }
`;
