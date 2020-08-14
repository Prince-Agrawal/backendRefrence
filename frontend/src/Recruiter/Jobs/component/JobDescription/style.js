import styled, { css } from "styled-components";

export const JobDescriptionWrapper = styled.section`
    display: flex;
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
    padding: ${(props) => (props.cover ? `1rem` : `6rem 1rem 1rem 1rem`)};
    z-index: 200;
    background-color: #f2f2f2;
    box-sizing: border-box;
`;

export const LeftAside = styled.div`
    width: 20%;
    height: 80vh;
    position: fixed;
    left: 0;
    background-color: white;
    border-radius: 0.4rem;
    transform: translateX(0.5rem);
    padding: 1rem;
    box-sizing: border-box;
`;

export const RightAside = styled.div`
    width: 20%;
    height: 80vh;
    position: fixed;
    right: 0;
    background-color: white;
    border-radius: 0.4rem;
    transform: translateX(-0.5rem);
    padding: 1rem;
    box-sizing: border-box;
`;

export const MainContentWrapper = styled.div`
    display: grid;
    width: 55%;
    height: auto;
    margin: auto;
    background-color: white;
    border-radius: 0.4rem;
    padding: 1rem;
    box-sizing: border-box;
    row-gap: 1rem;
`;

export const SubContentWrapper = styled.div`
    display: grid;
    row-gap: 0.5rem;
    height: fit-content;
`;

export const JobImage = styled.div`
    display: flex;
    width: 100%;
    height: 10rem;
    justify-content: center;
    align-items: center;
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.3rem;
    margin-bottom: 1rem;
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
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export const JobDescriptionButton = styled.div`
    display: flex;
    width: 100%;
    height: 2.5rem;
    border-radius: 0.5rem;
    justify-content: center;
    align-items: center;
    ${(props) =>
        props.accept
            ? css`
                  background-color: #10299c;
                  color: #fff;
                  cursor: ${(props) => (props.readOnly ? `auto` : `pointer`)};
                  margin-bottom: 0.6rem;
                  ${(props) =>
                      !props.readOnly &&
                      css`
                          &:hover {
                              background-color: #1086e0;
                          }
                      `}
              `
            : css`
                  background-color: transparent;
                  color: rgba(218, 35, 11, 0.81);
                  border: 1px solid rgba(218, 35, 11, 0.81);
                  cursor: pointer;
                  &:hover {
                      background-color: rgba(218, 35, 11, 0.21);
                  }
              `}
`;
