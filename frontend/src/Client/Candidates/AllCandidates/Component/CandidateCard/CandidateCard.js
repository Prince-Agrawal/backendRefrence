import React from "react";
import {
    CandidateCardWrapper,
    KeyValueWrapper,
    Label,
    RowWrapper,
} from "./style";

export default function CandidateCard(props) {
    return (
        <CandidateCardWrapper>
            <Label heading>{props.candidate_name}</Label>
            <RowWrapper style={{ gap: ".5rem", paddingTop: "1rem" }}>
                <KeyValueWrapper>
                    <Label>Job</Label>
                    <Label>{props.job_title}</Label>
                </KeyValueWrapper>
                <KeyValueWrapper>
                    <Label>status</Label>
                    <Label>{props.interview_stage || "Screen"}</Label>
                </KeyValueWrapper>
            </RowWrapper>
        </CandidateCardWrapper>
    );
}
