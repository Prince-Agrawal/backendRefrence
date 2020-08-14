import styled from "styled-components";

export const SummaryCardWrapper = styled.div`
    display: flex;
    width: 10rem;
    height: 10rem;
    border-radius: 0.4rem;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.1);
`;

export const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 1rem;
`;
export const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
`;
export const Count = styled.div`
    font-size: 2rem;
    color: #10299c;
`;
