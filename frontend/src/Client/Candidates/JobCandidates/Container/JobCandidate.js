import React, { Component } from "react";
import {
    JobCandidateWrapper,
    RowWrapper,
    CandidateCardWrapper,
    ContentWrapper,
    KeyValueWrapper,
    Label,
    TagWrapper,
} from "./style";

import { connect } from "react-redux";
import { getParticularJob } from "../../../../Redux/actions/Client/PanelActions";

import SummaryCard from "../Components/SummaryCard/SummaryCard";
import JobDetails from "../Components/JobDetails/JobDetails";

import ResumeIcon from "../../../../Assets/JobIcons/curriculum.svg";
import PlantIcon from "../../../../Assets/JobIcons/plant.svg";
import ExperienceIcon from "../../../../Assets/JobIcons/experience.svg";
import RupeesIcon from "../../../../Assets/JobIcons/rupee.svg";
import SearchIcon from "../../../../Assets/JobIcons/magnifying-glass.svg";
import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import IconLabel from "../../../../Reusuable/Components/View/IconLabel/IconLabel";
import Tag from "../../../../Reusuable/Components/Interactive/Tag/tag";
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import Dropdown from "../../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import FunnelChart from "../../../Dashboard/Component/FunnelChart/FunnelChart";
import Candidate from "../Components/Candidates/Candidate";
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableHead,
} from "@material-ui/core";
import BottomUpModal from "../../../../Reusuable/Components/Interactive/BottomUpModal/BottomUpModal";
import CandidateUpdate from "../Components/CandidateUpdateForm/CandidateUpdate";

export class JobCandidate extends Component {
    state = {
        showModal: false,
        candidateID: null,
        selectedCandidate: {
            stage: "",
            id: "",
        },
    };
    constructor(props) {
        super(props);
        this.props.getParticularJob(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedJob !== this.props.selectedJob) {
            if (
                !(this.props.selectedJob && Object.keys(this.props.selectedJob))
            ) {
                this.props.history.replace("/client");
                return;
            }
            if (
                this.props.selectedJob &&
                Object.keys(this.props.selectedJob).length
            ) {
                let candidateCount = 0;
                for (let key in this.props.selectedJob.stages) {
                    this.props.selectedJob.stages[key].forEach((candidate) => {
                        candidateCount++;
                    });
                }

                this.setState({
                    candidateCount,
                });
            }
        }
    }

    toggleModal = (candidateID) => {
        if (candidateID)
            this.setState({
                candidateID,
                showModal: !this.state.showModal,
            });
        else
            this.setState({
                showModal: !this.state.showModal,
            });
    };

    candidateClick = (stage, id) => {
        this.setState({ selectedCandidate: { stage, id } });
    };

    render() {
        const candidates = [];
        if (!this.props.selectedJob) {
            return <> </>;
        }
        for (let key in this.props.selectedJob?.stages) {
            const stage = key;
            for (let candidate of this.props.selectedJob.stages[key]) {
                candidates.push({ ...candidate, stage });
            }
        }

        return (
            <JobCandidateWrapper>
                {this.state.showModal ? (
                    <BottomUpModal toggelModal={this.toggleModal}>
                        <CandidateUpdate
                            stages={Object.keys(this.props.selectedJob.stages)}
                            currentStage={this.state.selectedCandidate.stage}
                            candidateID={this.state.selectedCandidate.id}
                            candidateUpdated={this.toggleModal}
                            jobID={this.props.match.params.id}
                        />
                    </BottomUpModal>
                ) : null}
                <RowWrapper>
                    {Object.keys(this.props.selectedJob?.stages)
                        .map((stage) => {
                            if (
                                ["Unaction", "offered", "rejected"].includes(
                                    stage
                                )
                            ) {
                                return false;
                            }
                            return (
                                <SummaryCard
                                    title={stage}
                                    count={
                                        this.props.selectedJob.stages[stage]
                                            .length
                                    }
                                />
                            );
                        })
                        .filter(Boolean)}
                </RowWrapper>
                <RowWrapper style={{ flexFlow: "row" }}>
                    <JobDetails
                        {...this.props.selectedJob}
                        totalCandidate={this.state.candidateCount}
                    />
                    <FunnelChart
                        title={{
                            text: "Recruitment Funnel",
                            horizontalAlign: "left",
                            fontColor: "#10299c",
                            fontSize: 24,
                            fontFamily: "open sans",
                            padding: 16,
                        }}
                        data={[
                            {
                                type: "funnel",
                                theme: "light2",
                                valueRepresents: "area",
                                toolTipContent:
                                    "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                                indexLabelPlacement: "inside",
                                indexLabel: "{label} ({percentage}%)",
                                dataPoints: [
                                    {
                                        y: this.state.candidateCount,
                                        label: "Applications",
                                    },
                                    {
                                        y: this.state.candidateCount,
                                        label: "Viewed",
                                    },
                                    {
                                        y: this.state.candidateCount,
                                        label: "Shortlisted",
                                    },
                                    {
                                        y: this.state.candidateCount,
                                        label: "In Process",
                                    },
                                    // { y: 0, label: "Offered" },
                                    // { y: 0, label: "Joined" },
                                ],
                            },
                        ]}
                    />
                </RowWrapper>
                <SectionHeader
                    title="Candidates"
                    desc="Edit status of the candiates"
                />
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Stage</TableCell>
                                <TableCell align="right">
                                    Candidate's Response
                                </TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidates?.map((candidate, index) => {
                                return (
                                    <Candidate
                                        toggleModal={() => {
                                            this.candidateClick(
                                                candidate.stage,
                                                candidate.candidate_id
                                            );
                                            this.toggleModal(candidate._id);
                                        }}
                                        {...candidate}
                                    />
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </JobCandidateWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedJob: state.client.panel.selectedJob,
});

export default connect(mapStateToProps, {
    getParticularJob,
})(JobCandidate);
