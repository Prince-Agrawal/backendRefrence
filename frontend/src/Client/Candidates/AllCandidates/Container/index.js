import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllCandidates } from "../../../../Redux/actions/Client/PanelActions";

import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import { CandidatesPanelWrapper, CandidateCardWrapper } from "./style";
import CandidateCard from "../Component/CandidateCard/CandidateCard";

export class Index extends Component {
    constructor(props) {
        super(props);
        this.props.getAllCandidates();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.allCandidates !== prevProps.allCandidates) {
            console.log(this.props.allCandidates);
        }
    }
    render() {
        return (
            <CandidatesPanelWrapper>
                <SectionHeader
                    title="Candidate Panel"
                    desc="Accept, Reject candidates and move them to next stage"
                />
                <CandidateCardWrapper>
                    {this.props.allCandidates.map((candidate) => (
                        <CandidateCard {...candidate} />
                    ))}
                </CandidateCardWrapper>
            </CandidatesPanelWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    allCandidates: state.client.panel.allCandidates,
});

const mapDispatchToProps = {
    getAllCandidates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
