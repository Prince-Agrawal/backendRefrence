import styled, { css } from "styled-components";

export const UserProfileWrapper = styled.section`
    display: flex;
    width: 100%;
    height: auto;
    min-height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    padding: 6rem 1rem 1rem 1rem;
    z-index: 300;
    background-color: #f2f2f2;
    box-sizing: border-box;
`;

export const LeftAside = styled.aside`
    width: 23%;
    height: 83vh;
    position: fixed;
    left: 0;
    background-color: white;
    border-radius: 0.4rem;
    transform: translateX(0.5rem);
    padding: 1rem;
    box-sizing: border-box;
    z-index: 300;
`;

export const MainContentWrapper = styled.div`
    display: flex;
    width: 75%;
    height: auto;
    margin-left: auto;
    background-color: white;
    border-radius: 0.4rem;
    padding: 1rem 5rem 1rem 1rem;
    box-sizing: border-box;
    flex-direction: column;
    & > * {
        margin-bottom: 1rem;
    }
`;

export const UserImage = styled.img.attrs((props) => ({
    src: props.src,
}))`
    display: flex;
    width: auto;
    max-width: 100%;
    height: 13rem;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 0.3rem;
    margin-bottom: 1rem;
    background-color: #c2c2c2;
    padding: 0.5rem;
    box-sizing: border-box;
`;

export const Label = styled.label`
    text-align: left;
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

export const SubContentWrapper = styled.div`
    display: grid;
    row-gap: 0.5rem;
    height: fit-content;
`;

export const TagWrapper = styled.div`
    display: grid;
    width: fit-content;
    height: fit-content;
    grid-auto-flow: column;
    column-gap: 2rem;
`;
