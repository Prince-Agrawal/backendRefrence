import React, { Component } from "react";
import {
    AddCandidateWrapper,
    TagWrapper,
    MainContentWrapper,
    MainInputWrapper,
    ButtonWrapper,
    InputWrapper,
    RadioBtnWrapper,
} from "./style";

import { connect } from "react-redux";
import {
    addCandidate,
    toggel,
} from "../../../../Redux/actions/Recruiter/panel.actions";

import Textfield from "../../../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import Dropdown from "../../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import Tag from "../../../../Reusuable/Components/Interactive/Tag/tag";
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import RadioButton from "../../../../Reusuable/Components/Interactive/RadioButton/RadioButton";
import Checkbox from "../../../../Reusuable/Components/Interactive/Checkbox/Checkbox";

class AddCandidate extends Component {
    constructor(props) {
        super(props);
        // if(there is no selected job)
        if (
            !this.props.currentJob ||
            !Object.keys(this.props.currentJob).length
        ) {
            this.props.history.replace("/recruiter");
            return;
        }
        // list_of_questions contains the question asked from the client from backend
        // hence we should dynamically build our form
        const { additional_questions } = this.props.currentJob;
        const dropdown = [];
        const textfield = [];
        const radiobuttons = [];
        const checkbox = [];

        additional_questions.forEach((question, index) => {
            switch (question.option_type) {
                case "DROPDOWN_MULTIPLE":
                    dropdown.push({
                        toggle: false,
                        isTag: true,
                        field: {
                            id: index,
                            inputType: "text",
                            state: "normal",
                            name: "This field is mandatory",
                            label: question.question
                                .split()
                                .map((word) => {
                                    let newWord = word;
                                    if (word.includes("$")) {
                                        newWord = this.props.currentJob[
                                            word.slice(1)
                                        ];
                                    }
                                    return newWord;
                                })
                                .join(" "),
                            placeholder: "Slelect Answers",
                            value: "",
                            readOnly: false,
                            imgBtn: arrowDownIcon,
                        },
                        dropdown: question.choices.map((choice, index) => ({
                            id: index,
                            name: choice,
                            state: "not selected",
                        })),
                        value: [],
                        defaultDropdown: question.choices.map(
                            (choice, index) => ({
                                id: index,
                                name: choice,
                                state: "not selected",
                            })
                        ),
                    });
                    break;
                case "DROPDOWN":
                    dropdown.push({
                        toggle: false,
                        field: {
                            id: index,
                            inputType: "text",
                            state: "normal",
                            name: "This field is mandatory",
                            label: question.question
                                .split(" ")
                                .map((word) => {
                                    let newWord = word;
                                    if (word.includes("$")) {
                                        newWord = this.props.currentJob[
                                            word.slice(1)
                                        ];
                                    }
                                    return newWord;
                                })
                                .join(" "),
                            placeholder: "Select Answers",
                            value: "",
                            readOnly: true,
                            imgBtn: arrowDownIcon,
                        },
                        dropdown: question.choices.map((choice, index) => ({
                            id: index,
                            name: choice,
                            state: "not selected",
                        })),
                        value: "",
                    });
                    break;
                case "RADIO":
                    radiobuttons.push({
                        label: question.question,
                        id: index,
                        radio: question.choices.map((choice, index) => ({
                            id: index,
                            active: false,
                            label: choice,
                        })),
                        value: "",
                    });
                    break;
                case "CHECKBOX":
                    checkbox.push({
                        label: question.question,
                        checkbox: question.choices.map((choice, index) => ({
                            id: index,
                            active: false,
                            label: choice,
                        })),
                        value: [],
                    });
                    break;
                case "TEXTFIELD":
                    textfield.push({
                        id: index,
                        inputType: "text",
                        state: "normal",
                        name: "Enter answer",
                        label: question.question,
                        placeholder: "John Smith",
                        value: "",
                        readOnly: false,
                    });
                    break;
                default:
                    break;
            }
        });
        this.state = {
            dropdown,
            radiobuttons,
            checkbox,
            textfield,
            default: [
                {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "name",
                    label: "Full Name",
                    placeholder: "John Smith",
                    value: "",
                    readOnly: false,
                },
                {
                    id: 2,
                    inputType: "text",
                    state: "normal",
                    name: "email",
                    label: "Email Address",
                    placeholder: "johnsmith@company.com",
                    value: "",
                    readOnly: false,
                },
                {
                    id: 3,
                    inputType: "text",
                    state: "normal",
                    name: "phone",
                    label: "Phone",
                    placeholder: "9789878979",
                    value: "",
                    readOnly: false,
                },
                {
                    id: 4,
                    inputType: "file",
                    state: "normal",
                    name: "Please select your Resume",
                    label: "Resume",
                    placeholder: "",
                    file: null,
                    readOnly: false,
                },
            ],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentJob !== this.props.currentJob) {
            if (
                !this.props.currentJob ||
                !Object.keys(this.props.currentJob).length
            ) {
                this.props.history.goBack();
            }
        }
    }

    componentWillUnmount() {
        this.props.toggelModal();
    }

    handleDropdownClick = (index, clickDropdown) => {
        let dropdown = JSON.parse(JSON.stringify(this.state.dropdown));
        let dropdownMenu = dropdown[index];
        dropdownMenu.dropdown.forEach((dropdown) => {
            if (
                dropdown.name === clickDropdown &&
                dropdown.state !== "selected"
            ) {
                if (dropdownMenu.isTag === true) {
                    dropdown.state = "selected";
                    if (
                        !dropdownMenu.value.find(
                            (value) => value === clickDropdown
                        )
                    )
                        dropdownMenu.value.push(clickDropdown);
                    dropdownMenu.field.value = "";
                } else {
                    dropdown.state = "selected";
                    dropdownMenu.value = clickDropdown;
                    dropdownMenu.field.value = clickDropdown;
                }
            } else {
                dropdown.state = "not selected";
            }
        });
        if (dropdownMenu.defaultDropdown)
            dropdownMenu.dropdown = dropdownMenu.defaultDropdown.concat();
        this.setState({
            dropdown,
        });

        const scope = this;
        setTimeout(() => {
            scope.handleDropdowntoggle(index);
        }, 150);
    };

    handleDropdowntoggle = (index) => {
        let dropdown = JSON.parse(JSON.stringify(this.state.dropdown));
        let dropdownMenu = dropdown[index];
        dropdownMenu.toggle = !dropdownMenu.toggle;
        this.setState({
            dropdown,
        });
    };

    handleDropdownInputValueChange = (event, dropdownIndex) => {
        let dropdown = JSON.parse(JSON.stringify(this.state.dropdown));
        let dropdownMenu = dropdown[dropdownIndex];
        dropdownMenu.field.value = event.target.value;
        dropdown[dropdownIndex].dropdown = dropdown[
            dropdownIndex
        ].defaultDropdown.filter((dropdown) => {
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
        this.setState({
            dropdown,
        });
    };

    handleTextFieldInputValueChange = (event, inputType, index) => {
        let inputfield = this.state[inputType];
        // for taking the input as file (resume)
        if (index === 3) {
            inputfield[index].file = event.target.files[0];
        } else inputfield[index].value = event.target.value;

        this.setState(this.state);
    };

    handleRadioBtnClick = (index, id) => {
        const radiobuttons = this.state.radiobuttons;
        radiobuttons[index].radio.forEach((btn) => {
            if (btn.id === id) {
                btn.active = true;
                radiobuttons[index].value = btn.label;
                this.setState({
                    radiobuttons,
                });
            } else {
                btn.active = false;
            }
        });
    };

    handleCheckboxClick = (index, id) => {
        let checkbox = this.state.checkbox;
        checkbox[index].checkbox[id].active = !checkbox[index].checkbox[id]
            .active;
        const value = [];
        checkbox[index].checkbox.forEach((checkbox) => {
            if (checkbox.active) {
                value.push(checkbox.label);
            }
        });
        checkbox[index].value = value;
        this.setState({ checkbox });
    };

    handleFormSubmit = () => {
        const detail_from_recruiter = [];
        this.state.checkbox.forEach((checkbox) => {
            detail_from_recruiter.push({
                question: checkbox.label,
                answer: checkbox.value.join(", "),
            });
        });
        this.state.radiobuttons.forEach((radiobutton) => {
            detail_from_recruiter.push({
                question: radiobutton.label,
                answer: radiobutton.value,
            });
        });
        this.state.dropdown.forEach((dropdown) => {
            // for dropdown with multiple value join them to make it as a string
            if (dropdown.isTag) {
                detail_from_recruiter.push({
                    question: dropdown.field.label,
                    answer: dropdown.value.join(", "),
                });
            } else
                detail_from_recruiter.push({
                    question: dropdown.field.label,
                    answer: dropdown.value,
                });
        });
        this.state.textfield.forEach((textfield) => {
            detail_from_recruiter.push({
                question: textfield.label,
                answer: textfield.value,
            });
        });

        const educational_info = [
            {
                education_info: "ojnonoda",
                score: "98",
                institute_name: "knknd",
                date: "8/74/54",
            },
        ];

        const work_exp_info = [
            {
                workExp_info: "sds",
                workExp_sure_info: "sdsdsds",
                workExp_rake_list: "knikdsnj",
            },
        ];

        const skills = ["ReactJS", "NodeJS", "Angular", "Express"];
        //  original
        const candidate = new FormData();
        candidate.append("name", this.state.default[0].value);
        candidate.append("email", this.state.default[1].value);
        candidate.append("phone_number", this.state.default[2].value);
        candidate.append(
            "resume",
            this.state.default[3].file,
            this.state.default[3].file.name
        );
        candidate.append("degree", "B.E");
        candidate.append("school", "Public School");
        candidate.append("educational_info", JSON.stringify(educational_info));
        candidate.append("work_exp_info", JSON.stringify(work_exp_info));
        candidate.append("skills", JSON.stringify(skills));
        candidate.append("achievements", ["Hackathon", "Debate"]);
        candidate.append(
            "detail_from_recruiter",
            JSON.stringify(detail_from_recruiter)
        );
        candidate.append("job_id", this.props.currentJob._id);

        // duplicate for testing filtering with resume
        // const candidate = {
        //     job_id: this.props.currentJob._id,
        // };
        this.props.addCandidate(candidate);
    };

    render() {
        if (
            !this.props.currentJob ||
            !Object.keys(this.props.currentJob).length
        ) {
            return <> </>;
        }
        return (
            <AddCandidateWrapper>
                <SectionHeader
                    title="Add Candidate"
                    desc="Please answer the following questions from the client"
                />
                <MainInputWrapper>
                    <MainContentWrapper>
                        {this.state.default.map((field, index) => (
                            <Textfield
                                textfield={field}
                                key={field.id}
                                handleInputValueChange={(event) =>
                                    this.handleTextFieldInputValueChange(
                                        event,
                                        "default",
                                        index
                                    )
                                }
                            />
                        ))}
                        {this.state.dropdown.map((dropdownItem, index) => (
                            <InputWrapper
                                key={index}
                                isTag={dropdownItem.isTag}
                            >
                                <Dropdown
                                    dropdownMenu={dropdownItem}
                                    handleDropdowntoggle={() => {
                                        this.handleDropdowntoggle(index);
                                    }}
                                    handleDropdownClick={(name) => {
                                        this.handleDropdownClick(index, name);
                                    }}
                                    handleInputValueChange={(event) =>
                                        this.handleDropdownInputValueChange(
                                            event,
                                            index
                                        )
                                    }
                                />
                                {dropdownItem.isTag ? (
                                    <TagWrapper>
                                        {dropdownItem.value.map(
                                            (tag, i, arr) => (
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
                                            )
                                        )}
                                    </TagWrapper>
                                ) : null}
                            </InputWrapper>
                        ))}
                        {this.state.radiobuttons.map((radioButton, index) => (
                            <RadioBtnWrapper key={index}>
                                <span>{radioButton.label}</span>
                                {radioButton.radio.map((btn) => (
                                    <RadioButton
                                        key={btn.id}
                                        radioBtnClick={(id) =>
                                            this.handleRadioBtnClick(index, id)
                                        }
                                        id={btn.id}
                                        active={btn.active}
                                        label={btn.label}
                                    />
                                ))}
                            </RadioBtnWrapper>
                        ))}
                        {this.state.checkbox.map((checkbox, index) => (
                            <RadioBtnWrapper key={index}>
                                <span>{checkbox.label}</span>
                                {checkbox.checkbox.map((btn) => (
                                    <Checkbox
                                        key={btn.id}
                                        checkboxClick={() =>
                                            this.handleCheckboxClick(
                                                index,
                                                btn.id
                                            )
                                        }
                                        active={btn.active}
                                        label={btn.label}
                                    />
                                ))}
                            </RadioBtnWrapper>
                        ))}
                        {this.state.textfield.map((field, index) => (
                            <Textfield
                                textfield={field}
                                key={field.id}
                                handleInputValueChange={(event) =>
                                    this.handleTextFieldInputValueChange(
                                        event,
                                        "textfield",
                                        index
                                    )
                                }
                            />
                        ))}
                    </MainContentWrapper>
                    <ButtonWrapper>
                        <Button
                            label="Cancel"
                            buttonClick={() => {
                                this.props.toggelModal();
                                this.props.history.goBack();
                            }}
                        />

                        <Button
                            type="dark"
                            label="Add"
                            buttonClick={() => {
                                this.props.toggelModal();
                                this.handleFormSubmit();
                            }}
                        />
                    </ButtonWrapper>
                </MainInputWrapper>
            </AddCandidateWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    currentJob: state.recruiter.panel.selectedJob,
    showModal: state.recruiter.panel.showModal,
});

const mapDispatchToProps = {
    addCandidate,
    toggelModal: toggel,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCandidate);
