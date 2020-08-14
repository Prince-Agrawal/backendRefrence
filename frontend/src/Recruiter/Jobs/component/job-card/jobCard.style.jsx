import styled, { css } from "styled-components";

export const JobCardWrapper = styled.div`
    display: grid;
    position: relative;
    width: 22rem;
    height: 23rem;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.4rem;
    background-color: #fff;
    box-sizing: border-box;
    cursor: pointer;
`;

export const ContentWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 0.5rem;
    box-sizing: border-box;

    :not(:nth-child(${(props) => {
                    return +props.noBorderBottomOn;
                }})) {
        ::after {
            content: "";
            position: absolute;
            width: 5rem;
            bottom: 0;
            left: 0;
            height: 1px;
            background-color: #979797;
        }
    }
`;

export const SubContentWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export const TitleContentWrapper = styled.div`
    display: grid;
    width: fit-content;
    grid-auto-flow: column;
    column-gap: 1.5rem;
    align-items: center;
`;
export const MainContentWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
    :not(:last-child) {
        padding-bottom: 1rem;
    }
`;

export const Label = styled.label`
    width: fit-content;
    font-size: ${(props) =>
        props.type === "primary"
            ? `1.5rem`
            : props.type === "secondary"
            ? `1.25rem`
            : props.type === "tertiary"
            ? `.8rem`
            : `1rem`};
    color: ${(props) => (props.color === "dark" ? `#000` : `#979797`)};
`;

export const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const JobImageWrapper = styled.img.attrs((props) => ({
    src: props.icon,
    alt: "job",
}))`
    width: 3rem;
    height: 3rem;
`;

export const MoreIconWrapper = styled.img.attrs((props) => ({
    src: props.icon,
    alt: "menu",
}))`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

export const Menu = styled.div`
    display: block;
    position: absolute;
    width: 1rem;
    height: 2rem;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 1000;
`;

export const MenuWrapper = styled.div`
    display: flex;
    width: 5rem;
    height: 1rem;
    padding: 0.5rem;
    border-radius: 0.3rem;
    color: #000;
    background-color: #fff;
    z-index: 100;
    align-items: center;
    transform: translateY(-10px);
    box-shadow: 10px 15px 15px rgba(0, 0, 0, 0.2),
        3px -5px 15px rgba(0, 0, 0, 0.1);

    :hover {
        color: rgb(59, 95, 255);
        background-color: #c6cfff;
    }
`;
