import styled, { css } from "styled-components";

export const CandidatePanelWrapper = styled.section`
    display: flex;
    width: 100%;
    height: auto;
    min-height: 70vh;
    flex-direction: column;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 0.4rem;
    padding: 1rem;

    & > * {
        margin-bottom: 1rem !important;
    }
`;

export const Label = styled.label`
    text-align: left;
    margin: 0;
    padding: 0;
    width: 100%;
    height: fit-content;

    ${(props) =>
        props.heading === true
            ? css`
                  font-size: ${(props) =>
                      props.title ? `1.25rem` : `1.15rem`};
                  color: ${(props) =>
                      props.bold
                          ? `#10299C`
                          : props.black
                          ? `#000`
                          : `#3B5FFF`};
                  font-weight: ${(props) => (props.bold ? `600` : `400`)};
              `
            : css`
                  font-size: ${(props) => (props.title ? `.8rem` : `.75rem`)};
                  font-weight: ${(props) => (props.bold ? `600` : `semibold`)};
                  color: ${(props) => (props.grey ? `#979797` : `#000`)};
                  ${(props) =>
                      props.small &&
                      css`
                          width: 5rem;
                          text-align: left;
                      `}
              `}
`;

export const CandidateContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    & > * {
        margin-bottom: 1rem !important;
    }
`;

export const CandidateCardContainer = styled.div`
    display: flex;
    width: 100%;
    height: 5rem;
    justify-content: space-between;
    align-items: center;
`;

export const LeadingContent = styled.div`
    display: flex;
`;

export const HeroImage = styled.div`
    display: block;
    position: relative;
    width: 4rem;
    height: 4rem;
    background-color: #5b64ff;
    border-radius: 50%;
    margin-right: 1rem;

    &::after {
      content: '${(props) => props.name[0]}';
      font-size: 1.5rem;
      width: 4rem;
      height: 4rem;
      position: absolute;
      color: #fff;
      right: 0;
      bottom: 0;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 1rem;
      box-sizing: border-box;
    }
`;
