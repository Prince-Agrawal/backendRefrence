import styled from "styled-components";

export const DashboardWrapper = styled.div`
    display: grid;
    height: 100%;
    width: 100%;
    gap: 1.25rem;
    grid-template-columns: 1fr 0.4fr;
    grid-template-rows: 0.3fr auto 20rem;
`;

export const SummaryWrapper = styled.div`
    display: flex;
    grid-column: 1/3;
    justify-content: space-between;
`;

export const ChartWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 0.4rem;
    overflow: hidden;
`;

export const Label = styled.div`
    color: #10299c;
    font-size: 1.5rem;
    font-weight: 500;
    padding: 1rem;
`;
