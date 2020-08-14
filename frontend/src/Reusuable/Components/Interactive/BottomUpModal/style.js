import styled, { keyframes, css } from "styled-components";

export const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    float: left;
`;

export const BackDrop = styled.div`
    position: absolute;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
`;

const BottomUpAnimation = keyframes`
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0);
    }
`;
const BottomUpReverseAnimation = keyframes`
    0% {
        transform: translateY(0);
    }
    80%,100% {
        transform: translateY(100%);
    }
`;

export const ModalWrapper = styled.div`
    display: flex;
    position: absolute;
    background-color: ${(props) => (props.cover ? `#f2f2f2` : `white`)};
    width: ${(props) => (props.cover ? `100%` : `50%`)};
    height: ${(props) => (props.cover ? `100vh` : `auto`)};
    ${(props) =>
        !props.cover &&
        css`
            max-height: 80vh;
        `}
    min-height: 60%;
    justify-content: center;
    z-index: 2500;
    bottom: 0;
    left: ${(props) => (props.cover ? `0` : `25%`)};
    border-radius: 4px 4px 0 0;
    animation: ${(props) =>
        props.goDown === true
            ? css`
                  ${BottomUpReverseAnimation} 0.5s ease-in-out
              `
            : css`
                  ${BottomUpAnimation} 0.5s ease-in-out
              `};
    overflow: auto;
    body {
        overflow: hidden !important;
        position: fixed !important;
    }
`;

export const CloseIconWrapper = styled.span`
    position: absolute;
    right: ${(props) => (props.cover ? `16px` : `5px`)};
    top: 5px;
    z-index: 1000;
    cursor: pointer;
`;
