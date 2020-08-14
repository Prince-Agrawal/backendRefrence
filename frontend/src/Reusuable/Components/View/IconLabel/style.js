import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: fit-content;
    height: 1.5rem;
    flex-flow: ${(props) => (props.left ? `row-reverse` : `row`)};
`;

export const Icon = styled.div`
    display:block;
    position: relative;
    width: ${(props) => (props.small ? `1.4rem` : `1.5rem`)};
    height: ${(props) => (props.small ? `1.4rem` : `1.5rem`)};
    margin-right: ${(props) => (props.label ? `1rem` : `0rem`)};
    background: url('${(props) => props.icon}') no-repeat 0 0;
    background-size: cover;
`;

export const Label = styled.label`
    display: flex;
    width: auto;
    min-width: 7rem;
    flex-wrap: wrap;
    font-size: ${(props) => (props.small ? `.8rem` : `1rem`)};
    color: ${(props) => (props.dark ? `#000` : `#979797`)};
    text-align: start;
`;
