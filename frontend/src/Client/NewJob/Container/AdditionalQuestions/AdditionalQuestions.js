import React, { Component } from "react";

import {
    AddtionalQuestionsWrapper,
    Label,
    InputTagWrapper,
    InputWrapper,
    AddButtonsWrapper,
} from "./style";
import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import Textfield from "../../../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import Dropdown from "../../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import Tag from "../../../../Reusuable/Components/Interactive/Tag/tag";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";

export class AdditionalQuestions extends Component {
    QUESTION_TEMPLATE = {
        textfield: {
            id: 1,
            inputType: "text",
            state: "normal",
            name: "question",
            label: "Question*",
            placeholder: "Ask a question",
            value: "",
            readOnly: false,
        },
        dropdown: {
            toggle: false,
            field: {
                id: 1,
                inputType: "text",
                state: "normal",
                name: "Input Type",
                label: "Input Type*",
                placeholder: "Select Input Type",
                value: "",
                readOnly: true,
                imgBtn: arrowDownIcon,
            },
            dropdown: [
                {
                    id: 1,
                    name: "Textfield",
                    state: "not selected",
                },
                {
                    id: 2,
                    name: "Dropdown",
                    state: "not selected",
                },
                {
                    id: 3,
                    name: "RadioButton",
                    state: "not selected",
                },
                {
                    id: 4,
                    name: "Checkbox",
                    state: "not selected",
                },
                {
                    id: 5,
                    name: "Dropdown with multiple answers",
                    state: "not selected",
                },
            ],
            value: "",
        },
        textfieldWithTag: {
            id: 1,
            inputType: "text",
            state: "normal",
            name: "choices",
            label: "Choices*",
            placeholder: "Enter Choice",
            value: "",
            selectedValues: [],
            readOnly: false,
        },
    };
    state = {
        additionalQuestion: [
            { ...JSON.parse(JSON.stringify(this.QUESTION_TEMPLATE)) },
        ],
    };

    handleInputValueChange = (index, event) => {
        let additionalQuestion = this.state.additionalQuestion;
        let textfield = additionalQuestion[index].textfield;

        textfield.value = event.target.value;
        this.setState({
            additionalQuestion,
        });
    };
    handleInputValueChangeWithTag = (index, event) => {
        let additionalQuestion = this.state.additionalQuestion;
        let textfield = additionalQuestion[index].textfieldWithTag;

        textfield.value = event.target.value;
        this.setState({
            additionalQuestion,
        });
    };
    handleDropdowntoggle = (index) => {
        let additionalQuestion = this.state.additionalQuestion;
        let dropdownMenu = additionalQuestion[index].dropdown;

        dropdownMenu.toggle = !dropdownMenu.toggle;

        this.setState({
            additionalQuestion,
        });
    };

    handleDropdownClick = (index, clickDropdown) => {
        let additionalQuestion = this.state.additionalQuestion;
        let dropdownMenu = additionalQuestion[index].dropdown;
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
            additionalQuestion,
        });

        const scope = this;
        setTimeout(() => {
            scope.handleDropdowntoggle(index);
        }, 150);
    };

    handleTagCloseBtnClick = (textfieldIndex, index) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let textfield =
            state.additionalQuestion[textfieldIndex].textfieldWithTag;
        textfield.selectedValues.splice(index, 1);

        this.setState(state);
    };

    handleAddTag = (index) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let textfield = state.additionalQuestion[index].textfieldWithTag;
        textfield.selectedValues.push(textfield.value);
        textfield.value = "";

        this.setState(state);
    };

    handleAddAdditionalQuestion = () => {
        const additionalQuestion = this.state.additionalQuestion;
        additionalQuestion.push(
            JSON.parse(JSON.stringify(this.QUESTION_TEMPLATE))
        );
        this.setState({
            additionalQuestion,
        });
    };

    handleRemoveAdditionalQuestion = (index) => {
        const additionalQuestion = this.state.additionalQuestion;
        additionalQuestion.splice(index, 1);
        this.setState({
            additionalQuestion,
        });
    };

    isFormValid = () => {
        let isValid = true;

        const additionalQuestion = this.state.additionalQuestion.map(
            (question) => {
                if (!question.textfield.value.trim().length) {
                    isValid = false;
                    question.textfield.state = "error";
                    question.textfield.hint = "please provide a question";
                } else {
                    question.textfield.state = "normal";
                    question.textfield.hint = "";
                }

                if (!question.dropdown.value.length) {
                    isValid = false;
                    question.dropdown.field.state = "error";
                    question.dropdown.field.hint =
                        "Please select the question type";
                } else {
                    question.dropdown.field.state = "normal";
                    question.dropdown.field.hint = "";
                }

                if (
                    !question.textfieldWithTag.selectedValues.length &&
                    !["Textfield", ""].includes(question.dropdown.value)
                ) {
                    isValid = false;
                    question.textfieldWithTag.state = "error";
                    question.textfieldWithTag.hint = "please provide options";
                } else {
                    question.textfieldWithTag.state = "normal";
                    question.textfieldWithTag.hint = "";
                }

                return question;
            }
        );

        this.setState({ additionalQuestion });

        return isValid;
    };

    getFormDetails = () => {
        const data = this.state.additionalQuestion.map((question) => {
            let option;
            switch (question.dropdown.value) {
                case "Dropdown":
                    option = "DROPDOWN";
                    break;
                case "Textfield":
                    option = "TEXTFIELD";
                    break;
                case "Checkbox":
                    option = "CHECKBOX";
                    break;
                case "RadioButton":
                    option = "RADIO";
                    break;
                case "Dropdown with multiple answers":
                    option = "DROPDOWN_MULTIPLE";
                    break;
            }

            return {
                question: question.textfield.value,
                option_type: option,
                choices: question.textfieldWithTag.selectedValues,
            };
        });

        return data;
    };

    render() {
        return (
            <AddtionalQuestionsWrapper>
                {!this.props.noTitle && (
                    <Label title heading>
                        Additional Questions
                    </Label>
                )}
                {this.state.additionalQuestion.map(
                    (additionalQuestion, index) => (
                        <InputWrapper>
                            <Textfield
                                textfield={additionalQuestion.textfield}
                                key={additionalQuestion.textfield.id}
                                handleInputValueChange={(event) =>
                                    this.handleInputValueChange(index, event)
                                }
                            />
                            <Dropdown
                                dropdownMenu={additionalQuestion.dropdown}
                                handleDropdowntoggle={() =>
                                    this.handleDropdowntoggle(index)
                                }
                                handleDropdownClick={(name) =>
                                    this.handleDropdownClick(index, name)
                                }
                            />
                            {!["Textfield", ""].includes(
                                additionalQuestion.dropdown.value
                            ) ? (
                                <InputTagWrapper
                                    key={additionalQuestion.textfieldWithTag.id}
                                >
                                    <Textfield
                                        textfield={
                                            additionalQuestion.textfieldWithTag
                                        }
                                        key={
                                            additionalQuestion.textfieldWithTag
                                                .id
                                        }
                                        handleInputValueChange={(event) =>
                                            this.handleInputValueChangeWithTag(
                                                index,
                                                event
                                            )
                                        }
                                        handleKeyPress={(event) => {
                                            if (event.which === 13)
                                                this.handleAddTag(index);
                                        }}
                                    />
                                    {additionalQuestion.textfieldWithTag.selectedValues.map(
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
                                </InputTagWrapper>
                            ) : null}
                            <AddButtonsWrapper>
                                {index ? (
                                    <Button
                                        buttonClick={() =>
                                            this.handleRemoveAdditionalQuestion(
                                                index
                                            )
                                        }
                                        label="Delete"
                                    />
                                ) : null}
                                <Button
                                    buttonClick={
                                        this.handleAddAdditionalQuestion
                                    }
                                    type="light"
                                    label="Add"
                                />
                            </AddButtonsWrapper>
                        </InputWrapper>
                    )
                )}
            </AddtionalQuestionsWrapper>
        );
    }
}

export default AdditionalQuestions;
