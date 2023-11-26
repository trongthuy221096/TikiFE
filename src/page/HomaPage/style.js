import { Carousel, Flex } from "antd";
import { styled } from "styled-components";

export const WrapperItemContent = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
`;
export const WrapperItemFirstContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  flex: 1 0 0px;
  align-self: stretch;
`;
export const WrapperImageHeader = styled.div`
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
  border-radius: 12px;
  overflow: hidden;
`;

export const WrapperDescriptionContent = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: rgb(39, 39, 42);
`;

export const WrapperCarouselContent = styled(Carousel)`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
`;

export const WrapperButtonCarouselContent = styled.div`
  flex-direction: row;
  padding: 0px 16px;
  height: 32px;
  background: rgb(255, 255, 255);
  align-items: center;
  border: 1px solid rgb(221, 221, 227);
  border-radius: 16px;
  font-size: 14px;
  line-height: 150%;
  cursor: pointer;
  display: flex;
  text-align: center;
  color: rgb(39, 39, 42);
  &:hover {
    background: rgba(39, 39, 42, 0.12);
  }
  &.active {
    color: rgb(10, 104, 255);
    border: 1px solid rgb(10, 104, 255);
    font-weight: 600;
  }
  &.active:hover {
    color: rgb(10, 104, 255);
    border: 1px solid rgb(10, 104, 255);
    font-weight: 600;
    background: rgba(10, 104, 255, 0.12);
  }
`;
export const WrapperContentCard = styled.h3`
  overflow: hidden;
  white-space: break-spaces;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: rgb(39, 39, 42);
  margin: 0px;
  word-break: break-word;
  height: 78px;
`;
export const WrapperPriceCard = styled.div`
  text-align: left;
  font-size: 16px;
  line-height: 150%;
  font-weight: 500;
  color: rgb(39, 39, 42);
  margin: 0px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const WrapperSupPriceCard = styled.div`
  margin: -7px 0 0 3px;
  font-size: 75%;
  line-height: 0;
`;

export const WrapperItemCard = styled(Flex)`
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  text-decoration: none;
  display: flex;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(235, 235, 240);
  border-radius: 8px;
  width: 171px;
`;

export const WrapperFooterCard = styled.div`
  display: flex;
  gap: 4px;
  border-top: 1px solid rgb(235, 235, 240);
  padding-top: 6px;
  align-items: center;
  margin: 8px;
`;
export const WrapperFooterContentCard = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: rgb(128, 128, 137);
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
`;
