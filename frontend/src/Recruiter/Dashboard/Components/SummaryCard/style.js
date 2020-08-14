import styled from "styled-components";

export const CardWrapper = styled.div`
    display: flex;
    width: 20rem;
    height: 100%;
    flex-direction: column;
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 0.3rem;
    box-shadow: 3px 9px 10px rgba(0, 0, 0, 0.15);
`;

export const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const GraphWrapper = styled.div`
    display: flex;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: 10px solid #2f299c;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 600;
`;
