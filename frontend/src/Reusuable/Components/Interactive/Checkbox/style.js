import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    background-color: transparent;
    padding: 4px 4px;
`;

export const CheckBox = styled.div`
    display: block;
    position: relative;
    background-color: transparent;
    width: 1rem;
    height: 1rem;
    border-radius: 20%;
    outline: none;
    border: 1px solid #d8d8d8;
    cursor: pointer;
    ${(props) =>
        props.label &&
        css`
            margin-right: 1rem;
        `}

    ${(props) =>
        props.active &&
        css`
            border: 1px solid transparent;

            background-color: #10299c;

            &&::before {
                content: "";
                background-color: transparent;
                position: absolute;
                top: 2px;
                right: 5px;
                width: 4px;
                border-bottom: 2px solid #fff;
                height: 10px;
                border-right: 2px solid #fff;
                border-radius: 0 0 15px 15px;
                transform: rotate(45deg);
                -o-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
            }
        `}
`;

export const Label = styled.label`
    font-size: 1rem;
    color: #000;
`;
