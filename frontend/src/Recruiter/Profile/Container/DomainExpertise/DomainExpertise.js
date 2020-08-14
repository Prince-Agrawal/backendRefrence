import React, { Component } from "react";

import { connect } from "react-redux";
import { updateDomainExpertise } from "../../../../Redux/actions/Recruiter/profile";
import { getLineupxClients } from "../../../../Redux/actions/lineupx/action";
import {
    DomainExpertiseWrapper,
    DomainWrapper,
    DomainButtonWrapper,
    TagWrapper,
    SubmitWrapper,
    ExperienceWrapper,
} from "./style";
import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import Dropdown from "../../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import Tag from "../../../../Reusuable/Components/Interactive/Tag/tag";
import Years from "../../../../Reusuable/Components/Interactive/inputs/Years/Years";
import Months from "../../../../Reusuable/Components/Interactive/inputs/Months/Months";

class DomainExpertise extends Component {
    state = {
        domains: [
            {
                dropDown: [
                    {
                        toggle: false,
                        field: {
                            id: 1,
                            inputType: "text",
                            state: "normal",
                            name: "domain",
                            label: "Domain",
                            placeholder: "Select Domain",
                            value: "",
                            readOnly: false,
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
                        defaultDropdown: [
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
                    },
                    {
                        toggle: false,
                        field: {
                            id: 2,
                            inputType: "text",
                            state: "normal",
                            name: "years",
                            label: "Experience",
                            placeholder: "",
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
                            id: 3,
                            inputType: "text",
                            state: "normal",
                            name: "months",
                            label: " ",
                            placeholder: "",
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
                        isTag: true,
                        field: {
                            id: 4,
                            inputType: "text",
                            state: "normal",
                            name: "top_clients",
                            label: "Top % Clients",
                            placeholder: "Slelect Clients",
                            value: "",
                            readOnly: false,
                            imgBtn: arrowDownIcon,
                        },
                        dropdown: [
                            {
                                id: 1,
                                name: "AAPC India Hotel Management",
                                state: "not selected",
                            },
                            {
                                id: 2,
                                name: "24/7 Customer",
                                state: "not selected",
                            },
                            {
                                id: 3,
                                name: "3i Infotech",
                                state: "not selected",
                            },
                            {
                                id: 4,
                                name: "3D PLM Software",
                                state: "not selected",
                            },
                            {
                                id: 5,
                                name: "ACT Television",
                                state: "not selected",
                            },
                            {
                                id: 6,
                                name: "3D PLM Software",
                                state: "not selected",
                            },
                            {
                                id: 7,
                                name: "ANI Technologies",
                                state: "not selected",
                            },
                            {
                                id: 8,
                                name: "ANZ Support Services",
                                state: "not selected",
                            },
                            {
                                id: 9,
                                name: "ASAP Info Systems",
                                state: "not selected",
                            },
                            {
                                id: 10,
                                name: "ASM Technologies",
                                state: "not selected",
                            },
                            { id: 11, name: "AT&T", state: "not seleted" },
                            {
                                id: 12,
                                name: "AgreeYa Mobility",
                                state: "not selected",
                            },
                            {
                                id: 13,
                                name: "Aircel",
                                state: "not selected",
                            },
                        ],
                        value: [],
                        defaultDropdown: [
                            {
                                id: 1,
                                name: "AAPC India Hotel Management",
                                state: "not selected",
                            },
                            {
                                id: 2,
                                name: "24/7 Customer",
                                state: "not selected",
                            },
                            {
                                id: 3,
                                name: "3i Infotech",
                                state: "not selected",
                            },
                            {
                                id: 4,
                                name: "3D PLM Software",
                                state: "not selected",
                            },
                            {
                                id: 5,
                                name: "ACT Television",
                                state: "not selected",
                            },
                            {
                                id: 6,
                                name: "3D PLM Software",
                                state: "not selected",
                            },
                            {
                                id: 7,
                                name: "ANI Technologies",
                                state: "not selected",
                            },
                            {
                                id: 8,
                                name: "ANZ Support Services",
                                state: "not selected",
                            },
                            {
                                id: 9,
                                name: "ASAP Info Systems",
                                state: "not selected",
                            },
                            {
                                id: 10,
                                name: "ASM Technologies",
                                state: "not selected",
                            },
                            { id: 11, name: "AT&T", state: "not seleted" },
                            {
                                id: 12,
                                name: "AgreeYa Mobility",
                                state: "not selected",
                            },
                            {
                                id: 13,
                                name: "Aircel",
                                state: "not selected",
                            },
                        ],
                    },
                ],
            },
        ],
        dropDown: [
            {
                toggle: false,
                isTag: true,
                field: {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "department",
                    label: "Function/Department",
                    placeholder: "Select Department",
                    value: "",
                    readOnly: false,
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
                        name: "Interior Design",
                        state: "not selected",
                    },
                    { id: 3, name: "Bank", state: "not selected" },
                    {
                        id: 4,
                        name: "Content Writing",
                        state: "not selected",
                    },
                    {
                        id: 5,
                        name: "Consultant",
                        state: "not selected",
                    },
                ],
                value: [],
                defaultDropdown: [
                    {
                        id: 1,
                        name: "Accounting",
                        state: "not selected",
                    },
                    {
                        id: 2,
                        name: "Interior Design",
                        state: "not selected",
                    },
                    { id: 3, name: "Bank", state: "not selected" },
                    {
                        id: 4,
                        name: "Content Writing",
                        state: "not selected",
                    },
                    {
                        id: 5,
                        name: "Consultant",
                        state: "not selected",
                    },
                ],
            },

            {
                toggle: false,
                field: {
                    id: 2,
                    inputType: "text",
                    state: "normal",
                    name: "years",
                    label: "Experience in Recruitment",
                    placeholder: "",
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
                    name: "months",
                    label: " ",
                    placeholder: "",
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
                    id: 3,
                    inputType: "text",
                    state: "normal",
                    name: "years",
                    label: "Total Experience",
                    placeholder: "",
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
                    id: 3,
                    inputType: "text",
                    state: "normal",
                    name: "months",
                    label: " ",
                    placeholder: "",
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
                isTag: true,
                field: {
                    id: 2,
                    inputType: "text",
                    state: "normal",
                    name: "skills",
                    label: "Skills",
                    placeholder: "Select Skill",
                    value: "",
                    readOnly: false,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    {
                        id: 1,
                        name: "Auditing",
                        state: "not selected",
                    },
                    {
                        id: 2,
                        name: "AutoCAD",
                        state: "not selected",
                    },
                    {
                        id: 3,
                        name: "Automotive",
                        state: "not selected",
                    },
                    {
                        id: 4,
                        name: "Analytical Skills",
                        state: "not selected",
                    },
                    {
                        id: 5,
                        name: "Adobe Photoshop",
                        state: "not selected",
                    },
                ],
                defaultDropdown: [
                    {
                        id: 1,
                        name: "Auditing",
                        state: "not selected",
                    },
                    {
                        id: 2,
                        name: "AutoCAD",
                        state: "not selected",
                    },
                    {
                        id: 3,
                        name: "Automotive",
                        state: "not selected",
                    },
                    {
                        id: 4,
                        name: "Analytical Skills",
                        state: "not selected",
                    },
                    {
                        id: 5,
                        name: "Adobe Photoshop",
                        state: "not selected",
                    },
                ],
                value: [],
            },
            {
                toggle: false,
                isTag: true,
                field: {
                    id: 3,
                    inputType: "text",
                    state: "normal",
                    name: "domain_prefference",
                    label: "Intrested Domains",
                    placeholder: "Slelect Domains",
                    value: "",
                    readOnly: false,
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
                value: [],
                defaultDropdown: [
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
            },
        ],
    };

    constructor(props) {
        super(props);
        if (this.props.isDomainExpertiseUpdated) {
            this.props.submitClick();
        }
        this.props.getLineupxClients();
    }

    componentDidUpdate(prevProps, prevState) {
        // if form submitted successfully
        if (this.props.isDomainExpertiseUpdated) {
            this.props.submitClick();
        }
        if (prevProps.top_clients !== this.props.top_clients) {
            if (this.props.top_clients) {
                let domains = JSON.parse(JSON.stringify(this.state.domains));
                domains[0].dropDown[3].defaultDropdown = this.props.top_clients.map(
                    (client, index) => ({
                        id: index,
                        name: client,
                        state: "not selected",
                    })
                );
                domains[0].dropDown[3].dropdown = this.props.top_clients.map(
                    (client, index) => ({
                        id: index,
                        name: client,
                        state: "not selected",
                    })
                );
                this.setState({ domains });
            }
        }
    }

    handleDropdowntoggle = (domainIndex, index) => {
        let domains = this.state.domains.concat();
        let dropDown = domains[domainIndex].dropDown.concat();
        let dropdownMenu = dropDown[index];
        dropdownMenu = { ...dropdownMenu };
        dropdownMenu.toggle = !dropdownMenu.toggle;
        dropDown[index] = { ...dropdownMenu };
        domains[domainIndex].dropDown = dropDown.concat();
        this.setState({
            domains,
        });
    };
    handleDropdowntoggleCommon = (index) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let dropDown = state.dropDown;
        let dropdownMenu = dropDown[index];
        dropdownMenu = { ...dropdownMenu };
        dropdownMenu.toggle = !dropdownMenu.toggle;
        dropDown[index] = { ...dropdownMenu };
        this.setState({
            dropDown,
        });
    };

    handleDropdownClick = (domainIndex, index, clickDropdown) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let domains = state.domains;
        let dropdownMenu = domains[domainIndex].dropDown[index];
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
            domains,
        });

        const scope = this;
        setTimeout(() => {
            scope.handleDropdowntoggle(domainIndex, index);
        }, 150);
    };
    handleDropdownClickCommon = (index, clickDropdown) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let dropDown = state.dropDown;
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
            scope.handleDropdowntoggleCommon(index);
        }, 150);
    };

    handleInputValueChange = (domainIndex, index, event) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let domains = state.domains;
        domains[domainIndex].dropDown[index].field.value = event.target.value;
        let defaultDomain = domains[domainIndex].dropDown[
            index
        ].defaultDropdown.concat();
        let dropdown = defaultDomain.filter((domain) => {
            if (
                domain.name
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
        domains[domainIndex].dropDown[index].dropdown = dropdown.concat();
        this.setState({
            domains,
        });
    };
    handleInputValueChangeCommon = (index, event) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let dropDown = state.dropDown;
        let dropdownMenu = dropDown[index];
        dropdownMenu.field.value = event.target.value;
        let defaultDomain = dropdownMenu.defaultDropdown.concat();
        let dropdown = defaultDomain.filter((domain) => {
            if (
                domain.name
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
        dropdownMenu.dropdown = dropdown.concat();
        this.setState({
            dropDown,
        });
    };

    handleAddDomain = () => {
        let state = JSON.parse(JSON.stringify(this.state));
        let domains = state.domains;
        let dropDown = state.domains[0].dropDown;

        dropDown.forEach((dropdown) => {
            if (dropdown.isTag) {
                dropdown.value = [];
                dropdown.field.value = "";
                dropdown.dropdown = dropdown.defaultDropdown.concat();
            } else {
                dropdown.field.value = "";
            }
        });
        let newDomain = this.state.domains;
        newDomain.push(domains[0]);
        this.setState({
            domains: newDomain,
        });
    };

    handleRemoveDomain = (domainIndex) => {
        const domains = this.state.domains.concat();
        domains.splice(domainIndex, 1);
        this.setState({
            domains,
        });
    };

    handleTagCloseBtnClick = (domainIndex, index) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let domains = state.domains;
        domains[domainIndex].dropDown[3].value.splice(index, 1);

        this.setState({
            domains,
        });
    };
    handleTagCloseBtnClickCommon = (dropDownIndex, index) => {
        let state = JSON.parse(JSON.stringify(this.state));
        let dropDown = state.dropDown;
        let dropdownMenu = dropDown[dropDownIndex];
        dropdownMenu.value.splice(index, 1);

        this.setState({
            dropDown,
        });
    };

    isFormValid = (event) => {
        event.preventDefault();

        let isValid = true;

        let domainDropDowns = this.state.domains.concat();

        domainDropDowns.forEach((domainDropDown) => {
            domainDropDown.dropDown.forEach((dropDown) => {
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
        });

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

        if (isValid) {
            const domains = this.state.domains.map((domain) => {
                return {
                    domain_name: domain.dropDown[0].value,
                    experience: `${domain.dropDown[1].value} years ${domain.dropDown[2].value} months `,
                    top_client: domain.dropDown[3].value,
                };
            });
            const data = {
                domains,
                functional_department: this.state.dropDown[0].value,
                experience_recruitment: `${this.state.dropDown[1].value} years ${this.state.dropDown[2].value} months`,
                total_experience: `${this.state.dropDown[3].value} years ${this.state.dropDown[4].value} months`,
                skills: this.state.dropDown[5].value,
                interested_domain: this.state.dropDown[6].value,
            };
            this.props.updateDomainExpertise(data);
        }

        this.setState({
            domains: domainDropDowns,
            dropDown,
        });

        return isValid;
    };

    render() {
        return (
            <DomainExpertiseWrapper>
                {this.state.domains.map((domain, index) => {
                    return (
                        <>
                            <DomainWrapper>
                                <Dropdown
                                    dropdownMenu={domain.dropDown[0]}
                                    handleDropdowntoggle={() => {
                                        this.handleDropdowntoggle(index, 0);
                                    }}
                                    handleDropdownClick={(name) => {
                                        this.handleDropdownClick(
                                            index,
                                            0,
                                            name
                                        );
                                    }}
                                    handleInputValueChange={(event) =>
                                        this.handleInputValueChange(
                                            index,
                                            0,
                                            event
                                        )
                                    }
                                />
                                <div>
                                    {domain.dropDown[1].field.label}
                                    <ExperienceWrapper>
                                        <Years
                                            dropdownMenu={domain.dropDown[1]}
                                            handleDropdowntoggle={() => {
                                                this.handleDropdowntoggle(
                                                    index,
                                                    1
                                                );
                                            }}
                                            handleDropdownClick={(name) => {
                                                this.handleDropdownClick(
                                                    index,
                                                    1,
                                                    name
                                                );
                                            }}
                                        />
                                        <Months
                                            dropdownMenu={domain.dropDown[2]}
                                            handleDropdowntoggle={() => {
                                                this.handleDropdowntoggle(
                                                    index,
                                                    2
                                                );
                                            }}
                                            handleDropdownClick={(name) => {
                                                this.handleDropdownClick(
                                                    index,
                                                    2,
                                                    name
                                                );
                                            }}
                                        />
                                    </ExperienceWrapper>
                                </div>
                                <Dropdown
                                    dropdownMenu={domain.dropDown[3]}
                                    handleDropdowntoggle={() => {
                                        this.handleDropdowntoggle(index, 3);
                                    }}
                                    handleDropdownClick={(name) => {
                                        this.handleDropdownClick(
                                            index,
                                            3,
                                            name
                                        );
                                    }}
                                    handleInputValueChange={(event) =>
                                        this.handleInputValueChange(
                                            index,
                                            3,
                                            event
                                        )
                                    }
                                />
                            </DomainWrapper>
                            <TagWrapper>
                                {domain.dropDown[3].value.map((tag, i, arr) => (
                                    <Tag
                                        key={i}
                                        tag={{ id: index, label: tag }}
                                        length={arr.length}
                                        handleCloseBtnClick={() =>
                                            this.handleTagCloseBtnClick(
                                                index,
                                                i
                                            )
                                        }
                                    />
                                ))}
                            </TagWrapper>
                            <DomainButtonWrapper>
                                {index === this.state.domains.length - 1 ? (
                                    index === 0 ? (
                                        <Button
                                            type="light"
                                            label="Add Domain"
                                            buttonClick={this.handleAddDomain}
                                        />
                                    ) : (
                                        <>
                                            <Button
                                                type="light"
                                                label="Add Domain"
                                                buttonClick={
                                                    this.handleAddDomain
                                                }
                                            />
                                            <Button
                                                type="gery"
                                                label="Cancel"
                                                buttonClick={() =>
                                                    this.handleRemoveDomain(
                                                        index
                                                    )
                                                }
                                            />
                                        </>
                                    )
                                ) : null}
                            </DomainButtonWrapper>
                        </>
                    );
                })}
                <DomainWrapper>
                    <Dropdown
                        dropdownMenu={this.state.dropDown[0]}
                        handleDropdowntoggle={() => {
                            this.handleDropdowntoggleCommon(0);
                        }}
                        handleDropdownClick={(name) => {
                            this.handleDropdownClickCommon(0, name);
                        }}
                        handleInputValueChange={(event) =>
                            this.handleInputValueChangeCommon(0, event)
                        }
                    />
                    <TagWrapper>
                        {this.state.dropDown[0].value.map((tag, i, arr) => (
                            <Tag
                                key={i}
                                tag={{ id: i, label: tag }}
                                length={arr.length}
                                handleCloseBtnClick={() =>
                                    this.handleTagCloseBtnClickCommon(0, i)
                                }
                            />
                        ))}
                    </TagWrapper>
                    <div>
                        {this.state.dropDown[1].field.label}
                        <ExperienceWrapper>
                            <Years
                                dropdownMenu={this.state.dropDown[1]}
                                handleDropdowntoggle={() => {
                                    this.handleDropdowntoggleCommon(1);
                                }}
                                handleDropdownClick={(name) => {
                                    this.handleDropdownClickCommon(1, name);
                                }}
                            />
                            <Months
                                dropdownMenu={this.state.dropDown[2]}
                                handleDropdowntoggle={() => {
                                    this.handleDropdowntoggleCommon(2);
                                }}
                                handleDropdownClick={(name) => {
                                    this.handleDropdownClickCommon(2, name);
                                }}
                            />
                        </ExperienceWrapper>
                    </div>
                    <div>
                        {this.state.dropDown[3].field.label}
                        <ExperienceWrapper>
                            <Years
                                dropdownMenu={this.state.dropDown[3]}
                                handleDropdowntoggle={() => {
                                    this.handleDropdowntoggleCommon(3);
                                }}
                                handleDropdownClick={(name) => {
                                    this.handleDropdownClickCommon(3, name);
                                }}
                            />
                            <Months
                                dropdownMenu={this.state.dropDown[4]}
                                handleDropdowntoggle={() => {
                                    this.handleDropdowntoggleCommon(4);
                                }}
                                handleDropdownClick={(name) => {
                                    this.handleDropdownClickCommon(4, name);
                                }}
                            />
                        </ExperienceWrapper>
                    </div>
                    <Dropdown
                        dropdownMenu={this.state.dropDown[5]}
                        handleDropdowntoggle={() => {
                            this.handleDropdowntoggleCommon(5);
                        }}
                        handleDropdownClick={(name) => {
                            this.handleDropdownClickCommon(5, name);
                        }}
                        handleInputValueChange={(event) =>
                            this.handleInputValueChangeCommon(5, event)
                        }
                    />
                    <TagWrapper>
                        {this.state.dropDown[5].value.map((tag, i, arr) => (
                            <Tag
                                key={i}
                                tag={{ id: i, label: tag }}
                                length={arr.length}
                                handleCloseBtnClick={() =>
                                    this.handleTagCloseBtnClickCommon(5, i)
                                }
                            />
                        ))}
                    </TagWrapper>
                    <Dropdown
                        dropdownMenu={this.state.dropDown[6]}
                        handleDropdowntoggle={() => {
                            this.handleDropdowntoggleCommon(6);
                        }}
                        handleDropdownClick={(name) => {
                            this.handleDropdownClickCommon(6, name);
                        }}
                        handleInputValueChange={(event) =>
                            this.handleInputValueChangeCommon(6, event)
                        }
                    />
                    <TagWrapper>
                        {this.state.dropDown[6].value.map((tag, i, arr) => (
                            <Tag
                                key={i}
                                tag={{ id: i, label: tag }}
                                length={arr.length}
                                handleCloseBtnClick={() =>
                                    this.handleTagCloseBtnClickCommon(6, i)
                                }
                            />
                        ))}
                    </TagWrapper>
                </DomainWrapper>
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
            </DomainExpertiseWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    isDomainExpertiseUpdated: state.recruiter.profile.isDomainExpertiseUpdated,
    top_clients: state.lineupx.top_clients,
});

const mapDispatchToProps = {
    updateDomainExpertise,
    getLineupxClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(DomainExpertise);
