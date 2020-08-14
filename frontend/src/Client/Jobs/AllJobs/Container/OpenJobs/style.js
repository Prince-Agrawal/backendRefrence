import styled from "styled-components";

export const CandidateModalWrapper = styled.div`
    display: grid;
    row-gap: 1rem;
    padding: 1rem;
    font-size: 0.7rem;
`;

export const CandidateModalCards = styled.div`
    display: grid;
    box-sizing: border-box;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, 22rem);
`;
