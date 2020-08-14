import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    background-color: transparent;
    padding: 4px 4px;
`;

export const Switch = styled.div`
    position: relative;
    display: inline-block;
    width: 2rem;
    height: .7rem;
`;

export const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    border-radius: 34px;

    &::before {
        position: absolute;
        content: "";
        height: 1.2rem;
        width: 1.2rem;
        left: -10px;
        bottom: -3.8px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
    }

    ${(props) =>
        props.active &&
        css`
            background-color: #00c851;
            &:before {
                -webkit-transform: translateX(2rem);
                -ms-transform: translateX(2rem);
                transform: translateX(2rem);
            }
        `}
`;

export const Label = styled.div`
    font-size: 1rem;
    padding-right: 1.3rem;
    color: #000;
`;
