import styled, { css } from "styled-components";

export const JobCandidateWrapper = styled.div`
    display: grid;
    gap: 1rem;
`;
export const RowWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    & > * {
        margin: 1rem;
        box-sizing: border-box;
    }
`;

export const CandidateCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => (props.disabled ? `#ccc` : `#fff`)};
    border-radius: 0.4rem;
    padding: 1rem;
    box-shadow: 3px 9px 10px rgba(0, 0, 0, 0.15);
`;

export const Label = styled.label`
    text-align: left;
    margin: 0;
    padding: 0;
    width: 100%;
    height: fit-content;

    ${(props) =>
        props.heading === true
            ? css`
                  font-size: ${(props) =>
                      props.title ? `1.25rem` : `1.15rem`};
                  color: ${(props) =>
                      props.bold
                          ? `#10299C`
                          : props.black
                          ? `#000`
                          : `#3B5FFF`};
                  font-weight: ${(props) => (props.bold ? `600` : `400`)};
              `
            : css`
                  font-size: ${(props) => (props.title ? `1rem` : `.8rem`)};
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

export const KeyValueWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
`;

export const TagWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;
