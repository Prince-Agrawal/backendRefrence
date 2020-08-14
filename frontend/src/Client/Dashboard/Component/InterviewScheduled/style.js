import styled from "styled-components";

export const InterviewScheduleWrapper = styled.div`
    display: flex;
    height: calc(100% - 7rem);
    flex-direction: column;
    padding: 0 1rem;
    overflow: auto;
`;

export const Interviews = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
    border-bottom: ${(props) =>
        props.index === props.length - 1 ? `none` : `1px solid #979797`};
`;

export const Label = styled.label`
    padding-bottom: ${(props) =>
        props.index === props.length - 1 ? `none` : `0.4rem`};
    color: ${(props) =>
        props.type === "dark"
            ? "#10299c"
            : props.type === "grey"
            ? `#979797`
            : `#3b5fff`};
    font-size: ${(props) => (props.type === "grey" ? `1rem` : `1.25rem`)};
    text-transform: capitalize;
`;

export const LabelWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
