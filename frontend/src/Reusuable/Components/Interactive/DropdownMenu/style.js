import styled, { keyframes } from "styled-components";

export const DropdownMenuWrapper = styled.div`
    display: grid;
    width: 10rem;
    height: auto;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 -4px 38px rgba(0, 0, 0, 0.14), 0 19px 38px rgba(0, 0, 0, 0.14),
        5px 15px 12px rgba(0, 0, 0, 0.22);
    z-index: 2000;
    border-radius: 0.2rem;
    align-items: center;
    transform: translateX(-7rem);
    overflow: hidden;
`;
export const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-left: 0.5rem;
    margin: 0 !important;
    font-size: 0.85rem;
    cursor: pointer;
    box-sizing: border-box;
    padding: 0.2rem 0.2rem 0.2rem 0.4rem;

    &:hover {
        color: #0051a793;
        background-color: rgba(0, 62, 128, 0.075);
    }

    &:active {
        color: #0050a7;
        background-color: rgba(0, 61, 128, 0.15);
    }
`;
