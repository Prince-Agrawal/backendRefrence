import styled from "styled-components";

export const DomainExpertiseWrapper = styled.section`
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: column;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-sizing: border-box;
`;

export const DomainWrapper = styled.section`
    display: grid;
    width: 100%;
    height: auto;
    grid-template-columns: repeat(2, minmax(22rem, 1fr));
    gap: 1rem;
    align-items: center;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-sizing: border-box;
`;

export const TagWrapper = styled.div`
    display: block;
    justify-content: start;
    grid-column: 1/3;
`;

export const DomainButtonWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-auto-flow: column;
    column-gap: 1rem;
    padding: 1rem;
    justify-content: start;
`;

export const SubmitWrapper = styled.div`
    display: grid;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    grid-auto-flow: column;
`;

export const ExperienceWrapper = styled.div`
    display: grid;
    width: fit-content;
    column-gap: 0.5rem;
    grid-auto-flow: column;
    align-items: baseline;
`;
