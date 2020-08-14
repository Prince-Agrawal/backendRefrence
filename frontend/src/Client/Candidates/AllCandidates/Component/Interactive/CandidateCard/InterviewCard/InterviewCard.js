import React from "react";
import { CardWrapper, HeaderWrapper, MainContent, Footer } from "./style";
import Checkbox from "../../../../../../../Reusuable/Components/Interactive/Checkbox/Checkbox";

export default function InterviewCard(props) {
    return (
        <CardWrapper>
            <HeaderWrapper>
                <div>
                    <span>{props.candidateName}</span>
                    <span>{props.date}</span>
                </div>
                <label>
                    {props.location}, {props.experience}
                </label>
            </HeaderWrapper>
            <MainContent>
                {props.interviewStages.map((stage) => (
                    <div key={stage.stageId}>
                        <span>{stage.stageName}</span>
                        <Checkbox
                            checkboxClick={() =>
                                props.checkboxClick(
                                    props.candidateId,
                                    stage.stageId
                                )
                            }
                            active={stage.status}
                        />
                    </div>
                ))}
            </MainContent>
            <Footer>
                <span>Resume</span>
            </Footer>
        </CardWrapper>
    );
}
