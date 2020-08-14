import styled, { css } from "styled-components";
export const MainWrapper = styled.div`
    display: grid;
    gap: 1rem;
`;
export const ScreenerWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 4rem;
    border-radius: 3rem;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
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
                  font-size: ${(props) => (props.title ? `1.15rem` : `1rem`)};
                  color: ${(props) =>
                      props.bold
                          ? `#10299C`
                          : props.black
                          ? `#000`
                          : `#3B5FFF`};
                  font-weight: ${(props) => (props.bold ? `600` : `400`)};
              `
            : css`
                  font-size: ${(props) => (props.title ? `.8rem` : `.7rem`)};
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

export const InputWrapper = styled.div`
    display: grid;
    width: 100%;
    height: fit-content;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fit, 14rem);
    gap: 1rem;
    align-self: baseline;
    justify-content: end;
`;

export const TagWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fit, 5rem, 1fr);
    gap: 0.5rem;
    justify-content: end;
`;
