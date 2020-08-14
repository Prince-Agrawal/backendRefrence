import styled from "styled-components";

export const ButtonBarConatiner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
    height: 2.5rem;
    box-sizing: border-box;
`;

export const Button = styled.button`
    width: fit-content;
    min-width: 7.5rem;
    height: 2.5rem;
    z-index: 100;
    margin: 0.3rem;
    padding: 0.5rem;
    border: ${(props) =>
        props.children === "Reject"
            ? `1px solid rgba(218, 35, 11, 0.81)`
            : props.children === "New Candidate"
            ? `1px solid #10299C`
            : `none`};

    outline: none;
    background-color: ${(props) =>
        props.children === "Accept"
            ? `#10299c`
            : props.children === "Reject" || props.children === "New Candidate"
            ? `transparent`
            : `#10299c`};
    color: ${(props) =>
        props.children === "Reject"
            ? `rgba(218, 35, 11, 0.81)`
            : props.children === "New Candidate"
            ? `#10299C`
            : `#fff`};
    font-size: 1rem;
    border-radius: 5px;
    ${(props) =>
        props.disabled
            ? ``
            : props.children === "Reject"
            ? ` 
                    cursor: pointer;  
                    &:hover {
                        background-color: rgba(218, 35, 11, 0.21);
                    }
  `
            : props.children === "New Candidate"
            ? `
                         cursor: pointer;  
                    &:hover {
                        background-color: rgba(114, 139, 252,.3);
                    }   
                        `
            : `
                        cursor: pointer;  
                        &:hover {
                        background-color: #1086e0;
                    }`}
    box-sizing: border-box;
`;
