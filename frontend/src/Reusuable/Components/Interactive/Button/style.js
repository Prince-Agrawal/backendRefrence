import styled from "styled-components";

export const ButtonWrapper = styled.button`
    display: flex;
    width: 7.7rem;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: ${(props) =>
        props.type == "dark"
            ? `white`
            : props.type === "light"
            ? `#10299C`
            : `#979797`};
    border: ${(props) =>
        props.type == "dark"
            ? `none`
            : props.type === "light"
            ? `1px solid #10299C`
            : `1px solid #979797`};
    background-color: ${(props) =>
        props.type == "dark" ? `#10299C` : `transparent`};
    border-radius: 0.4rem;
    cursor: pointer;
`;
