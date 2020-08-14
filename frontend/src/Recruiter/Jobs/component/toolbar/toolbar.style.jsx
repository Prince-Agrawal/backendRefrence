import styled from "styled-components";

export const ToolBarContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  color: #1086e0;
  font-size: 25px;
  width: 2rem;
  text-align: center;
  height: 70vh;
  right: 0;
  background-color: #ccc;
  align-items: center;
  padding: .2rem 0;
`;

export const UpToolBar = styled.div`
  display: grid;
  justify-content: space-between;
  gap: 1rem;
`;
export const DownToolBar = styled.div`
  display: flex;
  flex-direction: column;
`;
