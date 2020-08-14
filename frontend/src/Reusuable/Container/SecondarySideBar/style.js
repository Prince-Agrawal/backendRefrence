import styled, { keyframes } from "styled-components";

export const SecondarySideBarWrapper = styled.div`
    display: flex;
    width: 5rem;
    height: fit-content;
    position: fixed;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0 0.4rem 0.4rem 0;
    box-sizing: border-box;
    top: 25%;
    left: 0;
    z-index: 0;
`;

export const SideBar = styled.div`
    display: flex;
    width: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
`;

export const Icon = styled.img.attrs((props) => ({
    src: props.src,
}))`
    width: 100%;
    z-index: 200;
    cursor: pointer;
`;

const FadeIn = keyframes`
    0%{
        opacity: 0;
        transform: translateX(-10px)
    },
    100%{
        opacity: 1;
        transform: translateX(0)
    }
`;

export const Label = styled.div`
    width: 7rem;
    height: fit-content;
    font-weight: 600;
    position: absolute;
    padding: 0.3rem;
    transition: transform 0.3s ease-in;
    transform: translateX(5.5rem);
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 2000;
    border-radius: 0.1rem;
    animation: ${FadeIn} 0.3s ease;
`;
