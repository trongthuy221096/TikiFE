import { Button, Flex } from "antd";
import styled from "styled-components";

export const WrapperPriceProduct = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const WrapperPriceTextProduct = styled.h1`
  font-size: 32px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
  padding: 10px;
  margin: 10px 0;
`;

export const WrapperAddressProduct = styled(Flex)`
  cursor: pointer;
  gap: 4px;
  font-size: 15px;
  font-weight: 400;
  line-height: 150%;
  flex: 1;
  min-height: 21px;
`;

export const WrapperQuanlitiProduct = styled.div`
  margin: 10px 0;
  span {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
`;

export const WrapperButoonProduct = styled(Button)`
  height: 40px;
  font-size: 16px;
`;

export const WrapperImageItem = styled.div`
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 64px;
  height: 64px;
  padding: 4px;
  border-radius: 6px;
  border: 1px solid rgb(235, 235, 240);
  overflow: hidden;
`;

export const WrapperTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: rgb(39, 39, 42);
`;
export const WrapperTitleH1 = styled.h1`
  margin: 0px;
  color: rgb(39, 39, 42);
  font-size: 20px;
  font-weight: 500;
  line-height: 150%;
  word-break: break-word;
  white-space: break-spaces;
`;

export const WrapperSold = styled.div`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperAssurance = styled.div`
  padding: 8px 0px;
  border-bottom: 1px solid rgb(235, 235, 240);
  font-size: 15px;
  line-height: 150%;
  font-weight: 400;
  color: rgb(39, 39, 42);
`;
export const WrapperButoonAddProduct = styled(Button)`
  height: 40px;
  font-size: 16px;
  color: #4096ff;
  border-color: #4096ff;
  &:hover {
    background-color: rgba(10, 104, 255, 0.2);
  }
`;
