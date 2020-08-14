import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

export const TabWrapper = styled(NavLink)`
    display: flex;
    position: relative;
    width: fit-content;
    height: 3rem;
    text-align: start;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    color: #979797;
    text-decoration: none;
    &.active {
        color: #3b5fff;
        &:after {
            content: "";
            background: #10299c;
            position: absolute;
            height: 3px;
            width: 5rem;
            bottom: 0;
            left: 0;
            border-radius: 16px;
        }
    }
`;

export const TabWrapperNormal = styled.div`
    display: flex;
    position: relative;
    width: fit-content;
    height: 3rem;
    text-align: start;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    color: #979797;
    text-decoration: none;
    ${(props) =>
        props.active &&
        css`
            color: #3b5fff;
            &:after {
                content: "";
                background: #10299c;
                position: absolute;
                height: 3px;
                width: 3rem;
                bottom: 4px;
                left: 0;
                border-radius: 16px;
            }
        `}
`;

export const Label = styled.label`
    font-size: 1rem;
    cursor: pointer;
    /* color: ${(props) => (props.active ? `#3b5fff` : `#979797`)}; */
`;
