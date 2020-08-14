import styled, { css } from "styled-components";
import crossActive from "../../../../Assets/Icons/Cross-icon/Cross-Active.png";

const gettingMargin = (props) => {
    if (props.index === 0 || props.length === 1) {
        return `1rem 0.75rem 1rem 0rem`;
    } else if (props.index === props.length - 1) {
        return `1rem 0rem 1rem 0.75rem`;
    } else {
        return `1rem 0.75rem 1rem 0.75rem`;
    }
};

const TagContainer = styled.div`
    margin: ${(props) => gettingMargin(props)};
    padding: 0.5rem 0.75rem 0.5rem 1.25rem;
    width: fit-content;
    height: 1.5rem;
    display: grid;
    grid-template-columns: auto 1.5rem;
    grid-column-gap: 0.5rem;
    background-color: #ebeeff;
    border-radius: 1.5rem;
    float: left;
    ${(props) =>
        props.small &&
        css`
            padding: ${(props) =>
                !props.view ? `0.3rem 0.3rem 0.3rem .3rem` : `0.3rem`};
            margin: 0.2rem;
            height: 1rem;
            display: block;
        `}
`;

const TagLabel = styled.label`
    align-self: center;
    justify-self: center;
    color: #10299c;
    font-size: ${(props) => (props.small ? `.7rem` : `1rem`)};
    line-height: 1.5;
    text-align: left;
    float: left;
`;

const TagCloseBtn = styled.button`
    padding: 0rem;
    width: ${(props) => (props.small ? `1.5rem` : `1.5rem`)};
    height: ${(props) => (props.small ? `1rem` : `1.5rem`)};
    border: none;
    outline: none;
    background-color: transparent;
    background-image: url(${crossActive});
    background-size: 1.5rem;
    background-repeat: no-repeat;
    background-position: 0.25rem;
    float: left;
    cursor: pointer;
`;

export { TagContainer, TagLabel, TagCloseBtn };
