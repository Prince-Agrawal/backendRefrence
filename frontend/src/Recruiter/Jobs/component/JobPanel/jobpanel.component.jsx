import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
    getLiveJobs,
    getAcceptedJobs,
    getRejectedJobs,
    undoRejectedJob,
} from "../../../../Redux/actions/Recruiter/panel.actions";

import JobCard from "../job-card/jobCard.component";

import { JobPanelContainer, KeyValueWrapper } from "./jobPanel.style";
import ToolBar from "../toolbar/toobar.component";
import { Component } from "react";

import BottomUpModal from "../../../../Reusuable/Components/Interactive/BottomUpModal/BottomUpModal";
import CandidatePanel from "../candidate-panel/candidate-panel.components";
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import CustomCompetency from "../../../../Reusuable/Container/CustomCompetency/CustomCompetency";
import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import SearchIcon from "../../../../Assets/JobIcons/magnifying-glass.svg";

// when this component is rendered, it takes the Jobs state from the store,
// and then render different job types based on the category parameter.

class JobPanel extends Component {
    state = {
        selectedJobId: null,
        showCandidate: false,

        filters: [
            {
                name: "Search",
                type: "textfield",
                filterValues: [],
                filterField: {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "",
                    label: "",
                    placeholder: "Full Stack Developer",
                    value: "",
                    readOnly: false,
                    imgBtn: SearchIcon,
                },
            },
            {
                name: "Organization",
                type: "dropdown",
                filterValues: [],
                filterField: {
                    toggle: false,
                    isTag: true,
                    field: {
                        id: 1,
                        inputType: "text",
                        state: "normal",
                        name: "",
                        label: "",
                        placeholder: "Search",
                        value: "",
                        readOnly: false,
                        imgBtn: arrowDownIcon,
                    },
                    dropdown: [],
                    defaultDropdown: [],
                },
            },
            {
                name: "Location",
                type: "dropdown",
                filterValues: [],
                filterField: {
                    toggle: false,
                    isTag: true,
                    field: {
                        id: 1,
                        inputType: "text",
                        state: "normal",
                        name: "",
                        label: "",
                        placeholder: "Search",
                        value: "",
                        readOnly: false,
                        imgBtn: arrowDownIcon,
                    },
                    dropdown: [],
                    defaultDropdown: [],
                },
            },
            {
                name: "CTC",
                type: "range-slider",
                start: 0,
                end: 30,
            },

            {
                name: "Job Type",
                type: "checkbox",
                filterValues: [],
                filterField: [
                    {
                        id: 1,
                        active: false,
                        label: "Part-Time",
                    },
                    {
                        id: 2,
                        active: false,
                        label: "Full-Time",
                    },
                    {
                        id: 3,
                        label: "Internship",
                        active: false,
                    },
                ],
            },
        ],
    };
    componentDidMount() {
        if (this.props.match.params.category === "live") {
            this.props.getLiveJobs();
        } else if (this.props.match.params.category === "accepted") {
            this.props.getAcceptedJobs();
        } else if (this.props.match.params.category === "rejected") {
            this.props.getRejectedJobs();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.match.params.category !== this.props.match.params.category
        ) {
            if (this.props.match.params.category === "live") {
                this.props.getLiveJobs();
            } else if (this.props.match.params.category === "accepted") {
                this.props.getAcceptedJobs();
            } else if (this.props.match.params.category === "rejected") {
                this.props.getRejectedJobs();
            }
        }

        if (
            prevProps[`${this.props.match.params.category}Jobs`] !==
            this.props[`${this.props.match.params.category}Jobs`]
        ) {
            const state = JSON.parse(JSON.stringify(this.state));
            const locationOfAllJobs = this.props[
                `${this.props.match.params.category}Jobs`
            ]
                .map((job, index, arr) => {
                    if (job.location.trim().length) {
                        let isDuplicate = false;
                        let newLocation = job.location;
                        arr.forEach((job, i) => {
                            if (
                                job.location.toLowerCase() ===
                                    newLocation.toLowerCase() &&
                                index < i
                            ) {
                                isDuplicate = true;
                            }
                        });
                        if (!isDuplicate) {
                            return {
                                id: index,
                                name: job.location,
                                state: "not selected",
                            };
                        }
                    }
                    return false;
                })
                .filter(Boolean);
            const organizationOfAllJobs = this.props[
                `${this.props.match.params.category}Jobs`
            ]
                .map((job, index, arr) => {
                    if (job.job_title.trim().length) {
                        let isDuplicate = false;
                        let newOrganization = job.job_title;
                        arr.forEach((job, i) => {
                            if (
                                job.job_title.toLowerCase() ===
                                    newOrganization.toLowerCase() &&
                                index < i
                            ) {
                                isDuplicate = true;
                            }
                        });
                        if (!isDuplicate) {
                            return {
                                id: index,
                                name: job.job_title,
                                state: "not selected",
                            };
                        }
                    }
                    return false;
                })
                .filter(Boolean);
            state.filters[2].filterField.dropdown = locationOfAllJobs;
            state.filters[2].filterField.defaultDropdown = locationOfAllJobs;
            state.filters[1].filterField.dropdown = organizationOfAllJobs;
            state.filters[1].filterField.defaultDropdown = organizationOfAllJobs;
            this.setState(state);
        }
    }

    handleShowCandidateClick = (jobId) => {
        if (this.props.match.params.category === "accepted")
            this.setState({ selectedJobId: jobId, showCandidate: true });
    };
    handleHideCandidateClick = () => {
        this.setState({ selectedJobId: null, showCandidate: false });
    };

    handleJobCardClick = (category, jobId) => {
        this.props.history.push(`/recruiter/jobs/${category}/${jobId}`);
    };

    handleAddExistingCandidateClick = () => {
        this.props.history.push("/recruiter/candidates");
    };

    handleAddCandidateClick = (jobId) => {
        this.props.history.push("/recruiter/candidates/new");
        this.setState({ selectedJobId: jobId });
    };

    handleTagCloseBtnClick = (index, type, tagIndex) => {
        const state = JSON.parse(JSON.stringify(this.state));
        let array;
        if (type === "screens") {
            array = state.screenTerms;
        } else array = state[type][index].filterValues;
        array.splice(tagIndex, 1);
        this.setState(state);
    };

    handleInputValueChange = (event, type, index) => {
        const state = JSON.parse(JSON.stringify(this.state));
        let textfield;
        if (type === "screens") {
            textfield = state[type][index];
        } else textfield = state[type][index].filterField;
        textfield.value = event.target.value;

        this.setState(state);
    };

    handleAddTag = (index, type) => {
        const state = JSON.parse(JSON.stringify(this.state));
        let array, value;
        if (type === "screens") {
            array = state.screenTerms;
            value = state.screens[index].value;
            state.screens[index].value = "";
        } else {
            array = state[type][index].filterValues;
            value = state[type][index].filterField.value;
            state[type][index].filterField.value = "";
        }
        let isDuplicate = false;
        array.forEach((filterValue) => {
            if (filterValue.toLowerCase() === value.toLowerCase()) {
                isDuplicate = true;
            }
        });
        if (!isDuplicate) {
            array.push(value);
            this.setState(state);
        }
    };

    handleTexfieldKeyPress = (event, type, index) => {
        const code = event.keyCode || event.which;
        if (code === 13) {
            // "enter key" code is 13
            this.handleAddTag(index, type);
        }
    };

    handleSliderChange = (event, value, index) => {
        const state = JSON.parse(JSON.stringify(this.state));
        state.filters[index].start = value[0];
        state.filters[index].end = value[1];

        this.setState(state);
    };

    handleDropdowntoggle = (type, index) => {
        const state = JSON.parse(JSON.stringify(this.state));
        let dropdownMenu = state[type][index].filterField;
        dropdownMenu.toggle = !dropdownMenu.toggle;

        this.setState(state);
    };

    handleDropdownClick = (type, index, clickDropdown) => {
        const state = JSON.parse(JSON.stringify(this.state));
        let dropdownMenu = state[type][index].filterField;
        if (dropdownMenu.isTag) {
            let isDuplicate = false;
            state[type][index].filterValues.forEach((filterValue) => {
                if (filterValue.toLowerCase() === clickDropdown.toLowerCase()) {
                    isDuplicate = true;
                }
            });
            if (!isDuplicate) {
                state[type][index].filterValues.push(clickDropdown);
            }
        } else
            dropdownMenu.dropdown.forEach((dropdown) => {
                if (
                    dropdown.name === clickDropdown &&
                    dropdown.state !== "selected"
                ) {
                    dropdown.state = "selected";
                    dropdownMenu.value = clickDropdown;
                    dropdownMenu.field.value = clickDropdown;
                } else {
                    dropdown.state = "not selected";
                }
            });

        this.setState(state);

        const scope = this;
        setTimeout(() => {
            scope.handleDropdowntoggle("filters", index);
        }, 150);
    };

    handleDropdownInputValueChange = (event, type, index) => {
        const state = JSON.parse(JSON.stringify(this.state));
        let textfield = state[type][index].filterField.field;
        textfield.value = event.target.value;
        let defaultDropdown = state[type][
            index
        ].filterField.defaultDropdown.concat();
        let dropdown = defaultDropdown.filter((dropdown) => {
            if (
                dropdown.name
                    .toLowerCase()
                    .indexOf(event.target.value.toLowerCase()) > -1
            ) {
                return true;
            } else {
                return false;
            }
        });

        if (dropdown.length === 0) {
            dropdown.push({
                id: 0,
                name: event.target.value,
                state: "not selected",
            });
        }
        state[type][index].filterField.dropdown = dropdown.concat();
        this.setState(state);
    };

    handleCheckboxClick = (type, index, id) => {
        const state = JSON.parse(JSON.stringify(this.state));
        let checkboxes = state[type][index].filterField;
        checkboxes[id - 1].active = !checkboxes[id - 1].active;
        state[type][index].filterValues = [];
        let array = state[type][index].filterValues;
        checkboxes.forEach((checkbox) => {
            if (checkbox.active) {
                array.push(checkbox.label);
            }
        });
        this.setState(state);
    };

    handleMoreIconClick = (id) => {
        this.props.undoRejectedJob({ _id: id });
    };

    render() {
        const { match, liveJobs, acceptedJobs, rejectedJobs } = this.props;
        let jobs;
        switch (match.params.category) {
            case "live":
                jobs = liveJobs;
                break;
            case "accepted":
                jobs = acceptedJobs;
                break;
            case "rejected":
                jobs = rejectedJobs;
                break;
            default:
                jobs = liveJobs;
                break;
        }
        console.log(jobs);
        jobs = jobs?.filter((job) => {
            let isValid = true;
            if (this.state.filters[0].filterValues.length) {
                let exists = false;
                for (
                    let j = 0;
                    j < this.state.filters[0].filterValues.length;
                    j++
                ) {
                    if (
                        job.designation
                            .toLowerCase()
                            .includes(
                                this.state.filters[0].filterValues[
                                    j
                                ].toLowerCase()
                            )
                    ) {
                        exists = true;
                        break;
                    }
                }
                isValid = exists && isValid;
            }
            if (this.state.filters[1].filterValues.length) {
                let exists = false;
                for (
                    let j = 0;
                    j < this.state.filters[1].filterValues.length;
                    j++
                ) {
                    if (
                        job.job_title
                            .toLowerCase()
                            .includes(
                                this.state.filters[1].filterValues[
                                    j
                                ].toLowerCase()
                            )
                    ) {
                        exists = true;
                        break;
                    }
                }
                isValid = exists && isValid;
            }
            if (this.state.filters[2].filterValues.length) {
                let exists = false;
                for (
                    let j = 0;
                    j < this.state.filters[2].filterValues.length;
                    j++
                ) {
                    if (
                        job.location
                            .toLowerCase()
                            .includes(
                                this.state.filters[2].filterValues[
                                    j
                                ].toLowerCase()
                            )
                    ) {
                        exists = true;
                        break;
                    }
                }
                isValid = exists && isValid;
            }
            if (
                this.state.filters[3].start !== 0 ||
                this.state.filters[3].end !== 30
            ) {
                let exists = false;
                if (
                    job.CTC >= this.state.filters[3].start &&
                    job.CTC <= this.state.filters[3].end
                ) {
                    exists = true;
                }
                isValid = exists && isValid;
            }
            if (this.state.filters[4].filterValues.length) {
                let exists = false;
                for (
                    let j = 0;
                    j < this.state.filters[4].filterValues.length;
                    j++
                ) {
                    if (
                        job.job_type === this.state.filters[4].filterValues[j]
                    ) {
                        exists = true;
                        break;
                    }
                }
                isValid = exists && isValid;
            }

            return isValid;
        });
        return (
            <>
                <SectionHeader
                    title={`${match.params.category} Jobs`}
                    desc={
                        match.params.category === "live"
                            ? "In Live Jobs you can filter of out jobs assigned by your account manager"
                            : match.params.category === "accepted"
                            ? "In Accepted Job Section you can add candidates of the jobs selected by you."
                            : "In Rejected section you able to view the rejected jobs."
                    }
                />
                <KeyValueWrapper>
                    <JobPanelContainer>
                        {jobs && jobs.length > 0 ? (
                            jobs.map((job, index) => (
                                <JobCard
                                    key={index}
                                    job={job}
                                    category={match.params.category}
                                    jobCardClick={() =>
                                        this.handleJobCardClick(
                                            match.params.category,
                                            job._id
                                        )
                                    }
                                    addCandidateClick={() =>
                                        this.handleAddCandidateClick(job._id)
                                    }
                                    addExistingCandidateClick={
                                        this.handleAddExistingCandidateClick
                                    }
                                    showCandidateClick={() =>
                                        this.handleShowCandidateClick(job._id)
                                    }
                                    moreIconClick={
                                        match.params.category === "rejected"
                                            ? this.handleMoreIconClick
                                            : null
                                    }
                                />
                            ))
                        ) : (
                            <h4>No {match.params.category} Jobs </h4>
                        )}
                        {this.state.showCandidate &&
                        match.params.category === "accepted" ? (
                            <BottomUpModal
                                toggelModal={this.handleHideCandidateClick}
                            >
                                <CandidatePanel
                                    jobId={this.state.selectedJobId}
                                />
                            </BottomUpModal>
                        ) : null}
                    </JobPanelContainer>
                    <CustomCompetency
                        filters={this.state.filters}
                        title={"CUSTOM FILTER"}
                        float="right"
                        addTag={this.handleAddTag}
                        removeTag={this.handleTagCloseBtnClick}
                        textfieldChange={this.handleInputValueChange}
                        textfieldKeyPress={this.handleTexfieldKeyPress}
                        handleDropdowntoggle={this.handleDropdowntoggle}
                        handleDropdownClick={this.handleDropdownClick}
                        handleDropdownInputValueChange={
                            this.handleDropdownInputValueChange
                        }
                        handleSliderChange={this.handleSliderChange}
                        handleCheckboxClick={this.handleCheckboxClick}
                    />
                </KeyValueWrapper>
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    liveJobs: state.recruiter.panel.liveJobs,
    acceptedJobs: state.recruiter.panel.acceptedJobs,
    rejectedJobs: state.recruiter.panel.rejectedJobs,
    isLoading: state.recruiter.panel.isLoading,
});

const mapDispatchToProps = {
    getAcceptedJobs,
    getRejectedJobs,
    getLiveJobs,
    undoRejectedJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPanel);
