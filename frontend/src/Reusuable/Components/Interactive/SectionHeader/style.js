import styled from "styled-components";

export const SectionHeaderWrapper = styled.header`
    display: flex;
    width: 100%;
    height: 3rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c2c2c2;
`;

export const ContentWrapper = styled.div`
    width: fit-content;
    height: fit-content;
`;

export const Title = styled.label`
    font-size: ${(props) => (props.small ? `1.3rem` : `2rem`)};
    text-transform: capitalize;
    color: #10299c;
`;

export const DescriptionWrapper = styled.div`
    position: absolute;
    width: 15rem;
    height: auto;
    padding: 1rem;
    font-size: 1rem;
    background-color: #fff;
    border: 1px solid #c2c2c2;
    border-radius: 0.3rem;
    right: 1.25rem;
    transform: translateY(-25px);
    box-shadow: 3px 10px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    span {
        position: absolute;
        top: 30px;
        right: -15px;
    }
`;
