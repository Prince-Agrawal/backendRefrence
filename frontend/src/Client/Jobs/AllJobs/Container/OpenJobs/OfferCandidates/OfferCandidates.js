import React, { Component } from "react";
import OfferCard from "../../../../../Candidates/AllCandidates/Component/Interactive/CandidateCard/OfferCard/OfferCard";

export default class OfferCandidates extends Component {
    componentDidMount() {
        //TODO: process to fetch the candidates based on jobID from openJobs.js
    }

    render() {
        return this.props.candidatesToShow.map((candidate) => {
            return (
                <OfferCard
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
