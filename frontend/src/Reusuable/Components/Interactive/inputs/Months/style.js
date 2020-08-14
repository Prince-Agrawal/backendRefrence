import styled, { css } from "styled-components";

export const YearsMenu = styled.div`
    width: 7rem;
    height: auto;
    display: grid;
    grid-template-rows: repeat(2, auto);
    float: left;
`;

export const YearsField = styled.div`
    width: 100%;
    height: auto;
    float: left;
    .text-field-container {
        margin-bottom: 0rem;
        cursor: pointer;
    }
    .text-field-container input {
        cursor: pointer;
    }
`;

export const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 7rem;
    height: auto;
    max-height: 15rem;
    transform: translateY(3.5rem);
    position: absolute;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(92, 99, 105, 0.15);
    float: left;
    overflow: auto;
`;

export const Dropdown = styled.div`
    display: block;
    align-items: center;
    padding-left: 0.5rem;
    padding: 0.4rem;
    font-size: 1rem;
    cursor: pointer;
    z-index: 2000;

    &:hover {
        color: #0051a793;
        background-color: rgba(0, 62, 128, 0.075);
    }

    ${(props) =>
        props.selected &&
        css`
            color: #0050a7;
            background-color: rgba(0, 61, 128, 0.15);
        `}
`;
