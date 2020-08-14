import styled, { css } from "styled-components";

export const PersonalInformationWrapper = styled.div`
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

export const Label = styled.label`
    width: fit-content;
    height: fit-content;
    font-size: ${(props) => (props.error ? `12px` : `16px`)};
    color: ${(props) => (props.error ? `#dc3545` : `#000`)};
`;
export const RadioBtnWrapper = styled.div`
    margin-bottom: 1rem;
    width: auto;
    height: auto;
    max-width: 22rem;
    display: grid;
    grid-template-rows: auto auto auto;
`;

export const SubmitWrapper = styled.div`
    display: flex;
    width: 50%;
    justify-content: flex-end;
`;

export const ImageUploadWrapper = styled.div`
    display: flex;
    width: 85%;
    height: 10rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
`;

export const LocationDropdownWrapper = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 22rem;
    height: auto;
    max-height: 20rem;
    overflow: auto;
    transform: translateY(0);
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(92, 99, 105, 0.15);
`;

export const Location = styled.div`
    width: 22rem;
    height: 2rem;
    display: block;
    align-items: center;
    padding-left: 0.5rem;
    padding: 0.4rem 0;
    font-size: 1rem;
    cursor: pointer;
    z-index: 2000;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        color: #0051a793;
        background-color: rgba(0, 62, 128, 0.075);
    }

    ${(props) =>
        props.active &&
        css`
            color: #0050a7;
            background-color: rgba(0, 61, 128, 0.15);
        `}
`;

export const InputTagWrapper = styled.div`
    grid-column: 1/3;
`;
