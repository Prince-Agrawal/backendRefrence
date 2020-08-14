import styled from "styled-components";

export const DashboardWrapper = styled.section`
    display: grid;
    row-gap: 2rem;
`;

export const HorizontalWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 20rem;
    justify-content: space-between;
    padding: 1rem 0;
    box-sizing: border-box;
`;

export const HorizontalWrapperFilled = styled.div`
    display: flex;
    width: 100%;
    height: 25rem;
    justify-content: space-between;
    padding: 1rem 0;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 3px 9px 10px rgba(0, 0, 0, 0.15);
`;
