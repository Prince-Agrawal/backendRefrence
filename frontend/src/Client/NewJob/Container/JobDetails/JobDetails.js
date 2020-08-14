import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
    PersonalInformationWrapper,
    RadioBtnWrapper,
    Label,
    SubmitWrapper,
    LocationDropdownWrapper,
    Location,
    InputTagWrapper,
    InputWrapper,
} from "./style";

import {
    getDepartment,
    addNewJob,
} from "../../../../Redux/actions/Client/PanelActions";
import { connect } from "react-redux";

import PlacesAutocomplete from "react-places-autocomplete";
import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";

import Textfield from "../../../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import RadioButton from "../../../../Reusuable/Components/Interactive/RadioButton/RadioButton";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import Dropdown from "../../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import Textarea from "../../../../Reusuable/Components/Interactive/inputs/TextArea/TextArea";
import Tag from "../../../../Reusuable/Components/Interactive/Tag/tag";
import AdditionalQuestions from "../AdditionalQuestions/AdditionalQuestions";
import Pickers from "../../../../Reusuable/Components/Interactive/MaterialUI/Pickers/Pickers";

class JobDetails extends Component {
    state = {
        textfield: [
            {
                id: 0,
                inputType: "text",
                state: "normal",
                name: "job title",
                label: "Job Title*",
                placeholder: "Java Developer",
                value: "",
                readOnly: false,
            },
            {
                id: 2,
                inputType: "text",
                state: "normal",
                name: "grade",
                label: "Grade*",
                placeholder: "0-10",
                value: "",
                readOnly: false,
            },
            {
                id: 3,
                inputType: "text",
                state: "normal",
                name: "job ref",
                label: "Job Ref ID",
                placeholder: "#6561",
                value: "",
                readOnly: false,
            },
            {
                id: 4,
                inputType: "number",
                state: "normal",
                name: "positions",
                label: "Number of Positions*",
                placeholder: "10",
                value: "",
                readOnly: false,
            },
            {
                id: 5,
                isTag: true,
                inputType: "text",
                state: "normal",
                name: "mandatory skills",
                label: "Mandatory Skills*",
                placeholder: "Enter Skills",
                value: "",
                selectedValues: [],
                readOnly: false,
            },
            {
                id: 6,
                isTag: true,
                inputType: "text",
                state: "normal",
                name: "additional skills",
                label: "Additional Skills*",
                placeholder: "Enter Skills",
                value: "",
                selectedValues: [],
                readOnly: false,
            },

            {
                id: 9,
                inputType: "number",
                state: "normal",
                name: "ctc percent",
                label: "Percentage of CTC*",
                placeholder: "0",
                value: "",
                readOnly: false,
            },
            {
                id: 10,
                inputType: "number",
                state: "normal",
                name: "guarantee period",
                label: "Guarantee Period*",
                placeholder: "0",
                value: "",
                readOnly: false,
            },
            {
                id: 1,
                inputType: "text",
                state: "normal",
                name: "recruitment fees",
                label: "Recruitment Fees*",
                placeholder: "1000",
                value: "",
                readOnly: false,
            },
        ],
        dropdowns: [
            {
                toggle: false,
                field: {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "Department",
                    label: "Department*",
                    placeholder: "Select Department",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [],
                value: "",
            },
            {
                toggle: false,
                field: {
                    id: 7,
                    inputType: "text",
                    state: "normal",
                    name: "required qualification",
                    label: "Required Qualification*",
                    placeholder: "Select Qualification",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    { id: 1, name: "HSC", state: "not selected" },
                    { id: 2, name: "SSLC", state: "not selected" },
                    { id: 3, name: "Diploma", state: "not selected" },
                    { id: 4, name: "B.Tech", state: "not selected" },
                    { id: 5, name: "BSc", state: "not selected" },
                    { id: 6, name: "MSc", state: "not selected" },
                    { id: 7, name: "B.A", state: "not selected" },
                    { id: 8, name: "M.A", state: "not selected" },
                    { id: 9, name: "B.Com", state: "not selected" },
                    { id: 10, name: "M.Com", state: "not selected" },
                    { id: 11, name: "B.E", state: "not seleted" },
                    { id: 12, name: "M.E", state: "not selected" },
                    { id: 13, name: "Phd", state: "not selected" },
                ],
                value: "",
            },
            {
                toggle: false,
                field: {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "job type",
                    label: "Job Type*",
                    placeholder: "Select Job Type*",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    {
                        id: 1,
                        name: "Full-Time",
                        state: "not selected",
                    },
                    {
                        id: 2,
                        name: "Part-Time",
                        state: "not selected",
                    },
                    {
                        id: 3,
                        name: "Internship",
                        state: "not selected",
                    },
                ],
                value: "",
            },
            {
                toggle: false,
                field: {
                    id: 8,
                    inputType: "text",
                    state: "normal",
                    name: "annual ctc",
                    label: "Annual CTC*",
                    placeholder: "5.3",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    {
                        id: 1,
                        name: "1000",
                        state: "not selected",
                    },
                    {
                        id: 2,
                        name: "5000",
                        state: "not selected",
                    },
                    {
                        id: 3,
                        name: "10000",
                        state: "not selected",
                    },
                ],
                value: "",
            },

            {
                toggle: false,
                field: {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "experience level",
                    label: "Experience Level*",
                    placeholder: "Select Level",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    {
                        id: 1,
                        name: "Beginner",
                        state: "not selected",
                    },
                    {
                        id: 2,
                        name: "Intermediate",
                        state: "not selected",
                    },
                    {
                        id: 3,
                        name: "Advanced",
                        state: "not selected",
                    },
                ],
                value: "",
            },
        ],
        location: {
            id: 1,
            inputType: "text",
            state: "normal",
            name: "location",
            label: "Location*",
            placeholder: "Select Location",
            value: "",
            readOnly: false,
        },
        textarea: [
            {
                id: 1,
                inputType: "textarea",
                state: "normal",
                name: "Job description",
                label: "Job Description*",
                placeholder: "Atleast 100 Characters",
                value: "",
                readOnly: false,
            },
            {
                id: 2,
                inputType: "textarea",
                state: "normal",
                name: "additional information",
                label: "Additional Information*",
                placeholder: "Atleast 100 Characters",
                value: "",
                readOnly: false,
            },
        ],
        radiobuttons: [
            {
                label: "Management Experience",
                error: "",
                options: [
                    {
                        id: 1,
                        active: false,
                        label: "Yes",
                    },
                    {
                        id: 2,
                        active: false,
                        label: "No",
                    },
                ],
            },
            {
                error: "",
                label: "Negotiable CTC*",
                options: [
                    {
                        id: 1,
                        active: false,
                        label: "Yes",
                    },
                    {
                        id: 2,
                        active: false,
                        label: "No",
                    },
                ],
            },
            {
                error: "",
                label: "Urgency to Hire*",
                options: [
                    {
                        id: 1,
                        active: false,
                        label: "Yes",
                    },
                    {
                        id: 2,
                        active: false,
                        label: "No",
                    },
                ],
            },
            {
                error: "",
                label: "Job Description Assistant*",
                options: [
                    {
                        id: 1,
                        active: false,
                        label: "Yes",
                    },
                    {
                        id: 2,
                        active: false,
                        label: "No",
                    },
                ],
            },
            {
                error: "",
                label: "Urgent Job Options*",
                options: [
                    {
                        id: 1,
                        active: false,
                        label: "Yes",
                    },
                    {
                        id: 2,
                        active: false,
                        label: "No",
                    },
                ],
            },
        ],
        datePicker: { error: false, hint: "" },
    };
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.pickerRef = React.createRef();
        if (this.props.isJobDetailsUpdated) {
            this.props.submitClick();
        }
        this.props.getDepartment();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isJobDetailsUpdated) {
            this.props.submitClick();
        }
        if (prevProps.departments !== this.props.departments) {
            if (this.props.departments.length !== 0) {
                const dropdowns = this.state.dropdowns;
                dropdowns.forEach((dropdown) => {
                    if (dropdown.field.name === "Department") {
                        dropdown.dropdown = this.props.departments.map(
                            (department) => ({
                                id: department._id,
                                name: department.department,
                                state: "not selected",
                            })
                        );
                    }
                });
            }
        }
        if (prevProps.isNewJobAdded !== this.props.isNewJobAdded) {
            if (this.props.isNewJobAdded === true) {
                this.props.history.goBack();
            }
        }
    }

    handleRadioBtnClick = (id, index) => {
        const subscription = this.state.radiobuttons[index].options.concat();
        subscription.forEach((btn) => {
            if (btn.id === id) {
                btn.active = true;
                this.setState({
                    subscription,
                });
            } else {
                btn.active = false;
            }
        });
    };

    handleInputValueChange = (event) => {
        let textfield = this.state.textfield;
        let textarea = this.state.textarea;
        textfield.map((field) => {
            if (field.name === event.target.name) {
                field.value = event.target.value;
            }
            return field;
        });
        textarea.map((field) => {
            if (field.name === event.target.name) {
                field.value = event.target.value;
            }
            return field;
        });

        this.setState({
            textfield,
            textarea,
        });
    };

    handleInputValueChangeLocation = (value) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let location = state.location;
        location.value = value;
        this.setState({
            location,
        });
    };

    handleDropdowntoggle = (index) => {
        let dropdowns = this.state.dropdowns;
        let dropdownMenu = dropdowns[index];
        dropdownMenu.toggle = !dropdownMenu.toggle;

        this.setState({
            dropdowns,
        });
    };

    handleDropdownClick = (index, clickDropdown) => {
        let dropdowns = this.state.dropdowns;
        let dropdownMenu = dropdowns[index];
        dropdownMenu.dropdown.map((dropdown) => {
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
            dropdowns,
        });

        const scope = this;
        setTimeout(() => {
            scope.handleDropdowntoggle(index);
        }, 150);
    };

    handleTagCloseBtnClick = (textfieldIndex, index) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let textfield = state.textfield;
        textfield[textfieldIndex].selectedValues.splice(index, 1);

        this.setState({
            textfield,
        });
    };

    handleAddTag = (index) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let textfield = state.textfield;
        textfield[index].selectedValues.push(textfield[index].value);
        textfield[index].value = "";

        this.setState({
            textfield,
        });
    };

    handleFieldValidation = (fieldName) => {
        let textfield = this.state.textfield;

        // eslint-disable-next-line no-useless-escape
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        textfield.map((field) => {
            if (field.name === fieldName) {
                if (field.name.includes("email")) {
                    field.state = field.value.match(emailReg)
                        ? "normal"
                        : "error";
                    field.hint =
                        field.state === "error"
                            ? "Please provide an valid work email address."
                            : field.hint;
                } else if (!field.name.includes("confirm-password")) {
                    field.state = field.value.length !== 0 ? "normal" : "error";
                    field.hint =
                        field.state === "error"
                            ? `Please enter ${field.name}.`
                            : undefined;
                }
            }

            return field;
        });

        this.setState({
            textfield,
        });
    };

    isFormValid = (event) => {
        event.preventDefault();

        let textfield = this.state.textfield;
        let isValid = true;

        textfield.map((field) => {
            if (!field.label.includes("*")) {
                return field;
            }
            if (field.selectedValues?.length) {
                return field;
            }
            this.handleFieldValidation(field.name);
            if (field.state === "error") {
                isValid = false;
            }
            return field;
        });

        const dropdowns = this.state.dropdowns.map((dropdown) => {
            if (!dropdown.value.length) {
                isValid = false;
                dropdown.field.state = "error";
                dropdown.field.hint = `please provide ${dropdown.field.name}`;
            } else {
                dropdown.field.state = "normal";
                dropdown.field.hint = "";
            }
            return dropdown;
        });

        const textarea = this.state.textarea.map((textarea) => {
            if (!textarea.value.length) {
                isValid = false;
                textarea.state = "error";
                textarea.hint = `please provide ${textarea.name}`;
            } else {
                textarea.state = "normal";
                textarea.hint = "";
            }
            return textarea;
        });

        let location = this.state.location;

        if (!location.value.trim()) {
            isValid = false;
            location.state = "error";
            location.hint = `Please enter ${location.name}`;
        } else {
            location.state = "normal";
            location.hint = ``;
        }

        const radiobuttons = this.state.radiobuttons.map((radio) => {
            if (!radio.label.includes("*")) {
                return radio;
            }
            if (
                !radio.options
                    .map((radio) => {
                        if (radio.active === true) {
                            return radio.label;
                        }
                        return false;
                    })
                    .filter(Boolean)
                    .join("").length
            ) {
                radio.error = "please choose an option";
            } else {
                radio.error = "";
            }
            return radio;
        });

        this.setState({
            location,
            dropdowns,
            textarea,
            radiobuttons,
        });

        if (!this.pickerRef.current.getCurrentValue().length) {
            isValid = false;
            this.setState({
                datePicker: { error: true, hint: "Please provide date" },
            });
        } else {
            this.setState({
                datePicker: { error: false, hint: "" },
            });
        }

        isValid = this.myRef.current.isFormValid() && isValid;

        if (isValid) {
            const data = {
                job_title: this.state.textfield[0].value,
                department: this.state.dropdowns[0].dropdown
                    .map((dropdown) => {
                        if (dropdown.name === this.state.dropdowns[0].value) {
                            return dropdown.id;
                        }
                        return false;
                    })
                    .filter(Boolean)
                    .join(""),
                joining_date: this.pickerRef.current.getCurrentValue(),
                grade: this.state.textfield[1].value,
                job_type: this.state.dropdowns[2].value,
                job_ref: this.state.textfield[2].value,
                location: this.state.location.value,
                no_of_positions: +this.state.textfield[3].value,
                job_description: this.state.textarea[0].value,
                additional_information: this.state.textarea[1].value,
                experience_level: this.state.dropdowns[4].value,
                management_experience:
                    this.state.radiobuttons[0].options
                        .map((radio) => {
                            if (radio.active === true) {
                                return radio.label;
                            }
                            return false;
                        })
                        .filter(Boolean)
                        .join("") === "Yes",
                mandatory_skills: this.state.textfield[4].selectedValues,
                additional_skills: this.state.textfield[5].selectedValues,
                required_qualifications: this.state.dropdowns[1].value,
                annual_CTC: +this.state.dropdowns[3].value,
                negotiable:
                    this.state.radiobuttons[1].options
                        .map((radio) => {
                            if (radio.active === true) {
                                return radio.label;
                            }
                            return false;
                        })
                        .filter(Boolean)
                        .join("") === "Yes",
                job_description_assistant:
                    this.state.radiobuttons[3].options
                        .map((radio) => {
                            if (radio.active === true) {
                                return radio.label;
                            }
                            return false;
                        })
                        .filter(Boolean)
                        .join("") === "Yes",
                urgency_to_hire:
                    this.state.radiobuttons[2].options
                        .map((radio) => {
                            if (radio.active === true) {
                                return radio.label;
                            }
                            return false;
                        })
                        .filter(Boolean)
                        .join("") === "Yes",
                recruitment_fees: +this.state.textfield[8].value,
                percentage_of_CTC: this.state.textfield[6].value,
                guarantee_period: +this.state.textfield[7].value,
                additional_questions: this.myRef.current.getFormDetails(),
                urgent_job_options:
                    this.state.radiobuttons[4].options
                        .map((radio) => {
                            if (radio.active === true) {
                                return radio.label;
                            }
                            return false;
                        })
                        .filter(Boolean)
                        .join("") === "Yes",
            };
            this.props.addNewJob(data);
        }

        return isValid;
    };

    render() {
        return (
            <PersonalInformationWrapper>
                <InputWrapper>
                    {this.state.textfield.map((field, index) => {
                        if (field.isTag)
                            return (
                                <InputTagWrapper key={field.id}>
                                    <Textfield
                                        textfield={field}
                                        key={field.id}
                                        handleInputValueChange={
                                            this.handleInputValueChange
                                        }
                                        handleKeyPress={(event) => {
                                            if (event.which === 13)
                                                this.handleAddTag(index);
                                        }}
                                    />
                                    {field.selectedValues.map((tag, i, arr) => (
                                        <Tag
                                            key={i}
                                            tag={{
                                                id: index,
                                                label: tag,
                                            }}
                                            length={arr.length}
                                            handleCloseBtnClick={() =>
                                                this.handleTagCloseBtnClick(
                                                    index,
                                                    i
                                                )
                                            }
                                        />
                                    ))}
                                </InputTagWrapper>
                            );
                        return (
                            <Textfield
                                textfield={field}
                                key={field.id}
                                handleInputValueChange={
                                    this.handleInputValueChange
                                }
                            />
                        );
                    })}
                    <Pickers
                        ref={this.pickerRef}
                        type="date"
                        error={this.state.datePicker.error}
                        label={"Joining Date*"}
                        hint={this.state.datePicker.hint}
                    />

                    <PlacesAutocomplete
                        value={this.state.location.value}
                        onChange={this.handleInputValueChangeLocation}
                        onSelect={this.handleInputValueChangeLocation}
                    >
                        {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                        }) => (
                            <div>
                                <Textfield
                                    textfield={this.state.location}
                                    handleInputValueChange={
                                        this.handleInputValueChangeLocation
                                    }
                                    config={{
                                        ...getInputProps({
                                            placeholder: "Search Location",
                                        }),
                                    }}
                                />
                                <LocationDropdownWrapper>
                                    {loading ? (
                                        <Location>Loading...</Location>
                                    ) : null}
                                    {suggestions.map((suggestion, i) => {
                                        return (
                                            <Location
                                                {...getSuggestionItemProps(
                                                    suggestion
                                                )}
                                                key={i}
                                                active={suggestion.active}
                                            >
                                                {suggestion.description}
                                            </Location>
                                        );
                                    })}
                                </LocationDropdownWrapper>
                            </div>
                        )}
                    </PlacesAutocomplete>
                    {this.state.dropdowns.map((dropdown, index) => (
                        <Dropdown
                            dropdownMenu={dropdown}
                            handleDropdowntoggle={() =>
                                this.handleDropdowntoggle(index)
                            }
                            handleDropdownClick={(name) =>
                                this.handleDropdownClick(index, name)
                            }
                        />
                    ))}
                    {this.state.textarea.map((field) => (
                        <Textarea
                            textarea={field}
                            key={field.id}
                            handleInputValueChange={this.handleInputValueChange}
                        />
                    ))}
                    {this.state.radiobuttons.map((button, index) => (
                        <RadioBtnWrapper>
                            <Label>{button.label}</Label>
                            {button.options.map((btn) => (
                                <RadioButton
                                    radioBtnClick={(id) =>
                                        this.handleRadioBtnClick(id, index)
                                    }
                                    id={btn.id}
                                    active={btn.active}
                                    label={btn.label}
                                />
                            ))}
                            <Label error>
                                {button.error.length ? button.error : ""}
                            </Label>
                        </RadioBtnWrapper>
                    ))}
                </InputWrapper>
                <AdditionalQuestions ref={this.myRef} />
                <SubmitWrapper>
                    <Button
                        buttonClick={this.isFormValid}
                        type="dark"
                        label="Create Job"
                    />
                </SubmitWrapper>
            </PersonalInformationWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.client.profile.isLoading,
    user: state.auth.auth.user,
    isUpdateDepartmentSuccess: state.client.panel.isUpdateDepartmentSuccess,
    isNewJobAdded: state.client.panel.isNewJobAdded,
    departments: state.client.panel.departments,
});

const mapDispatchToProps = {
    getDepartment,
    addNewJob,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(JobDetails));
