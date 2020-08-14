import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
    AdditionalInformationWrapper,
    RadioBtnWrapper,
    SubmitWrapper,
} from "./style";

import { updateBillingInfo } from "../../../../Redux/actions/Client/profile";
import { connect } from "react-redux";

import Textfield from "../../../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import { InputWrapper } from "./style";
import Textarea from "../../../../Reusuable/Components/Interactive/inputs/TextArea/TextArea";

class BillingInformation extends Component {
    state = {
        textfield: [
            {
                id: 0,
                inputType: "text",
                state: "normal",
                name: "contact person",
                label: "Contact Person*",
                placeholder: "John Doe",
                value: "",
                readOnly: false,
            },
            {
                id: 1,
                inputType: "text",
                state: "normal",
                name: "billing name",
                label: "Billing Name*",
                placeholder: "John Doe",
                value: "",
                readOnly: false,
            },
            {
                id: 2,
                inputType: "text",
                state: "normal",
                name: "account number",
                label: "Account Number*",
                placeholder: "Your account number",
                value: "",
                readOnly: false,
            },
            {
                id: 3,
                inputType: "text",
                state: "normal",
                name: "service tax number",
                label: "Service Tax Number*",
                placeholder: "Your service tax number",
                value: "",
                readOnly: false,
            },
            {
                id: 4,
                inputType: "text",
                state: "normal",
                name: "company identification",
                label: "Company Identification Number*",
                placeholder: "Your company identification",
                value: "",
                readOnly: false,
            },
            {
                id: 5,
                inputType: "text",
                state: "normal",
                name: "GST number",
                label: "GST Number*",
                placeholder: "GST number",
                value: "",
                readOnly: false,
            },
        ],
        textarea: [
            {
                id: 1,
                inputType: "textarea",
                state: "normal",
                name: "address",
                label: "Address*",
                placeholder: "Atleast 100 Characters",
                value: "",
                readOnly: false,
            },
        ],
    };
    constructor(props) {
        super(props);
        if (this.props.isBillingInfoUpdated) {
            this.props.history.replace("/client");
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isBillingInfoUpdated) {
            this.props.history.replace("/client");
        }
    }

    handleRadioBtnClick = (id) => {
        const subscription = this.state.subscription.concat();
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

        if (isValid) {
            const data = {
                contact_person: this.state.textfield[0].value,
                billing_name: this.state.textfield[1].value,
                address: this.state.textarea[0].value,
                account_number: this.state.textfield[2].value,
                service_tax_number: this.state.textfield[3].value,
                company_identification_number: this.state.textfield[4].value,
                GST_number: this.state.textfield[5].value,
            };

            this.props.updateBillingInfo(data);
        }

        return isValid;
    };

    render() {
        return (
            <AdditionalInformationWrapper>
                <InputWrapper>
                    {this.state.textfield.map((field) => (
                        <Textfield
                            textfield={field}
                            key={field.id}
                            handleInputValueChange={this.handleInputValueChange}
                        />
                    ))}
                    {this.state.textarea.map((field) => (
                        <Textarea
                            textarea={field}
                            key={field.id}
                            handleInputValueChange={this.handleInputValueChange}
                        />
                    ))}
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
            </AdditionalInformationWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.client.profile.isLoading,
    user: state.auth.auth.user,
    isBillingInfoUpdated: state.client.profile.isBillingInfoUpdated,
});

const mapDispatchToProps = {
    updateBillingInfo,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(BillingInformation));
