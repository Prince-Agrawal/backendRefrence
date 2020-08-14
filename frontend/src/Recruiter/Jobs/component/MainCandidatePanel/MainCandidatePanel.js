import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getRecruiterCandidate,
    toggel,
    addExistingCandidate,
} from "../../../../Redux/actions/Recruiter/panel.actions";

import {
    CandidatePanelWrapper,
    MainCardWrapper,
    CandidateCardWrapper,
    MainWrapper,
    Label,
    KeyValueWrapper,
    RowWrapper,
    ContentWrapper,
    TagWrapper,
} from "./style";
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import Tag from "../../../../Reusuable/Components/Interactive/Tag/tag";
import TabbarMain from "../../../../Reusuable/Container/SectionTopBar/TabbarMain";
import ResumeIcon from "../../../../Assets/JobIcons/curriculum.svg";
import PlantIcon from "../../../../Assets/JobIcons/plant.svg";
import InfoIcon from "../../../../Assets/JobIcons/info.svg";
import ExperienceIcon from "../../../../Assets/JobIcons/experience.svg";
import RupeesIcon from "../../../../Assets/JobIcons/rupee.svg";
import SearchIcon from "../../../../Assets/JobIcons/magnifying-glass.svg";
import IconLabel from "../../../../Reusuable/Components/View/IconLabel/IconLabel";
import IconCheck from "../../../../Assets/Icons/Icon-Check/Icon-Check.png";
import CustomCompetency from "../../../../Reusuable/Container/CustomCompetency/CustomCompetency";
import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import IntelligentScreener from "../../../../Reusuable/Container/IntelligentScreener/IntelligentScreener";
import Checkbox from "../../../../Reusuable/Components/Interactive/Checkbox/Checkbox";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import BottomUpModal from "../../../../Reusuable/Components/Interactive/BottomUpModal/BottomUpModal";
import JobDescription from "../JobDescription/JobDescription";

class MainCandidatePanel extends Component {
    state = {
        tabs: [
            {
                id: 1,
                name: "All Candidates",
                active: true,
            },
            {
                id: 2,
                name: "Accepted Candidates",
                active: false,
            },
            {
                id: "3",
                name: "Rejected Candidates",
                active: false,
            },
        ],
        filters: [
            {
                name: "Skills",
                type: "textfield",
                filterValues: [],
                filterField: {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "",
                    label: "",
                    placeholder: "E.g: React, MongoDB, CSS, etc.,",
                    value: "",
                    readOnly: false,
                    imgBtn: IconCheck,
                },
            },
            {
                name: "Experience",
                type: "dropdown-with-range-slider",
                start: 0,
                end: 30,
                filterField: {
                    toggle: false,
                    field: {
                        id: 2,
                        inputType: "text",
                        state: "normal",
                        name: "",
                        label: "",
                        placeholder: "",
                        value: "Domain Experience",
                        readOnly: true,
                        imgBtn: arrowDownIcon,
                    },
                    dropdown: [
                        {
                            id: 1,
                            name: "Domain Experience",
                            state: "selected",
                        },
                        {
                            id: 2,
                            name: "Total Experience",
                            state: "not selected",
                        },
                    ],
                    value: "Domain Experience",
                },
            },
            {
                name: "Salary",
                type: "dropdown-with-range-slider",
                start: 0,
                end: 30,
                filterField: {
                    toggle: false,
                    field: {
                        id: 2,
                        inputType: "text",
                        state: "normal",
                        name: "",
                        label: "",
                        placeholder: "",
                        value: "Expected Salary",
                        readOnly: true,
                        imgBtn: arrowDownIcon,
                    },
                    dropdown: [
                        {
                            id: 1,
                            name: "Expected Salary",
                            state: "selected",
                        },
                        {
                            id: 2,
                            name: "Current Salary",
                            state: "not selected",
                        },
                    ],
                    value: "Expected Salary",
                },
            },
            {
                name: "Technical Competency",
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
        ],
        screens: [
            {
                id: 1,
                inputType: "text",
                state: "normal",
                name: "",
                label: "",
                placeholder: "Eg: name,email,phone",
                value: "",
                readOnly: false,
                imgBtn: SearchIcon,
            },
        ],
        screenTerms: [],
        checkboxes: {},
        errorText: "",
        showJobDescription: {
            active: false,
            jobID: null,
        },
    };
    constructor(props) {
        super(props);
        if (!this.props.user) {
            this.props.history.replace("/recruiter");
        }
        this.props.getRecruiterCandidate();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.recruiterCandidates !== this.props.recruiterCandidates) {
            const state = JSON.parse(JSON.stringify(this.state));
            const techCompetencyOfAllCandidates = this.props.recruiterCandidates
                .map((candidate, index, arr) => {
                    if (candidate.technical_competencies?.trim().length) {
                        let isDuplicate = false;
                        let newCompetency = candidate.technical_competencies;
                        arr.forEach((candidate, i) => {
                            if (
                                candidate.technical_competencies.toLowerCase() ===
                                    newCompetency.toLowerCase() &&
                                index < i
                            ) {
                                isDuplicate = true;
                            }
                        });
                        if (!isDuplicate) {
                            return {
                                id: index,
                                name: candidate.technical_competencies,
                                state: "not selected",
                            };
                        }
                    }
                    return false;
                })
                .filter(Boolean);
            state.filters[3].filterField.dropdown = techCompetencyOfAllCandidates;
            state.filters[3].filterField.defaultDropdown = techCompetencyOfAllCandidates;
            this.setState(state);
            if (
                Object.keys(this.props.selectedJob).length > 0 &&
                this.state.filters.length < 5
            ) {
                let checkboxes = { ...this.state.checkboxes };
                const state = JSON.parse(JSON.stringify(this.state));
                let filters = state.filters;

                filters.push({
                    name: "",
                    type: "checkbox",
                    filterValues: false,
                    filterField: [
                        {
                            id: 1,
                            active: false,
                            label: "Show Duplicate Candidates",
                        },
                    ],
                });
                this.props.recruiterCandidates.forEach((candidate, index) => {
                    if (
                        !(
                            Object.keys(this.props.selectedJob).length > 0 &&
                            candidate?.job_id?.indexOf(
                                this.props.selectedJob._id
                            ) >= 0
                        )
                    )
                        checkboxes[candidate._id] = {
                            id: candidate._id,
                            active: false,
                        };
                });

                this.setState({ checkboxes, filters });
            }
        }
        if (prevProps.selectedJob !== this.props.selectedJob) {
            this.props.history.goBack();
        }
    }
    componentWillUnmount() {
        this.props.toggel();
    }
    handleTabChange = (id) => {
        this.state.tabs.forEach((tab) => {
            if (tab.id === id) {
                tab.active = true;
            } else {
                tab.active = false;
            }
        });

        this.setState(this.state);
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

    handleSliderChange = (event, value, index) => {
        const state = JSON.parse(JSON.stringify(this.state));
        state.filters[index].start = value[0];
        state.filters[index].end = value[1];

        this.setState(state);
    };

    handleCheckboxClick = (id) => {
        const checkboxes = { ...this.state.checkboxes };
        checkboxes[id].active = !checkboxes[id].active;
        this.setState({ checkboxes });
    };

    handleAddExistingCandidate = () => {
        const data = {
            job_id: this.props.selectedJob._id,
            saved_candidate_id: [],
        };
        for (let item in this.state.checkboxes) {
            if (this.state.checkboxes[item].active === true) {
                data.saved_candidate_id.push(item);
            }
        }
        if (data.saved_candidate_id.length) {
            this.props.addExistingCandidate(data);
        } else {
            this.setState({ errorText: "Please Add Candidates" });
        }
    };

    handleShowDuplicateCandidatesCheckboxClick = (type, index, id) => {
        const state = JSON.parse(JSON.stringify(this.state));
        let checkboxes = state[type][index].filterField;
        checkboxes[id - 1].active = !checkboxes[id - 1].active;
        state[type][index].filterValues = checkboxes[id - 1].active;

        this.setState(state);
    };

    handleToggleShowJobDescription = (jobID) => {
        this.setState({
            showJobDescription: {
                active: !this.state.showJobDescription.active,
                jobID: jobID,
            },
        });
    };

    handleCloseJobDescriptionModal = () => {
        this.setState({ showJobDescription: { active: false, jobID: null } });
    };

    render() {
        if (!this.props.user) {
            return <> </>;
        }
        const disabledCandidates = [];
        // filtering algorithm
        const candidates = this.props.recruiterCandidates.filter(
            (candidate) => {
                if (
                    Object.keys(this.props.selectedJob).length > 0 &&
                    candidate?.job_id?.indexOf(this.props.selectedJob._id) >= 0
                ) {
                    disabledCandidates.push(candidate);
                    return false;
                }
                if (this.state.checkboxes[candidate?._id]) {
                    if (this.state.checkboxes[candidate._id].active) {
                        return true;
                    }
                }
                let isValid = true;
                if (this.state.filters[0].filterValues.length > 0) {
                    let exists = false;
                    for (let i = 0; i < candidate.skills.length; i++) {
                        for (
                            let j = 0;
                            j < this.state.filters[0].filterValues.length;
                            j++
                        ) {
                            if (
                                candidate.skills[i]
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
                        if (exists) break;
                    }
                    isValid = exists && isValid;
                }
                if (
                    this.state.filters[1].start !== 0 ||
                    this.state.filters[1].end !== 30
                ) {
                    let exists = false;
                    if (
                        this.state.filters[1].filterField.value.toLowerCase() ===
                        "domain experience"
                    ) {
                        if (
                            candidate.domain_experience >=
                                this.state.filters[1].start &&
                            candidate.domain_experience <=
                                this.state.filters[1].end
                        ) {
                            exists = true;
                        }
                    } else if (
                        this.state.filters[1].filterField.value.toLowerCase() ===
                        "total experience"
                    ) {
                        if (
                            candidate.total_experience >=
                                this.state.filters[1].start &&
                            candidate.total_experience <=
                                this.state.filters[1].end
                        ) {
                            exists = true;
                        }
                    }
                    isValid = exists && isValid;
                }
                if (
                    this.state.filters[2].start !== 0 ||
                    this.state.filters[2].end !== 30
                ) {
                    let exists = false;
                    if (
                        this.state.filters[2].filterField.value.toLowerCase() ===
                        "current salary"
                    ) {
                        if (
                            candidate.current_salary >=
                                this.state.filters[2].start &&
                            candidate.current_salary <=
                                this.state.filters[2].end
                        ) {
                            exists = true;
                        }
                    } else if (
                        this.state.filters[2].filterField.value.toLowerCase() ===
                        "expected salary"
                    ) {
                        if (
                            candidate.expected_salary >=
                                this.state.filters[2].start &&
                            candidate.expected_salary <=
                                this.state.filters[2].end
                        ) {
                            exists = true;
                        }
                    }
                    isValid = exists && isValid;
                }
                if (this.state.screenTerms.length) {
                    let exists = false;
                    for (let i = 0; i < this.state.screenTerms.length; i++) {
                        if (
                            candidate.name
                                .toLowerCase()
                                .includes(
                                    this.state.screenTerms[i].toLowerCase()
                                ) ||
                            candidate.email
                                .toLowerCase()
                                .includes(
                                    this.state.screenTerms[i].toLowerCase()
                                ) ||
                            candidate.phone_number
                                .toLowerCase()
                                .includes(
                                    this.state.screenTerms[i].toLowerCase()
                                )
                        ) {
                            exists = true;
                            break;
                        }

                        if (exists) break;
                    }
                    isValid = exists && isValid;
                }
                if (this.state.filters[3].filterValues.length > 0) {
                    let exists = false;
                    for (
                        let j = 0;
                        j < this.state.filters[3].filterValues.length;
                        j++
                    ) {
                        if (
                            candidate.technical_competencies.toLowerCase() ===
                            this.state.filters[3].filterValues[j].toLowerCase()
                        ) {
                            exists = true;
                            break;
                        }
                    }
                    isValid = exists && isValid;
                }
                return isValid;
            }
        );
        if (
            Object.keys(this.props.selectedJob).length > 0 &&
            this.state.filters[4]?.filterValues
        ) {
            disabledCandidates.forEach((candidate) =>
                candidates.push(candidate)
            );
        }

        return (
            <>
                {this.state.showJobDescription.active ? (
                    <BottomUpModal
                        toggelModal={this.handleCloseJobDescriptionModal}
                        cover
                    >
                        <JobDescription
                            view
                            cover
                            jobID={this.state.showJobDescription.jobID}
                        />
                    </BottomUpModal>
                ) : null}

                <CandidatePanelWrapper>
                    <SectionHeader
                        title={
                            (this.props.selectedJob.job_title &&
                                `Add Candidates For ${this.props.selectedJob.job_title} Job`) ||
                            "Candidates"
                        }
                        desc={
                            "Overview of all the Candidates with filter system"
                        }
                        error={this.state.errorText}
                    />
                    <KeyValueWrapper>
                        <TabbarMain
                            tabs={this.state.tabs}
                            tabClick={this.handleTabChange}
                        />
                        {Object.keys(this.props.selectedJob).length > 0 ? (
                            <div
                                style={{
                                    display: "grid",
                                    gridAutoFlow: "column",
                                    gap: "1rem",
                                }}
                            >
                                <Button
                                    buttonClick={() => {
                                        this.props.history.goBack();
                                    }}
                                    label="Cancel"
                                />
                                <Button
                                    type="dark"
                                    label="Add Candidates"
                                    buttonClick={
                                        this.handleAddExistingCandidate
                                    }
                                />
                            </div>
                        ) : null}
                    </KeyValueWrapper>
                    <MainWrapper>
                        <MainCardWrapper>
                            <IntelligentScreener
                                screens={this.state.screens}
                                addTag={this.handleAddTag}
                                removeTag={this.handleTagCloseBtnClick}
                                textfieldChange={this.handleInputValueChange}
                                textfieldKeyPress={this.handleTexfieldKeyPress}
                                tags={this.state.screenTerms}
                            />
                            {candidates.map(
                                (
                                    {
                                        name,
                                        email,
                                        phone_number,
                                        resume_link,
                                        skills,
                                        domain_experience,
                                        total_experience,
                                        current_salary,
                                        expected_salary,
                                        job_id,
                                        job_name,
                                        _id,
                                    },
                                    index
                                ) => {
                                    return (
                                        <CandidateCardWrapper
                                            disabled={
                                                Object.keys(
                                                    this.props.selectedJob
                                                ).length > 0 &&
                                                job_id?.indexOf(
                                                    this.props.selectedJob._id
                                                ) >= 0
                                            }
                                            key={index}
                                        >
                                            <KeyValueWrapper>
                                                <RowWrapper>
                                                    {Object.keys(
                                                        this.props.selectedJob
                                                    ).length > 0 &&
                                                    Object.keys(
                                                        this.state.checkboxes
                                                    ).length > 0 &&
                                                    this.props.selectedJob &&
                                                    job_id?.indexOf(
                                                        this.props.selectedJob
                                                            ._id
                                                    ) < 0 ? (
                                                        <Checkbox
                                                            checkboxClick={() => {
                                                                this.handleCheckboxClick(
                                                                    _id
                                                                );
                                                            }}
                                                            active={
                                                                this.state
                                                                    .checkboxes[
                                                                    _id
                                                                ].active
                                                            }
                                                        />
                                                    ) : null}
                                                    <Label heading title black>
                                                        {name}
                                                    </Label>
                                                    <Label grey>{email}</Label>
                                                    <Label grey>
                                                        {phone_number}
                                                    </Label>
                                                </RowWrapper>
                                                <a
                                                    target="_blank"
                                                    href={resume_link}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <RowWrapper
                                                        style={{
                                                            justifyItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <IconLabel
                                                            icon={ResumeIcon}
                                                        />
                                                        <Label title black>
                                                            Resume
                                                        </Label>
                                                    </RowWrapper>
                                                </a>
                                            </KeyValueWrapper>
                                            <ContentWrapper
                                                style={{
                                                    borderTop:
                                                        "1px solid #c2c2c2",
                                                }}
                                            >
                                                <RowWrapper
                                                    style={{
                                                        gap: ".5rem",
                                                        borderRight:
                                                            "1px solid #c2c2c2",
                                                    }}
                                                >
                                                    <KeyValueWrapper>
                                                        <RowWrapper
                                                            style={{
                                                                gap: ".5rem",
                                                            }}
                                                        >
                                                            <Label>
                                                                Domain
                                                                Experience
                                                            </Label>
                                                            <IconLabel
                                                                small
                                                                icon={PlantIcon}
                                                                label={`${domain_experience} Years`}
                                                            />
                                                        </RowWrapper>
                                                        <RowWrapper
                                                            style={{
                                                                gap: ".5rem",
                                                            }}
                                                        >
                                                            <Label>
                                                                Total Experience
                                                            </Label>
                                                            <IconLabel
                                                                small
                                                                icon={
                                                                    ExperienceIcon
                                                                }
                                                                label={`${total_experience} Years`}
                                                            />
                                                        </RowWrapper>
                                                    </KeyValueWrapper>

                                                    <KeyValueWrapper>
                                                        <RowWrapper
                                                            style={{
                                                                gap: ".5rem",
                                                            }}
                                                        >
                                                            <Label>
                                                                Current Salary
                                                            </Label>
                                                            <IconLabel
                                                                small
                                                                icon={
                                                                    RupeesIcon
                                                                }
                                                                label={`${current_salary}L PA`}
                                                            />
                                                        </RowWrapper>
                                                        <RowWrapper
                                                            style={{
                                                                gap: ".5rem",
                                                            }}
                                                        >
                                                            <Label>
                                                                Salary Expected
                                                            </Label>
                                                            <IconLabel
                                                                small
                                                                icon={
                                                                    RupeesIcon
                                                                }
                                                                label={`${expected_salary}L PA`}
                                                            />
                                                        </RowWrapper>
                                                    </KeyValueWrapper>
                                                    {Object.keys(
                                                        this.props.selectedJob
                                                    ).length > 0 ? (
                                                        <KeyValueWrapper
                                                            style={{
                                                                justifyContent:
                                                                    "start",
                                                            }}
                                                        >
                                                            <RowWrapper>
                                                                <IconLabel
                                                                    small
                                                                    icon={
                                                                        InfoIcon
                                                                    }
                                                                    label="Already Mapped to "
                                                                />
                                                                {job_name?.map(
                                                                    (
                                                                        name,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            onClick={() =>
                                                                                this.handleToggleShowJobDescription(
                                                                                    job_id[
                                                                                        index
                                                                                    ]
                                                                                )
                                                                            }
                                                                            style={{
                                                                                fontSize:
                                                                                    ".8rem",
                                                                                color:
                                                                                    "#655FFF",
                                                                                margin:
                                                                                    "auto",
                                                                                cursor:
                                                                                    "pointer",
                                                                            }}
                                                                        >
                                                                            {
                                                                                name
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </RowWrapper>
                                                        </KeyValueWrapper>
                                                    ) : null}
                                                </RowWrapper>
                                                <RowWrapper
                                                    style={{
                                                        paddingLeft: "2rem",
                                                        gap: ".5rem",
                                                    }}
                                                >
                                                    <Label heading>
                                                        Skills
                                                    </Label>
                                                    <TagWrapper fit>
                                                        {skills.map(
                                                            (tag, i, a) => (
                                                                <Tag
                                                                    key={i}
                                                                    length={
                                                                        a.length
                                                                    }
                                                                    tag={{
                                                                        id: i,
                                                                        label: tag,
                                                                    }}
                                                                    view
                                                                    small
                                                                />
                                                            )
                                                        )}
                                                    </TagWrapper>
                                                </RowWrapper>
                                            </ContentWrapper>
                                        </CandidateCardWrapper>
                                    );
                                }
                            )}
                        </MainCardWrapper>
                        <CustomCompetency
                            filters={this.state.filters}
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
                            handleCheckboxClick={
                                this.handleShowDuplicateCandidatesCheckboxClick
                            }
                        />
                    </MainWrapper>
                </CandidatePanelWrapper>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    recruiterCandidates: state.recruiter.panel.recruiterCandidates,
    user: state.auth.auth.user,
    selectedJob: state.recruiter.panel.selectedJob,
});

export default connect(mapStateToProps, {
    getRecruiterCandidate,
    toggel,
    addExistingCandidate,
})(MainCandidatePanel);
