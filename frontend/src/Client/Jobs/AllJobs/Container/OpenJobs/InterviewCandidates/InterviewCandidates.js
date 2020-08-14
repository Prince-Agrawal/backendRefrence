import React, { Component } from "react";
import InterviewCard from "../../../../../Candidates/AllCandidates/Component/Interactive/CandidateCard/InterviewCard/InterviewCard";

export default class InterviewCandidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
        };
        this.props.candidatesToShow.forEach((candidate) =>
            this.state.candidates.push({
                ...candidate,
                // Restructuring the candidates to store information about
                // the interview stages
                interviewStages: [
                    {
                        stageId: 1,
                        stageName: "Interview Stage 1",
                        status: false,
                    },
                    {
                        stageId: 2,
                        stageName: "Interview Stage 2",
                        status: false,
                    },
                    {
                        stageId: 3,
                        stageName: "Interview Stage 3",
                        status: false,
                    },
                ],
            })
        );
    }

    componentDidMount() {
        //TODO: process to fetch the candidates based on jobID from openJobs.js
    }

    handleCheckBoxCLick = (candidateId, stageId) => {
        let candidates = this.state.candidates;

        let isValid = true;

        candidates.forEach((candidate) => {
            if (candidate.candidateId === candidateId) {
                candidate.interviewStages.forEach((interviewStage) => {
                    if (interviewStage.stageId === stageId) {
                        interviewStage.status = !interviewStage.status;
                    }
                    isValid = interviewStage.status && isValid;
                });
            }
        });
        if (isValid === true) {
            candidates = candidates.filter(
                (candidate) => candidate.candidateId !== candidateId
            );
            this.props.changeStatus(candidateId, "offer");
        }
        this.setState({ candidates });
    };

    render() {
        return this.state.candidates.map((candidate) => {
            return (
                <InterviewCard
                    checkboxClick={this.handleCheckBoxCLick}
                    key={candidate.candidateId}
                    {...candidate}
                />
            );
        });
    }
}
