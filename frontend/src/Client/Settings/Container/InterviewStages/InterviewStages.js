import React, { Component } from "react";
import { connect } from "react-redux";
import {
    addDepartment,
    getDepartment,
} from "../../../../Redux/actions/Client/PanelActions";
import {
    InterviewStagesWrapper,
    AddButtonsWrapper,
    InputTagWrapper,
    InputWrapper,
    SaveButtonWrapper,
    Label,
    DepartmentWrapper,
} from "./style";
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import Textfield from "../../../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import Tag from "../../../../Reusuable/Components/Interactive/Tag/tag";

export class InterviewStages extends Component {
    INTERVIEW_STAGES_EDIT = {
        textfield: {
            id: 1,
            inputType: "text",
            state: "normal",
            name: "department",
            label: "Department*",
            placeholder: "Information Technology",
            value: "",
            readOnly: false,
        },
        textfieldWithTag: {
            id: 2,
            inputType: "text",
            state: "normal",
            name: "interview stages",
            label: "Interview Stages*",
            placeholder: "Enter Stages",
            value: "",
            selectedValues: [],
            readOnly: false,
        },
    };
    constructor(props) {
        super(props);
        this.props.getDepartment();
        this.state = {
            interviewStagesEdit: [],
            isEditable: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.isUpdateDepartmentSuccess !==
            this.props.isUpdateDepartmentSuccess
        ) {
            if (this.props.isUpdateDepartmentSuccess === true) {
                this.toggleEditState();
            }
        }
        if (prevProps.departments !== this.props.departments) {
            if (this.props.departments.length !== 0) {
                const state = {
                    interviewStagesEdit: this.props.departments?.map(
                        (department) => {
                            return JSON.parse(
                                JSON.stringify({
                                    textfield: {
                                        ...this.INTERVIEW_STAGES_EDIT.textfield,
                                        value: department.department,
                                    },
                                    textfieldWithTag: {
                                        ...this.INTERVIEW_STAGES_EDIT
                                            .textfieldWithTag,
                                        selectedValues: department.stages,
                                    },
                                })
                            );
                        }
                    ),
                    isEditable: false,
                };
                this.setState(state);
            }
        }
    }

    handleInputValueChange = (index, event) => {
        let interviewStagesEdit = this.state.interviewStagesEdit;
        let textfield = interviewStagesEdit[index].textfield;

        textfield.value = event.target.value;
        this.setState({
            interviewStagesEdit,
        });
    };
    handleInputValueChangeWithTag = (index, event) => {
        let interviewStagesEdit = this.state.interviewStagesEdit;
        let textfield = interviewStagesEdit[index].textfieldWithTag;

        textfield.value = event.target.value;
        this.setState({
            interviewStagesEdit,
        });
    };
    handleTagCloseBtnClick = (textfieldIndex, index) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let textfield =
            state.interviewStagesEdit[textfieldIndex].textfieldWithTag;
        textfield.selectedValues.splice(index, 1);

        this.setState(state);
    };

    handleAddTag = (index) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let textfield = state.interviewStagesEdit[index].textfieldWithTag;
        textfield.selectedValues.push(textfield.value);
        textfield.value = "";

        this.setState(state);
    };

    handleAddInterviewStage = () => {
        const interviewStagesEdit = this.state.interviewStagesEdit.concat();
        interviewStagesEdit.push(
            JSON.parse(JSON.stringify(this.INTERVIEW_STAGES_EDIT))
        );
        this.setState({
            interviewStagesEdit,
        });
    };

    handleRemoveInterviewStage = (index) => {
        const interviewStagesEdit = this.state.interviewStagesEdit;
        interviewStagesEdit.splice(index, 1);
        this.setState({
            interviewStagesEdit,
        });
    };

    toggleEditState = () => {
        console.log(this.state.interviewStagesEdit.length);
        if ([0, null].includes(this.state.interviewStagesEdit.length)) {
            this.state.interviewStagesEdit.push(
                JSON.parse(JSON.stringify(this.INTERVIEW_STAGES_EDIT))
            );
        }
        this.setState({
            isEditable: !this.state.isEditable,
        });
    };

    formSubmit = () => {
        let isValid = true;
        const interviewStagesEdit = this.state.interviewStagesEdit;
        interviewStagesEdit.forEach((interviewStage) => {
            if (interviewStage.textfield.value.trim().length === 0) {
                isValid = false;
                interviewStage.textfield.state = "error";
                interviewStage.textfield.hint = `please provide ${interviewStage.textfield.name}`;
                console.log(interviewStage.textfield);
            } else {
                isValid = true && isValid;
                interviewStage.textfield.state = "normal";
                interviewStage.textfield.hint = ``;
            }
            if (interviewStage.textfieldWithTag.selectedValues.length === 0) {
                isValid = false;
                interviewStage.textfieldWithTag.state = "error";
                interviewStage.textfieldWithTag.hint = `please provide ${interviewStage.textfield.name}`;
            } else {
                isValid = true && isValid;
                interviewStage.textfieldWithTag.state = "normal";
                interviewStage.textfieldWithTag.hint = ``;
            }
        });

        this.setState({
            interviewStagesEdit,
        });

        if (isValid) {
            const data = this.state.interviewStagesEdit.map(
                (interviewStage) => {
                    return {
                        department: interviewStage.textfield.value,
                        stages: interviewStage.textfieldWithTag.selectedValues,
                    };
                }
            );
            this.props.addDepartment(data);
        }
    };

    render() {
        return (
            <InterviewStagesWrapper>
                <SectionHeader
                    title="Department"
                    desc="Add and modify your Interview Stage with respective to your Department"
                />
                {this.props.departments.length === 0 &&
                !this.state.isEditable ? (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <h3>Please Add Department</h3>
                        <Button
                            buttonClick={this.toggleEditState}
                            type="light"
                            label="Add"
                        />
                    </div>
                ) : this.state.isEditable ? (
                    <>
                        {this.state.interviewStagesEdit?.map(
                            (interviewStage, index, arr) => (
                                <InputWrapper>
                                    <Textfield
                                        textfield={interviewStage.textfield}
                                        key={interviewStage.textfield.id}
                                        handleInputValueChange={(event) =>
                                            this.handleInputValueChange(
                                                index,
                                                event
                                            )
                                        }
                                    />
                                    <InputTagWrapper>
                                        <Textfield
                                            textfield={
                                                interviewStage.textfieldWithTag
                                            }
                                            key={
                                                interviewStage.textfieldWithTag
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
                                        {interviewStage.textfieldWithTag.selectedValues.map(
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
                                    <AddButtonsWrapper>
                                        {index ? (
                                            <Button
                                                buttonClick={() =>
                                                    this.handleRemoveInterviewStage(
                                                        index
                                                    )
                                                }
                                                label="Delete"
                                            />
                                        ) : null}
                                        {index + 1 === arr.length ? (
                                            <Button
                                                buttonClick={
                                                    this.handleAddInterviewStage
                                                }
                                                type="light"
                                                label="Add"
                                            />
                                        ) : null}
                                    </AddButtonsWrapper>
                                </InputWrapper>
                            )
                        )}
                        <SaveButtonWrapper>
                            <Button
                                buttonClick={this.formSubmit}
                                type="dark"
                                label="Save"
                            />
                            <Button
                                buttonClick={this.toggleEditState}
                                label="Cancel"
                            />
                        </SaveButtonWrapper>
                    </>
                ) : (
                    <DepartmentWrapper>
                        {this.props.departments.map((department) => (
                            <>
                                <Label heading>{department.department}</Label>
                                <InputTagWrapper>
                                    {department.stages.map((tag, i, arr) => (
                                        <Tag
                                            key={i}
                                            tag={{
                                                id: i,
                                                label: tag,
                                            }}
                                            length={arr.length}
                                            view
                                        />
                                    ))}
                                </InputTagWrapper>
                            </>
                        ))}
                        <InputTagWrapper>
                            <SaveButtonWrapper>
                                <Button
                                    type="light"
                                    buttonClick={this.toggleEditState}
                                    label="Edit"
                                />
                            </SaveButtonWrapper>
                        </InputTagWrapper>
                    </DepartmentWrapper>
                )}
            </InterviewStagesWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.client.panel.error,
    isUpdateDepartmentSuccess: state.client.panel.isUpdateDepartmentSuccess,
    departments: state.client.panel.departments,
});

const mapDispatchToProps = {
    addDepartment,
    getDepartment,
};

export default connect(mapStateToProps, mapDispatchToProps)(InterviewStages);
