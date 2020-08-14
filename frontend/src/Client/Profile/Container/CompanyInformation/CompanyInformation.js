import React, { Component } from "react";
import axios from "axios";
import {
    PersonalInformationWrapper,
    RadioBtnWrapper,
    Label,
    SubmitWrapper,
    LocationDropdownWrapper,
    Location,
} from "./style";

import { updateCompanyInfo } from "../../../../Redux/actions/Client/profile";
import { connect } from "react-redux";

import PlacesAutocomplete from "react-places-autocomplete";

import Textfield from "../../../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import RadioButton from "../../../../Reusuable/Components/Interactive/RadioButton/RadioButton";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import { InputWrapper } from "../BillingInformation/style";

class CompanyInfomation extends Component {
    state = {
        textfield: [
            {
                id: 0,
                inputType: "text",
                state: "normal",
                name: "email",
                label: "Email*",
                placeholder: "johndoe@gmail.com",
                value: this.props.user.email,
                readOnly: true,
            },
            {
                id: 1,
                inputType: "text",
                state: "normal",
                name: "designation",
                label: "Designation*",
                placeholder: "Human Resources",
                value: this.props.user.designation,
                readOnly: false,
            },
            {
                id: 2,
                inputType: "text",
                state: "normal",
                name: "phone",
                label: "Phone*",
                placeholder: "9895646548",
                value: this.props.user.contact_number,
                readOnly: false,
            },
            {
                id: 3,
                inputType: "text",
                state: "normal",
                name: "twitter ID",
                label: "Twitter",
                placeholder: "twitter.com/profile",
                value: "",
                readOnly: false,
            },
            {
                id: 4,
                inputType: "text",
                state: "normal",
                name: "facebook ID",
                label: "Facebook",
                placeholder: "facebook.com/profile",
                value: "",
                readOnly: false,
            },
            {
                id: 5,
                inputType: "text",
                state: "normal",
                name: "linkedin ID",
                label: "LinkedIn",
                placeholder: "linkedin.com/profile",
                value: "",
                readOnly: false,
            },
            {
                id: 6,
                inputType: "text",
                state: "normal",
                name: "gmail ID",
                label: "Gmail",
                placeholder: "johndoe@gmail.com",
                value: "",
                readOnly: false,
            },
            {
                id: 7,
                inputType: "text",
                state: "normal",
                name: "skype ID",
                label: "Skype",
                placeholder: "skype.com/profile",
                value: "",
                readOnly: false,
            },
        ],
        subscription: [
            {
                id: 1,
                active: true,
                name: "yes",
                label: "Yes",
            },
            {
                id: 2,
                active: false,
                name: "no",
                label: "No",
            },
        ],
        location: {
            id: 1,
            inputType: "text",
            state: "normal",
            name: "location",
            label: "Location*",
            placeholder: "Select Location",
            value: this.props.user.location,
            readOnly: false,
        },
    };
    constructor(props) {
        super(props);
        if (this.props.isCompanyInfoUpdated) {
            this.props.submitClick();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isCompanyInfoUpdated) {
            this.props.submitClick();
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
        textfield.map((field) => {
            if (field.name === event.target.name) {
                field.value = event.target.value;
            }
            return field;
        });

        this.setState({
            textfield,
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

        let location = this.state.location;

        if (!location.value.trim()) {
            isValid = false;
            location.state = "error";
            location.hint = `Please enter ${location.name}`;
        } else {
            location.state = "normal";
            location.hint = ``;
        }

        let radioActive = false;

        let currentRadioActive = "";

        let subscription = this.state.subscription.map((btn) => {
            if (btn.active === true) {
                radioActive = true;
                currentRadioActive = btn.name;
            }
            return btn;
        });

        this.setState({
            subscription,
            location,
        });

        if (isValid && radioActive) {
            const data = {
                email: this.state.textfield[0].value,
                designation: this.state.textfield[1].value,
                contact_number: this.state.textfield[2].value,
                twitter_id: this.state.textfield[3].value,
                facebook_id: this.state.textfield[4].value,
                linkedin_id: this.state.textfield[5].value,
                gmail_id: this.state.textfield[6].value,
                skype_id: this.state.textfield[7].value,
                subscription: currentRadioActive === "yes",
            };

            this.props.updateCompanyInfo(data);
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
                    <RadioBtnWrapper>
                        <Label>Subscription for Notifications*</Label>
                        {this.state.subscription.map((btn) => (
                            <RadioButton
                                radioBtnClick={this.handleRadioBtnClick}
                                id={btn.id}
                                active={btn.active}
                                label={btn.label}
                            />
                        ))}
                    </RadioBtnWrapper>
                </InputWrapper>
                <SubmitWrapper>
                    <Button
                        buttonClick={this.isFormValid}
                        type="dark"
                        label="Submit"
                    />
                </SubmitWrapper>
            </PersonalInformationWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.client.profile.isLoading,
    user: state.auth.auth.user,
    isCompanyInfoUpdated: state.client.profile.isCompanyInfoUpdated,
});

const mapDispatchToProps = {
    updateCompanyInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfomation);
