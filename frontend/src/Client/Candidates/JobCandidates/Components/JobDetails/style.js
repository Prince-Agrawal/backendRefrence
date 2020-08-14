import styled, { css } from "styled-components";

export const JobDetailsWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #fff;
    flex-direction: column;
    border-radius: 0.4rem;
    padding: 1rem;
    border-radius: 0.3rem;
    box-shadow: 3px 9px 10px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
`;

export const Label = styled.label`
    text-align: left;
    margin: 0;
    padding: 0;
    width: auto;
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
