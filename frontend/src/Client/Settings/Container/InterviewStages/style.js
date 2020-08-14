import styled, { css } from "styled-components";

export const InterviewStagesWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
`;

export const InputWrapper = styled.div`
    display: grid;
    width: 100%;
    height: auto;
    grid-template-columns: repeat(2, minmax(20rem, 1fr));
    gap: 1rem;
    padding: 1rem 0;
    align-items: center;
    background-color: #fff;
    border-radius: 0.5rem;
    box-sizing: border-box;
    :not(:last-child)::after:only-of-type {
        content: "";
        width: 50%;
        padding-top: 20px;
        border-bottom: 1px solid #ccc;
    }
`;

export const SaveButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    > * {
        margin-left: 1rem;
    }
`;

export const DepartmentWrapper = styled.div`
    display: grid;
    width: 100%;
    column-gap: 1rem;
    padding: 1rem 0;
`;

export const InputTagWrapper = styled.div`
    grid-column: 1/3;
`;

export const AddButtonsWrapper = styled.div`
    grid-column: 1/3;
    display: grid;
    gap: 1rem;
    grid-auto-flow: column;
    width: fit-content;
`;

export const Label = styled.label`
    margin: 0;
    padding: 0;
    width: fit-content;
    height: fit-content;
    ${(props) =>
        props.heading === true
            ? css`
                  font-size: ${(props) => (props.title ? `1.5rem` : `1.25rem`)};
                  color: ${(props) =>
                      props.bold
                          ? `#10299C`
                          : props.black
                          ? `#000`
                          : `#3B5FFF`};
                  font-weight: ${(props) => (props.bold ? `600` : `400`)};
              `
            : css`
                  font-size: ${(props) => (props.title ? `.8rem` : `.75rem`)};
                  font-weight: ${(props) => (props.bold ? `600` : `400`)};
                  color: ${(props) => (props.grey ? `#979797` : `#000`)};
                  ${(props) =>
                      props.small &&
                      css`
                          width: 5rem;
                          text-align: left;
                      `}
              `}
`;
