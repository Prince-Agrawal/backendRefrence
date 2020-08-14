import React, { Component } from "react";
import axios from "axios";
import {
    PersonalInformationWrapper,
    RadioBtnWrapper,
    Label,
    SubmitWrapper,
    ImageUploadWrapper,
    ImageHolder,
    LocationDropdownWrapper,
    Location,
    TagWrapper,
} from "./style";

import { updatePersonalInfo } from "../../../../Redux/actions/Recruiter/profile";
import { connect } from "react-redux";

import PlacesAutocomplete from "react-places-autocomplete";

import Textfield from "../../../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import RadioButton from "../../../../Reusuable/Components/Interactive/RadioButton/RadioButton";
import Dropdown from "../../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import { InputWrapper } from "../AdditionalInformation/style";
import Icon from "../../../../Assets/Icons/User-Icon/User Icon.svg";
import Tag from "../../../../Reusuable/Components/Interactive/Tag/tag";

class PersonalIformation extends Component {
    state = {
        textfield: [
            {
                id: 0,
                inputType: "text",
                state: "normal",
                name: "name",
                label: "Full Name",
                placeholder: "John Doe",
                value: "",
                readOnly: false,
            },
            {
                id: 1,
                inputType: "text",
                state: "normal",
                name: "phone",
                label: "Phone",
                placeholder: "9789546875",
                value: "",
                readOnly: false,
            },
        ],
        radioButton: [
            {
                id: 1,
                active: true,
                name: "male",
                label: "Male",
            },
            {
                id: 2,
                active: false,
                name: "female",
                label: "Female",
            },
            {
                id: 3,
                active: false,
                name: "rather not to say",
                label: "Rather not to say",
            },
        ],
        dropDown: [
            {
                toggle: false,
                field: {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "highest_qualification",
                    label: "Highest Qualification",
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
                isTag: true,
                field: {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "languages known",
                    label: "Languages Known",
                    placeholder: "Select Language",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    "Hindi",
                    "English",
                    "Bengali",
                    "Marathi",
                    "Telugu",
                    "Tamil",
                    "Gujarati",
                    "Urdu",
                    "Kannada",
                    "Odia",
                    "Malayalam",
                    "Panjabi",
                    "Sanskrit",
                ].map((lang, index) => ({
                    id: index,
                    name: lang,
                    state: "not selected",
                })),
                value: [],
            },
        ],
        location: {
            id: 1,
            inputType: "text",
            state: "normal",
            name: "location",
            label: "Location",
            placeholder: "Select Location",
            value: "",
            readOnly: false,
        },
        profile: {
            file: null,
            url: null,
        },
    };
    constructor(props) {
        super(props);
        if (this.props.isPersonalInfoUpdated) {
            this.props.submitClick();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isPersonalInfoUpdated) {
            this.props.submitClick();
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
            dropDown,
        });

        const scope = this;
        setTimeout(() => {
            scope.handleDropdowntoggle(index);
        }, 150);
    };

    handleTagCloseBtnClick = (dropDownIndex, index) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let dropDown = state.dropDown;
        let dropdownMenu = dropDown[dropDownIndex];
        dropdownMenu.value.splice(index, 1);

        this.setState({
            dropDown,
        });
    };

    handleRadioBtnClick = (id) => {
        const radioButton = this.state.radioButton.concat();
        radioButton.forEach((btn) => {
            if (btn.id === id) {
                btn.active = true;
                this.setState({
                    radioButton,
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

        let radioButton = this.state.radioButton.map((btn) => {
            if (btn.active === true) {
                radioActive = true;
                currentRadioActive = btn.name;
            }
            return btn;
        });

        this.setState({
            radioButton,
            location,
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

        if (isValid && dropDownActive && radioActive) {
            const data = new FormData();
            if (this.state.profile.file)
                data.append(
                    "image",
                    this.state.profile.file,
                    this.state.profile.file.name
                );
            data.append("name", this.state.textfield[0].value);
            data.append("phone_no", this.state.textfield[1].value);
            data.append("location", this.state.location.value);
            data.append(
                "highest_qualification",
                this.state.dropDown[0].field.value
            );
            data.append("gender", currentRadioActive);
            data.append(
                "communication_skills",
                JSON.stringify(this.state.dropDown[1].value)
            );

            this.props.updatePersonalInfo(data);
        }

        return isValid;
    };

    handleImageUpload = (e) => {
        const file = e.target.files[0];
        let profile = { ...this.state.profile };
        profile.file = file;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                profile.url = e.target.result;
                this.setState({ profile });
            };
            reader.readAsDataURL(file);
        }
    };

    render() {
        return (
            <PersonalInformationWrapper>
                <ImageUploadWrapper>
                    <b>Add Profile Picture</b>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageUpload}
                        ref={(imageUpload) =>
                            (this.imageUploader = imageUpload)
                        }
                        style={{
                            display: "none",
                        }}
                    />
                    <ImageHolder
                        src={
                            this.state.profile.url === null
                                ? Icon.toString()
                                : null
                        }
                        onClick={() => this.imageUploader.click()}
                    >
                        {this.state.profile.url ? (
                            <img
                                src={this.state.profile.url}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        ) : null}
                    </ImageHolder>
                </ImageUploadWrapper>
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
                    <Dropdown
                        dropdownMenu={this.state.dropDown[0]}
                        handleDropdowntoggle={() =>
                            this.handleDropdowntoggle(0)
                        }
                        handleDropdownClick={(name) =>
                            this.handleDropdownClick(0, name)
                        }
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
                    <TagWrapper>
                        {this.state.dropDown[1].value.map((tag, i, arr) => (
                            <Tag
                                key={i}
                                tag={{ id: i, label: tag }}
                                length={arr.length}
                                handleCloseBtnClick={() =>
                                    this.handleTagCloseBtnClick(1, i)
                                }
                            />
                        ))}
                    </TagWrapper>
                    <RadioBtnWrapper>
                        <Label>Gender</Label>
                        {this.state.radioButton.map((btn) => (
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
    isLoading: state.recruiter.profile.isLoading,
    isPersonalInfoUpdated: state.recruiter.profile.isPersonalInfoUpdated,
});

const mapDispatchToProps = {
    updatePersonalInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalIformation);
