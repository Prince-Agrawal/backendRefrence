import styled from "styled-components";

export const AppDrawerWrapper = styled.div`
    display: grid;
    row-gap: 1rem;
    padding-bottom: 1rem;
    position: relative;
`;

export const NavigationItemWrapper = styled.div`
    padding: 0 1.5rem 0 0;
    position: relative;

    :first-child {
        padding-top: 1rem;
    }

    :not(:last-child) {
        padding-bottom: 1rem;
        :after {
            content: "";
            width: 10rem;
            height: 1px;
            position: absolute;
            background-color: #979797;
            bottom: 0;
        }
    }
`;

export const Label = styled.label`
    display: block;
    position: relative;
    padding: 0 1rem 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #10299c;
`;
