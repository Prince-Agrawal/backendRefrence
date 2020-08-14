import styled, { css } from "styled-components";

export const WorkWrapper = styled.div`
    display: block;
    width: 100%;
    height: 100%;
`;

export const Label = styled.label`
    text-align: left;
    margin: 0;
    padding: 0;
    width: 12rem;
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
                  font-size: ${(props) => (props.title ? `1.25rem` : `1rem`)};
                  font-weight: ${(props) => (props.bold ? `600` : `semibold`)};
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
    width: 60%;
    justify-content: space-between;
    margin-bottom: 1rem;
`;
