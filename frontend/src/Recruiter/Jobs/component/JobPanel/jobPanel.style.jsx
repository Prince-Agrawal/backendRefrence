import styled from "styled-components";

export const JobPanelContainer = styled.div`
    display: grid;
    flex: 1;
    gap: 1rem 2rem;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 22rem));
`;

export const KeyValueWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    box-sizing: border-box;
`;
