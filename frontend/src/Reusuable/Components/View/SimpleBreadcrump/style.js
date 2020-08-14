import styled from 'styled-components'

export const Label = styled.div`
    color: #979797;
    margin: auto 0;
    margin-right: 1.5rem;

    ${(props) =>
        props.active &&
        css`
            color: #10299c;
        `}
    ${(props) =>
        !props.active &&
        css`
            color: #979797;
        `}


`;

export const SimpleWrapper = styled.div`
    display: flex;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0 1rem 0 0;
    margin-bottom: 2rem;

    .img {
        height: 1.3rem;
        margin: auto 0;
    }
`;
