import styled, { css } from "styled-components";

export const CandidatePanelWrapper = styled.section`
    display: flex;
    width: 100%;
    height: auto;
    min-height: 70vh;
    flex-direction: column;
    background-color: transparent;
    box-sizing: border-box;
    border-radius: 0.4rem;
    padding: 1rem;

    & > * {
        margin-bottom: 1rem !important;
    }
`;

export const MainWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    position: relative;
`;
export const MainCardWrapper = styled.div`
    display: grid;
    width: 70%;
    height: 100%;
    gap: 1rem;
    position: relative;
`;

export const CandidateCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => (props.disabled ? `#ccc` : `#fff`)};
    border-radius: 0.4rem;
    padding: 1rem;
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

export const RowWrapper = styled.div`
    display: grid;
    width: 100%;
    height: fit-content;
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
