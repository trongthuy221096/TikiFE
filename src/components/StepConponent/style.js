import { InputNumber, Steps } from "antd";
import styled from "styled-components";
const { Step } = Steps;

export const CustomStep = styled(Step)`
    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
        background: #9255fd;
    }
`;
export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    }
`;
