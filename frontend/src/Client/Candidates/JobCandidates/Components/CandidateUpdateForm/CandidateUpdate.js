import React, { useState, useRef, useEffect, Component } from "react";
import { CandidateUpdateWrapper, ButtonWrapper, InputWrapper } from "./style";

import { connect } from "react-redux";
import { updateCandidateStage } from "../../../../../Redux/actions/Client/PanelActions";
import Pickers from "../../../../../Reusuable/Components/Interactive/MaterialUI/Pickers/Pickers";
import Button from "../../../../../Reusuable/Components/Interactive/Button/Button";
import arrowDownIcon from "../../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import Dropdown from "../../../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import SectionHeader from "../../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";

class CandidateUpdate extends Component {
    constructor(props) {
        super(props);
        this.pickerRef = React.createRef();
        this.state = {
            dropdown: {
                toggle: false,
                field: {
                    id: 3,
                    inputType: "text",
                    state: "normal",
                    name: "stage",
                    label: "Candidate Stage",
                    placeholder: "",
                    value: this.props.currentStage,
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: this.props.stages
                    .map((stage) => {
                        if (
                            ["Unaction", "offered", "rejected"].includes(stage)
                        ) {
                            return false;
                        }
                        return {
                            id: 1,
                            name: stage,
                            state:
                                stage === this.props.currentStage
                                    ? "selected"
                                    : "not selected",
                        };
                    })
                    .filter(Boolean)
                    .concat([
                        {
                            id: 1,
                            name: "offered",
                            state:
                                "offered" === this.props.currentStage
                                    ? "selected"
                                    : "not selected",
                        },
                        {
                            id: 2,
                            name: "rejected",
                            state:
                                "rejected" === this.props.currentStage
                                    ? "selected"
                                    : "not selected",
                        },
                    ]),
                value: this.props.currentStage,
            },
            datePicker: { error: false, hint: "" },
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.isInterviewStageUpdated !==
            this.props.isInterviewStageUpdated
        )
            if (this.props.isInterviewStageUpdated) {
                this.props.candidateUpdated();
            }
    }
    handleDropdowntoggle = () => {
        let dropdownMenu = { ...this.state.dropdown };
        dropdownMenu.toggle = !dropdownMenu.toggle;

        this.setState({ dropdown: dropdownMenu });
    };

    handleDropdownClick = (clickDropdown) => {
        let dropdownMenu = JSON.parse(JSON.stringify(this.state.dropdown));
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

        this.setState({ dropdown: dropdownMenu });

        setTimeout(() => {
            this.handleDropdowntoggle();
        }, 150);
    };

    formSubmit = () => {
        let isValid = true;
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

        if (isValid) {
            this.props.updateCandidateStage(
                {
                    candidate_id: this.props.candidateID,
                    status: this.state.dropdown.value,
                    interview_date: this.pickerRef.current.getCurrentValue(),
                },
                this.props.jobID
            );
        }
    };

    render() {
        return (
            <CandidateUpdateWrapper>
                {this.props.noTitle ? null : (
                    <SectionHeader title="Update Schedule" />
                )}
                <InputWrapper>
                    <Dropdown
                        dropdownMenu={this.state.dropdown}
                        handleDropdowntoggle={() =>
                            this.props.readOnly
                                ? (() => {})()
                                : this.handleDropdowntoggle()
                        }
                        handleDropdownClick={(name) =>
                            this.handleDropdownClick(name)
                        }
                    />
                    <Pickers
                        ref={this.pickerRef}
                        type="date"
                        error={this.state.datePicker.error}
                        label={"Interview Date"}
                        hint={this.state.datePicker.hint}
                    />
                </InputWrapper>
                <ButtonWrapper>
                    <Button
                        buttonClick={(event) => {
                            event.persist();
                            this.formSubmit();
                        }}
                        type="dark"
                        label="Schedule"
                    />
                </ButtonWrapper>
            </CandidateUpdateWrapper>
        );
    }
}
const mapStateToProps = (state) => ({
    isInterviewStageUpdated: state.client.panel.isInterviewStageUpdated,
});

const mapDispatchToProps = {
    updateCandidateStage,
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateUpdate);
