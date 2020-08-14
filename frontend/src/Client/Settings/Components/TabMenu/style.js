import styled from "styled-components";

export const TabMenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #70b1c7;
`;

export const TabMenu = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 3rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${(props) => (props.active ? `#10299c` : `#fff`)};
    transition: all 0.2s ease;
    flex-direction: column;
    cursor: pointer;

    background-color: ${(props) => (props.active ? `#fff` : `none`)};

    :hover {
        color: rgb(16, 41, 156);
    }

    :not(:last-child)::after {
        content: "";
        position: absolute;
        width: 100%;
        margin-top: 23px;
        border-bottom: 1px solid #fff;
    }
`;
