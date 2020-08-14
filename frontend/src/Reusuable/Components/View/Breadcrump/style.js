import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: fit-content;
    font-size: 1rem;
    font-weight: 600;
`;

export const CircleId = styled.div`
    display: flex;
    background-color: transparent;
    color: #979797;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    width: 1.7rem;
    height: 1.7rem;
    text-align: center;
    border: 1px solid #979797;
    
    .img {
        height: 1.5rem;
        margin: auto;
    }
    
    ${(props) =>
        props.active &&
        css`
            border-color: #000;
            color: #000;
        `}
    ${(props) =>
        props.done &&
        css`
            background-color: #10299c;
            border: none;
        `}
`;

export const Label = styled.div`
           width: fit-content;
           color: #979797;
           margin: auto 0;
           margin-left: 0.5rem;

           ${(props) =>
               props.active &&
               css`
                   color: rgba(0, 0, 0, 0.85);
               `}

           ${(props) =>
               props.done &&
               css`
                   color: #10299c;
               `}
       `;
