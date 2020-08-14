import styled from "styled-components";

export const NotificationWrapper = styled.div`
    display: flex;
    width: 12.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    justify-content: space-between;
    box-sizing: border-box;
    border: 1px solid #979797;
    border-radius: 0.4rem;
`;

export const LeadingWrapper = styled.div`
    display: flex;
    width: 100%;
    cursor: pointer;
`;

export const Icon = styled.img.attrs((props) => ({
    src: props.src,
    alt: "type",
}))`
    width: 1.5rem;
    height: 1.5rem;
    padding-right: ${(props) => (props.leading ? `0.75rem` : `0rem`)};
    z-index: 100;
    cursor: pointer;
`;

export const Label = styled.label`
    font-size: 1rem;
    cursor: pointer;
`;
