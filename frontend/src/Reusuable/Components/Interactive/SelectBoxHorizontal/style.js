import styled from "styled-components";

export const Wrapper = styled.div`
    width: fit-content;
    height: 2.5rem;
    display: flex;
    align-items: center;
    text-align: center;
`;

export const Select = styled.div`
           position: relative;
           width: calc(6rem - 2px);
           height: calc(100% - 2px);
           font-size: 1rem;
           text-align: center;
           box-sizing: border-box;
           padding: 0.5rem;
           background-color: ${(props) =>
               props.active ? "#10299c" : "transparent"};
           cursor: pointer;
           color: ${(props) => (props.active ? "#fff" : "#a4a4a4")};

           border-top: ${(props) =>
               props.active
                   ? `0rem`
                   : !(props.length - 1)
                   ? `0rem`
                   : `1px solid #979797`};
           border-right: ${(props) =>
               (props.index === props.length - 1 && props.length - 1) ||
               (props.index % 2 === 1 && !props.active)
                   ? `1px solid #979797`
                   : `0rem`};
           border-bottom: ${(props) =>
               props.active
                   ? `0rem`
                   : !(props.length - 1)
                   ? `0rem`
                   : `1px solid #979797`};
           border-left: ${(props) =>
               (props.index === 0 && props.length - 1) ||
               (props.index % 2 === 1 && !props.active)
                   ? `1px solid #979797`
                   : `0rem`};

           border-top-right-radius: ${(props) =>
               props.length - 1 && props.length - 1 === props.index
                   ? `.5rem`
                   : `0rem`};
           border-bottom-right-radius: ${(props) =>
               props.length - 1 && props.length - 1 === props.index
                   ? `.5rem`
                   : `0rem`};
           border-bottom-left-radius: ${(props) =>
               props.length - 1 && props.index === 0 ? `.5rem` : `0rem`};
           border-top-left-radius: ${(props) =>
               props.length - 1 && props.index === 0 ? `.5rem` : `0rem`};
       `;

export const Label = styled.label`
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #000;
`;

export const MainWrapper = styled.div`
    display: flex;
    text-align: start;
    flex-flow: column;
`;
