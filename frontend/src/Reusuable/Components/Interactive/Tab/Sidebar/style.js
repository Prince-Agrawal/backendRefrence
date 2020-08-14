import styled from "styled-components";
import {NavLink} from 'react-router-dom'

export const TabSidebarWrapper = styled(NavLink)`
    display: flex;
    width: 12.5rem;
    height: 2.5rem;
    padding: 0.5rem 1.5rem;
    align-items: center;
    background-color: tranparent;
    border-radius: 0 3rem 3rem 0;
    box-sizing: border-box;
    cursor: pointer;
    color: #979797;
    &.active {
        background-color: #10299c;
        color: #fff;
    }
`;
export const Label = styled.label`
    width: fit;
    height: 1.5rem;
    font-size: 1rem;
    margin-left: 1.5rem;
    color: inherit;
    cursor: pointer;
`;
