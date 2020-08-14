import styled, { css } from "styled-components";

export const FilterPanelWrapper = styled.div`
    display: flex;
    width: 20rem;
    height: 100%;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.4rem;
    padding: 1rem;
    box-sizing: border-box;
    float: ${(props) => props.float || `none`};
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

export const RowWrapper = styled.div`
    display: grid;
    width: 100%;
    height: fit-content;
`;

export const TagWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;
