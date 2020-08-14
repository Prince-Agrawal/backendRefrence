import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
    updateAdditionalInfo,
    getUserInfo,
} from "../../../../Redux/actions/Recruiter/profile";

import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import {
    AdditionalInformationWrapper,
    InputWrapper,
    SocialSiteWrapper,
    SubmitWrapper,
    TextFieldWrapper,
} from "./style";
import Dropdown from "../../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import Textfield from "../../../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import Checkbox from "../../../../Reusuable/Components/Interactive/Checkbox/Checkbox";

class AdditionalInformation extends Component {
    state = {
        dropDown: [
            {
                toggle: false,
                field: {
                    id: 2,
                    inputType: "text",
                    state: "normal",
                    name: "avg position",
                    label: "How many positions do you close in a month?",
                    placeholder: "Select Duration",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    { id: 1, name: "1", state: "not selected" },
                    { id: 2, name: "2", state: "not selected" },
                    { id: 3, name: "3", state: "not selected" },
                    { id: 4, name: "4", state: "not selected" },
                    { id: 5, name: "5", state: "not selected" },
                ],
                value: "",
            },
            {
                toggle: false,
                field: {
                    id: 2,
                    inputType: "text",
                    state: "normal",
                    name: "recruitment level",
                    label: "Level of Recruitment you work on?",
                    placeholder: "Select Level",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    { id: 1, name: "Fresher", state: "not selected" },
                    { id: 2, name: "Jr Level", state: "not selected" },
                    { id: 3, name: "Mid Level", state: "not selected" },
                    { id: 4, name: "Sr Level", state: "not selected" },
                    { id: 5, name: "Leadership", state: "not selected" },
                ],
                value: "",
            },
            {
                toggle: false,
                field: {
                    id: 3,
                    inputType: "text",
                    state: "normal",
                    name: "sources of client",
                    label: "Sources of Client generation",
                    placeholder: "Select Source",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    { id: 1, name: "Vendor", state: "not selected" },
                    { id: 2, name: "Friends", state: "not selected" },
                    { id: 3, name: "Direct Calling", state: "not selected" },
                    { id: 4, name: "Old Client", state: "not selected" },
                    { id: 5, name: "Others", state: "not selected" },
                ],
                value: "",
            },
            {
                toggle: false,
                field: {
                    id: 4,
                    inputType: "text",
                    state: "normal",
                    name: "hours per week",
                    label: "How many hours you dedicate per week?",
                    placeholder: "Select Hours",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    { id: 1, name: "1", state: "not selected" },
                    { id: 2, name: "2", state: "not selected" },
                    { id: 3, name: "3", state: "not selected" },
                    { id: 4, name: "4", state: "not selected" },
                    { id: 5, name: "5", state: "not selected" },
                ],
                value: "",
            },
            {
                toggle: false,
                field: {
                    id: 5,
                    inputType: "text",
                    state: "normal",
                    name: "ctc range",
                    label: "CTC Range",
                    placeholder: "Select Range",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    { id: 1, name: "1", state: "not selected" },
                    { id: 2, name: "2", state: "not selected" },
                    { id: 3, name: "3", state: "not selected" },
                    { id: 4, name: "4", state: "not selected" },
                    { id: 5, name: "5", state: "not selected" },
                ],
                value: "",
            },
        ],

        checkboxes: [
            {
                id: 1,
                active: false,
                label: "Naukri",
            },
            {
                id: 2,
                active: false,
                label: "LinkedIn",
            },
            {
                id: 3,
                label: "IIMjobs",
                active: false,
            },
            {
                id: 4,
                label: "Indeed",
                active: false,
            },
            {
                id: 5,
                label: "Angel List",
                active: false,
            },
        ],
        resume: {
            id: 1,
            inputType: "file",
            state: "normal",
            name: "resume",
            label: "Resume",
            placeholder: "",
            file: null,
            readOnly: false,
        },
        other_site: {
            id: 1,
            inputType: "text",
            state: "normal",
            name: "Profile URL",
            label: "Other",
            placeholder: "www.recruitment.com/profile",
            value: "",
            readOnly: false,
        },
    };

    constructor(props) {
        super(props);
        if (this.props.isAdditionalInfoUpdated) {
            this.props.history.replace("/recruiter");
            this.props.getUserInfo();
        }
    }

    componentDidUpdate() {
        if (this.props.isAdditionalInfoUpdated) {
            this.props.history.replace("/recruiter");
            this.props.getUserInfo();
        }
    }

    handleDropdowntoggle = (index) => {
        let dropDown = this.state.dropDown;
        let dropdownMenu = dropDown[index];
        dropdownMenu.toggle = !dropdownMenu.toggle;

        this.setState({
            dropDown,
        });
    };

    handleDropdownClick = (index, clickDropdown) => {
        let dropDown = this.state.dropDown;
        let dropdownMenu = dropDown[index];
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

        this.setState({
            dropDown,
        });

        const scope = this;
        setTimeout(() => {
            scope.handleDropdowntoggle(index);
        }, 150);
    };

    handleInputValueChange = (event) => {
        let textfield = this.state.other_site;
        textfield.value = event.target.value;

        this.setState({
            textfield,
        });
    };

    isFormValid = (event) => {
        event.preventDefault();
        let textfield = this.state.other_site;
        let isValid = true;
        let emailReg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        if (textfield.value.trim().length) {
            if (textfield.value.match(emailReg)) {
                textfield.state = "normal";
                textfield.hint = "";
            } else {
                textfield.state = "error";
                textfield.hint = `Please enter ${textfield.name}.`;
            }
        }

        let dropDown = this.state.dropDown.concat();

        dropDown.forEach((dropDown) => {
            if (dropDown.isTag) {
                if (!dropDown.value.length) {
                    isValid = false;
                    dropDown.field.state = "error";
                    dropDown.field.hint = `please enter ${dropDown.field.name}`;
                } else {
                    dropDown.field.state = "normal";
                    dropDown.field.hint = ``;
                }
            } else {
                if (!dropDown.field.value.length) {
                    isValid = false;
                    dropDown.field.state = "error";
                    dropDown.field.hint = `please enter ${dropDown.field.name}`;
                } else {
                    dropDown.field.state = "normal";
                    dropDown.field.hint = ``;
                }
            }
        });

        if (!this.state.resume.file) {
            isValid = false;
            let resume = this.state.resume;
            resume.state = "error";
            resume.hint = "Please provide a resume";
            this.setState({ resume });
        }

        if (isValid) {
            const data = new FormData();
            data.append("no_position", this.state.dropDown[0].value);
            data.append("level_of_recruiter", this.state.dropDown[1].value);
            data.append("naukri", this.state.checkboxes[0].active);
            data.append("linkedin", this.state.checkboxes[1].active);
            data.append("IIM_job", this.state.checkboxes[2].active);
            data.append("indeed", this.state.checkboxes[3].active);
            data.append("angel_list", this.state.checkboxes[4].active);
            data.append("other", this.state.other_site.value);
            data.append("client_generation", this.state.dropDown[2].value);
            data.append("hours_per_week", this.state.dropDown[3].value);
            data.append("CTC_range", this.state.dropDown[4].value);
            data.append(
                "resume",
                this.state.resume.file,
                this.state.resume.file.name
            );

            this.props.updateAdditionalInfo(data);
        }

        this.setState({
            dropDown,
        });

        return isValid;
    };

    handleResumeChange = (e) => {
        const file = e.target.files[0];
        let resume = { ...this.state.resume };
        resume.file = file;
        if (file) {
            this.setState({ resume });
        }
    };

    handleCheckboxClick = (id) => {
        let checkboxes = [...this.state.checkboxes];
        checkboxes[id - 1].active = !checkboxes[id - 1].active;
        this.setState({ checkboxes });
    };

    render() {
        return (
            <AdditionalInformationWrapper>
                <InputWrapper>
                    <Dropdown
                        dropdownMenu={this.state.dropDown[0]}
                        handleDropdowntoggle={() => {
                            this.handleDropdowntoggle(0);
                        }}
                        handleDropdownClick={(name) => {
                            this.handleDropdownClick(0, name);
                        }}
                    />
                    <Dropdown
                        dropdownMenu={this.state.dropDown[1]}
                        handleDropdowntoggle={() => {
                            this.handleDropdowntoggle(1);
                        }}
                        handleDropdownClick={(name) => {
                            this.handleDropdownClick(1, name);
                        }}
                    />
                    <SocialSiteWrapper>
                        <b> Do you have any website access? If yes, specify.</b>
                    </SocialSiteWrapper>
                    {this.state.checkboxes.map((field) => (
                        <Checkbox
                            key={field.id}
                            checkboxClick={() =>
                                this.handleCheckboxClick(field.id)
                            }
                            active={field.active}
                            label={field.label}
                        />
                    ))}
                    <br />
                    <Textfield
                        handleInputValueChange={this.handleInputValueChange}
                        textfield={this.state.other_site}
                    />
                    <br />
                    <TextFieldWrapper>
                        <Dropdown
                            dropdownMenu={this.state.dropDown[2]}
                            handleDropdowntoggle={() => {
                                this.handleDropdowntoggle(2);
                            }}
                            handleDropdownClick={(name) => {
                                this.handleDropdownClick(2, name);
                            }}
                        />
                    </TextFieldWrapper>
                    <Dropdown
                        dropdownMenu={this.state.dropDown[3]}
                        handleDropdowntoggle={() => {
                            this.handleDropdowntoggle(3);
                        }}
                        handleDropdownClick={(name) => {
                            this.handleDropdownClick(3, name);
                        }}
                    />
                    <Dropdown
                        dropdownMenu={this.state.dropDown[4]}
                        handleDropdowntoggle={() => {
                            this.handleDropdowntoggle(4);
                        }}
                        handleDropdownClick={(name) => {
                            this.handleDropdownClick(4, name);
                        }}
                    />
                    <Textfield
                        textfield={this.state.resume}
                        handleInputValueChange={(event) => {
                            let resume = { ...this.state.resume };
                            resume.file = event.target.files[0];
                            this.setState({ resume });
                        }}
                    />
                </InputWrapper>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <SubmitWrapper>
                    <Button
                        type="light"
                        label="Back"
                        buttonClick={this.props.previousSection}
                    />
                    <Button
                        type="dark"
                        label="Submit"
                        buttonClick={this.isFormValid}
                    />
                </SubmitWrapper>
            </AdditionalInformationWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    isAdditionalInfoUpdated: state.recruiter.profile.isAdditionalInfoUpdated,
});

const mapDispatchToProps = {
    updateAdditionalInfo,
    getUserInfo,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AdditionalInformation));
