import styled from "styled-components";

export const AdditionalInformationWrapper = styled.section`
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: column;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-sizing: border-box;
`;

export const InputWrapper = styled.div`
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

export const SocialSiteWrapper = styled.div`
    grid-column: 1/3;
    column-gap: 1rem;
    justify-content: start;
    padding-top: 1.5rem;

    &::before {
        content: "";
        position: absolute;
        width: 10rem;
        height: 2px;
        background-color: #ced4da;
        border-radius: 1rem;
        transform: translateY(-1.25rem);
        z-index: 0;
    }
`;

export const TextFieldWrapper = styled.div`
    display: block;
    margin-top: 0.5rem;
    &::before {
        content: "";
        position: absolute;
        width: 10rem;
        height: 2px;
        background-color: #ced4da;
        border-radius: 1rem;
        transform: translateY(-1.25rem);
    }
`;

export const SubmitWrapper = styled.div`
    display: grid;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    grid-auto-flow: column;
`;
