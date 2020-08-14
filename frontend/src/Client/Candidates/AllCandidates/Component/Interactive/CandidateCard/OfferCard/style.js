import styled from "styled-components";

export const CardWrapper = styled.div`
    width: 17rem;
    height: 16.5rem;
    background-color: #fff;
    display: flex;
    border-radius: 0.4rem;
    padding: 1.25rem 1rem;
    box-sizing: border-box;
    flex-flow: column;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-flow: column;
    height: 35%;
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
        justify-content: space-between;
        span:last-child {
            font-size: 1rem;
            padding-top: 0.25rem;
            color: #979797;
        }
    }

    label {
        color: #979797;
        font-size: 1rem;
    }
`;

export const MainContent = styled.div`
    display: grid;
    position: relative;
    height: 45%;
    width: 100%;
    grid-auto-flow: column;
    column-gap: 1rem;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
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
    width: 100%;
    height: 20%;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;
