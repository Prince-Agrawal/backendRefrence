import styled, { css } from "styled-components";

export const CandidateCardWrapper = styled.div`
    display: flex;
    width: 14rem;
    height: 10rem;
    background-color: #fff;
    border-radius: 0.4rem;
    padding: 1.25rem 1rem;
    box-sizing: border-box;
    flex-flow: column;
    margin: 1rem;
`;

export const Label = styled.label`
    text-align: left;
    margin: 0;
    padding: 0;
    width: auto;
    height: fit-content;
    text-align: right;

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
                  text-align: left;
              `
            : css`
                  font-size: ${(props) => (props.title ? `1rem` : `.8rem`)};
                  font-weight: ${(props) => (props.bold ? `600` : `400`)};
                  color: ${(props) => (props.grey ? `#979797` : `#000`)};
                  ${(props) =>
                      props.small &&
                      css`
                          width: 5rem;
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
