import styled, { css } from "styled-components";

export const NotificationIconWrapper = styled.div`
    display: block;
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.46rem;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    ${(props) =>
        props.count &&
        css`
            &:after {
                content:  "${(props) => props.count}"   ;
                position: absolute;
                width: 1.125rem;
                height: 1.125rem;
                font-size: 0.75rem;
                box-sizing: border-box;
                padding: .0321rem;
                top: 0;
                right: 0;
                border-radius: 50%;
                background-color: #10299c;
                color: #fff;
            }
        `}
`;
