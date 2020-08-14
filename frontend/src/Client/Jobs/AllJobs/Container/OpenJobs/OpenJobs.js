import React, { Component } from "react";

import { getOpenJobs } from "../../../../../Redux/actions/Client/PanelActions";
import { connect } from "react-redux";
import Modal from "../../Component/Interactive/Modal/Modal";
import { CandidateModalWrapper, CandidateModalCards } from "./style";
import CandidateModalTopBar from "../../Component/Interactive/CandidateModalTopBar/CandidateModalTopBar";
import ScreenCandidates from "./ScreenCandidates/ScreenCandidates";
import InterviewCandidates from "./InterviewCandidates/InterviewCandidates";
import OfferCandidates from "./OfferCandidates/OfferCandidates";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        cursor: "pointer",
    },
}))(TableRow);

export class OpenJobs extends Component {
    // state for openjobs + all candidates + show the modal +
    state = {
        // Open Jobs count = 3
        openJobs: [],
        candidates: [
            // Array of Candidates
            {
                jobId: 1, //Job ID === OpenJobs => id
                candidateId: 1,
                status: "screen",
                candidateName: "Candidate",
                location: "location",
                experience: "Experience",
                date: "Date",
                aditionalQualities: [
                    "Manage Multiple Projects",
                    "Quick Grasper",
                ],
            },
            {
                jobId: 1, //Job ID === OpenJobs => id
                candidateId: 2,
                status: "screen",
                candidateName: "Candidate",
                location: "location",
                experience: "Experience",
                date: "Date",
                aditionalQualities: [
                    "Manage Multiple Projects",
                    "Quick Grasper",
                ],
            },
            {
                jobId: 1, //Job ID === OpenJobs => id
                candidateId: 3,
                status: "interview",
                candidateName: "Candidate",
                location: "location",
                experience: "Experience",
                date: "Date",
            },
        ],

        modalTabs: {
            // To Handle the ative state of selectBoxess'
            selectBoxes: [
                {
                    name: "modalTabs",
                    options: [
                        {
                            id: "screen",
                            active: true,
                            label: "Screen",
                        },
                        {
                            id: "interview",
                            active: false,
                            label: "Interview",
                        },
                        {
                            id: "offer",
                            active: false,
                            label: "Offer",
                        },
                    ],
                },
            ],
        },
        showModal: false, // To show the Modal
        candidateClicked: null, // To store the jobId of the candidate being Clicked
        selectBoxClicked: "screen", //To current tab is being clicked
    };

    constructor(props) {
        super(props);
        this.props.getOpenJobs();
    }

    // On SelectBoxOption Click => change the active state of selectOption
    handleSelectBoxOptionClick = (clickSelectBoxName, clickOptionId) => {
        const modalTabs = this.state.modalTabs;
        const selectBoxes = modalTabs.selectBoxes;

        selectBoxes.map((selectBox) => {
            if (selectBox.name === clickSelectBoxName) {
                selectBox.options.map((option) => {
                    if (option.id === clickOptionId) option.active = true;
                    else option.active = false;
                    return option;
                });
            }
            return selectBox;
        });

        this.setState({
            modalTabs,
            selectBoxClicked: clickOptionId, // to store the current selectbox option been choosen
        });
    };

    // Pop the Modal
    popModal = () => {
        this.setState({ showModal: false });
        // To reset the currentTab to screen on Modal Pop
        this.handleSelectBoxOptionClick("modalTabs", "screen");
    };
    //Ends

    // To show the Modal when the candidates of the respective card is clicked
    handleCandidatesClick = (jobId) => {
        this.setState({
            candidateClicked: jobId, // To store the Id of the job to show respective candidates
            showModal: true,
        });
    };

    // Change the status of the candidate like screen/interview/offer
    handleChangeCandidateStatus = (candidateId, statusToChange) => {
        const candidates = this.state.candidates;
        candidates.forEach((candidate) => {
            if (candidate.candidateId === candidateId) {
                candidate.status = statusToChange;
                this.setState({
                    candidates,
                });
                return;
            }
        });
    };

    render() {
        let modal = null; //intial content of modal

        let candidatesToShow = []; //Array to store the candidates based on jobId

        if (this.state.candidateClicked) {
            //If the Candidate button is clicked
            this.state.candidates.forEach((candidate) => {
                if (candidate.jobId === this.state.candidateClicked) {
                    if (candidate.status === this.state.selectBoxClicked) {
                        candidatesToShow.push(candidate);
                    }
                }
            });

            modal = (
                //  Modal Construction Starts
                <Modal show={this.state.showModal} popModal={this.popModal}>
                    <CandidateModalWrapper>
                        <CandidateModalTopBar
                            modalTabs={this.state.modalTabs}
                            selectBoxOptionClick={
                                this.handleSelectBoxOptionClick
                            }
                        />
                        <CandidateModalCards>
                            {this.state.selectBoxClicked === "screen" ? (
                                <ScreenCandidates
                                    changeStatus={
                                        this.handleChangeCandidateStatus
                                    }
                                    candidatesToShow={candidatesToShow} // to filter out the screening candidate
                                />
                            ) : this.state.selectBoxClicked === "interview" ? (
                                <InterviewCandidates
                                    changeStatus={
                                        this.handleChangeCandidateStatus
                                    }
                                    candidatesToShow={candidatesToShow} // to filter out the interview candidate
                                />
                            ) : (
                                <OfferCandidates
                                    changeStatus={
                                        this.handleChangeCandidateStatus
                                    }
                                    candidatesToShow={candidatesToShow} // to filter out the interview candidate
                                />
                            )}
                        </CandidateModalCards>
                    </CandidateModalWrapper>
                </Modal>
                // Modal Contruction Ends
            );
        }
        return (
            <>
                {modal}

                {this.props.openJobs.map(({ job, stages }, index, arr) => {
                    const candidates = [];
                    for (let key in stages) {
                        stages[key].forEach((candidate) => {
                            candidates.push(candidate);
                        });
                    }
                    return (
                        <StyledTableRow
                            onClick={() => {
                                this.props.history.push(
                                    `/client/openjobs/${job._id}`
                                );
                            }}
                            key={job.id}
                        >
                            <StyledTableCell component="th" scope="row">
                                {index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {job.job_title}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {job.no_of_positions}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {candidates.length}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {job.location}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {job.joining_date}
                            </StyledTableCell>
                        </StyledTableRow>
                    );
                })}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    openJobs: state.client.panel.openJobs,
});

const mapDispatchToProps = {
    getOpenJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenJobs);
