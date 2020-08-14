import React, { Component } from "react";
import { PersonalInformationWrapper, SubmitWrapper } from "./style";

import { updateAboutCompany } from "../../../../Redux/actions/Client/profile";
import { connect } from "react-redux";

import Textfield from "../../../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import Dropdown from "../../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import { InputWrapper } from "../BillingInformation/style";
import Textarea from "../../../../Reusuable/Components/Interactive/inputs/TextArea/TextArea";

class AboutCompany extends Component {
    state = {
        textfield: [
            {
                id: 0,
                inputType: "text",
                state: "normal",
                name: "company name",
                label: "Company Name*",
                placeholder: "Lineupx",
                value: this.props.user.company_name,
                readOnly: false,
            },
            {
                id: 1,
                inputType: "text",
                state: "normal",
                name: "company website",
                label: "Company Website*",
                placeholder: "www.lineupx.com",
                value: "",
                readOnly: false,
            },
            {
                id: 3,
                inputType: "text",
                state: "normal",
                name: "company video",
                label: "Company Video",
                placeholder: "Company Video",
                value: "",
                readOnly: false,
            },
        ],
        textarea: [
            {
                id: 1,
                inputType: "textarea",
                state: "normal",
                name: "company description",
                label: "Company Description*",
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
        dropDown: [
            {
                toggle: false,
                field: {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "industry",
                    label: "Industry*",
                    placeholder: "Select Industry",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    {
                        id: 1,
                        name: "Accounting",
                        state: "not selected",
                    },
                    {
                        id: 2,
                        name: "Advertising",
                        state: "not selected",
                    },
                    {
                        id: 3,
                        name: "Agriculture",
                        state: "not selected",
                    },
                    { id: 4, name: "Animation", state: "not selected" },
                    {
                        id: 5,
                        name: "Architecture",
                        state: "not selected",
                    },
                    {
                        id: 6,
                        name: "Automobile",
                        state: "not selected",
                    },
                    { id: 7, name: "Aviation", state: "not selected" },
                    { id: 8, name: "BPO", state: "not selected" },
                    { id: 9, name: "Bank", state: "not selected" },
                    { id: 10, name: "Brewery", state: "not selected" },
                    { id: 11, name: "Sanitary", state: "not seleted" },
                    { id: 12, name: "Chemical", state: "not selected" },
                    {
                        id: 13,
                        name: "Engineering",
                        state: "not selected",
                    },
                ],
                value: "",
            },
        ],
        logo: {
            id: 2,
            inputType: "file",
            state: "normal",
            name: "logo",
            label: "Logo",
            placeholder: "",
            file: null,
            readOnly: false,
        },
    };
    constructor(props) {
        super(props);
        if (this.props.isAboutCompanyUpdated) {
            this.props.submitClick();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isAboutCompanyUpdated) {
            this.props.submitClick();
        }
    }

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
            dropDown,
        });

        const scope = this;
        setTimeout(() => {
            scope.handleDropdowntoggle(index);
        }, 150);
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
        let textarea = this.state.textarea;
        let isValid = true;

        textfield.map((field) => {
            if (!field.label.includes("*")) {
                return field;
            }
            this.handleFieldValidation(field.name);
            if (field.state === "error") {
                isValid = false;
            }
            return field;
        });

        textarea.map((field) => {
            if (!field.label.includes("*")) {
                return field;
            }
            if (field.value.trim().length === 0) {
                isValid = false;
                field.state = "error";
                field.hint = `Please provide ${field.name}`;
            }
            return field;
        });
        this.setState({
            textarea,
        });

        let dropDownActive = true;
        this.state.dropDown.forEach((dropDown) => {
            if (dropDown.value.length === 0) {
                dropDownActive = false;
                dropDown.field.state = "error";
                dropDown.field.hint = `Please provide ${dropDown.field.name}`;
            } else {
                dropDown.field.state = "normal";
                dropDown.field.hint = ``;
            }
        });

        if (isValid && dropDownActive) {
            const data = new FormData();
            data.append("company_name", this.state.textfield[0].value);
            data.append("company_description", this.state.textarea[0].value);
            data.append("additional_information", this.state.textarea[1].value);
            data.append("company_video", this.state.textfield[2].value);
            data.append("industry", this.state.dropDown[0].value);
            data.append("website", this.state.textfield[1].value);
            if (this.state.logo.file) {
                data.append(
                    "logo",
                    this.state.logo.file,
                    this.state.logo.file.name
                );
            }
            this.props.updateAboutCompany(data);
        }

        return isValid;
    };

    render() {
        return (
            <PersonalInformationWrapper>
                <InputWrapper>
                    {this.state.textfield.map((field) => (
                        <Textfield
                            textfield={field}
                            key={field.id}
                            handleInputValueChange={this.handleInputValueChange}
                        />
                    ))}
                    <Dropdown
                        dropdownMenu={this.state.dropDown[0]}
                        handleDropdowntoggle={() =>
                            this.handleDropdowntoggle(0)
                        }
                        handleDropdownClick={(name) =>
                            this.handleDropdownClick(0, name)
                        }
                    />
                    {this.state.textarea.map((field) => (
                        <Textarea
                            textarea={field}
                            key={field.id}
                            handleInputValueChange={this.handleInputValueChange}
                        />
                    ))}
                    <Textfield
                        textfield={this.state.logo}
                        handleInputValueChange={(event) => {
                            let logo = { ...this.state.logo };
                            logo.file = event.target.files[0];
                            this.setState({ logo });
                        }}
                    />
                </InputWrapper>
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
            </PersonalInformationWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.client.profile.isLoading,
    user: state.auth.auth.user,
    isAboutCompanyUpdated: state.client.profile.isAboutCompanyUpdated,
});

const mapDispatchToProps = {
    updateAboutCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutCompany);
