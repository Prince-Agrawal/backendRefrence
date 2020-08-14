import styled, { css } from "styled-components";

export const BackDrop = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(1px);
    z-index: 2100;
`;

export const NotificationWrapper = styled.div`
    display: block;
    position: absolute;
    width: 30rem;
    height: 10rem;
    top: 30%;
    left: 30%;
    background-color: #fff;
    border-radius: 0.4rem;
    overflow: hidden;
    z-index: 2200;
`;

export const Header = styled.div`
    display: flex;
    width: 100%;
    height: 3rem;
    justify-content: space-between;
    padding: 0 0.5rem;
    border-bottom: 1px solid #979797;
    box-sizing: border-box;
    align-items: center;
`;

export const Label = styled.label`
    font-size: ${(props) => (props.title ? `1.6rem` : `1.25rem`)};
`;
