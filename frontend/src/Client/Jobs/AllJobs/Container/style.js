import styled from "styled-components";

export const MainWrapper = styled.section`
    display: grid;
    row-gap: 1.25rem;
    height: auto;
    align-items: center;
    position: relaltive;
`;

export const JobsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 22rem);
    gap: 1rem;
    justify-items: start;
`;

export const Label = styled.label`
    font-size: 1.5rem;
    color: #10299c;
    font-weight: 600;
`;

export const TableWrapper = styled.table`
    width: 70%;
    height: 100%;
    border-collapse: separate;
`;

export const TableRow = styled.tr`
    width: 100%;
    height: 3rem;
    border-radius: 0.3rem;
`;
export const TableHeader = styled.th`
    font-size: 1rem;
`;
