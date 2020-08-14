import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    background-color: transparent;
    padding: 4px 4px;
`;

export const Radio = styled.button`
           box-sizing: border-box;
            padding: 0;
           background-color: transparent;
           width: 1rem;
           height: 1rem;
           border-radius: 50%;
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
                   border: 4px solid #10299c ;
                   background-color: #fff;
               `}
       `;

export const Label = styled.div`
    font-size: 1rem;
    padding-right: 1rem;
    color: #000;
`;
