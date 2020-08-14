import styled, { css } from "styled-components";

export const CardWrapper = styled.div`
    display: table-row;
    margin: 1rem;
    background-color: #c2c2c2;
    border-collapse: collapse;
    &:first-child,
    & td:first-child {
        border-top-left-radius: 10px;
    }
    &:first-child,
    & td:last-child {
        border-top-right-radius: 10px;
    }
    &:last-child,
    & td:first-child {
        border-bottom-left-radius: 10px;
    }
    &:last-child,
    & td:last-child {
        border-bottom-right-radius: 10px;
    }
`;

export const TableData = styled.td`
    font-size: 1rem;
    text-align: center;
`;

export const HeaderWrapper = styled.td`
    display: flex;
    flex-flow: column;
    height: 4.69rem;
    width: 100%;
    position: relative;

    ::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 3.375rem;
        border-bottom: 1px solid #9797975d;
    }
    div {
        display: flex;
        font-size: 1.5rem;
        align-items: center;
        align-content: center;
        box-sizing: border-box;
        span {
            padding-top: 0.25rem;
            margin-right: 1.5rem;
        }
    }

    label {
        color: #979797;
        font-size: 1rem;
    }
`;

export const SecondaryWrapper = styled.div`
    display: flex;
    height: 20%;
    width: 50%;
    font-size: 1rem;
    justify-content: space-between;
    align-items: center;
    position: relative;

    ::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 3.37rem;
        border-bottom: 1px solid #9797975d;
    }

    label {
        color: #979797;
    }
`;

export const MainContent = styled.div`
    display: grid;
    position: relative;
    height: 8.125rem;
    width: 100%;
    grid-auto-flow: column;
    column-gap: 1rem;
    font-size: 1rem;

    div {
        display: flex;
        flex-flow: column;
        width: 100%;
        padding: 0.5rem 0;

        div {
            display: flex;
            flex-flow: row;
            width: 100%;
            justify-content: space-between;
        }
    }

    ::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 3.37rem;
        border-bottom: 1px solid #9797975d;
    }
`;

export const Footer = styled.div`
    width: 50%;
    height: 20%;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    span:first-child {
        position: relative;
        ${(props) =>
            props.toReview &&
            css`
                :after {
                    content: "";
                    position: absolute;
                    background-color: #10299c;
                    border-radius: 100%;
                    top: 2px;
                    width: 9px;
                    height: 9px;
                }
            `}
    }
`;
