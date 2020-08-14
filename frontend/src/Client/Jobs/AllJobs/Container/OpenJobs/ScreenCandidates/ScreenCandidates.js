import React, { Component } from "react";
import ScreenCard from "../../../../../Candidates/AllCandidates/Component/Interactive/CandidateCard/ScreenCard/ScreenCard";

export default class ScreenCandidates extends Component {
    componentDidMount() {
        //TODO: process to fetch the candidates based on jobID from openJobs.js
    }

    render() {
        return this.props.candidatesToShow.map((candidate) => {
            return (
                <ScreenCard
                    changeStatus={() => this.props.changeStatus(
                        candidate.candidateId,
                        "interview"
                    )}
                    key={candidate.candidateId}
                    {...candidate}
                />
            );
        });
    }
}
