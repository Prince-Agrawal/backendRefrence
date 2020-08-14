import styled, { css } from "styled-components";

export const AddCandidateWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 1rem;
`;

export const MainInputWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    flex-direction: column;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-sizing: border-box;
    margin-top: 2rem;
    justify-content: space-between;
`;

export const MainContentWrapper = styled.div`
    display: grid;
    width: 100%;
    height: auto;
    grid-template-columns: repeat(2, minmax(22rem, 1fr));
    gap: 1rem;
    align-items: start;
`;

export const InputWrapper = styled.div`
    display: grid;
    ${(props) =>
        props.isTag &&
        css`
            grid-column: 1/3;
        `}
`;

export const TagWrapper = styled.div`
    display: block;
    justify-content: start;
    grid-column: 1/3;
`;

export const RadioBtnWrapper = styled.div`
    margin-bottom: 1rem;
    width: auto;
    height: auto;
    max-width: 22rem;
    display: grid;
    grid-template-rows: auto auto auto;
`;

export const ButtonWrapper = styled.div`
    display: grid;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    grid-auto-flow: column;
    margin-top: 5rem;
`;
