import React, { Component } from "react";
import "./login-signup-modal.css";

import { Route, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    recruiterSignUp,
    clientSignUp,
    googleConnect,
    login,
    forgotPassword,
} from "../../Redux/actions/auth/authActions";
import { clearErrors } from "../../Redux/actions/auth/errorActions";

import PlacesAutocomplete from "react-places-autocomplete";

import TextField from "../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import TextBtn from "../../Reusuable/Components/Interactive/button-new/text-btn";
import Tabmenu from "../../Reusuable/Components/Interactive/inputs/tab-menu/tab-menu";
import Checkbox from "../../Reusuable/Components/Interactive/inputs/check-box/checkbox";

import showIcon from "../../Assets/Images/show-icon.png";
import hideIcon from "../../Assets/Images/hide-icon.png";
import linkedinIcon from "../../Assets/Images/linkedin-logo-icon.png";
import googleIcon from "../../Assets/Images/google-logo-icon.png";
import mailIcon from "../../Assets/Images/mail-icon.png";
import Notification from "../Components/Notification/Notification";
// import Alert from "../alert/alert";
import arrowDownIcon from "../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import Dropdown from "../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import {
    LocationDropdownWrapper,
    Location,
} from "../../Recruiter/Profile/Container/PersonalInformation/style";

class RegisterModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textfield: [
                {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "email",
                    label: "Email Address",
                    placeholder: "johnsmith@company.com",
                    value: "",
                    readOnly: false,
                },
                {
                    id: 2,
                    inputType: "password",
                    state: "normal",
                    name: "password",
                    label: "Password",
                    placeholder: "••••••••",
                    value: "",
                    imgBtn: hideIcon,
                    readOnly: false,
                    tipsbox: {
                        type: "checklist",
                        title: "Password must have:",
                        state: false,
                        checklist: [
                            {
                                id: 1,
                                label: "at least 8 characters.",
                                state: null,
                            },
                            {
                                id: 2,
                                label: "at least one uppercase letter.",
                                state: null,
                            },
                            {
                                id: 3,
                                label: "at least one lowercase letter.",
                                state: null,
                            },
                            {
                                id: 4,
                                label: "at least one special character.",
                                state: null,
                            },
                            {
                                id: 5,
                                label: "at least one number.",
                                state: null,
                            },
                        ],
                    },
                },
                {
                    id: 3,
                    inputType: "text",
                    state: "normal",
                    name: "full name",
                    label: "Full Name",
                    placeholder: "John Doe",
                    value: "",
                    readOnly: false,
                },
                {
                    id: 3,
                    inputType: "text",
                    state: "normal",
                    name: "company name",
                    label: "Company Name",
                    placeholder: "Lineupx",
                    value: "",
                    readOnly: false,
                },
                {
                    id: 4,
                    inputType: "text",
                    state: "normal",
                    name: "designation",
                    label: "Designation",
                    placeholder: "Human Resources",
                    value: "",
                    readOnly: false,
                },
                {
                    id: 5,
                    inputType: "text",
                    state: "normal",
                    name: "phone",
                    label: "Contact Number",
                    placeholder: "9786587475",
                    value: "",
                    readOnly: false,
                },
            ],
            dropdowns: [
                {
                    toggle: false,
                    field: {
                        id: 2,
                        inputType: "text",
                        state: "normal",
                        name: "company type",
                        label: "Company Type",
                        placeholder: "Select Domain",
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
                {
                    toggle: false,
                    field: {
                        id: 2,
                        inputType: "text",
                        state: "normal",
                        name: "employee count",
                        label: "Employee Count",
                        placeholder: "Select Range",
                        value: "",
                        readOnly: true,
                        imgBtn: arrowDownIcon,
                    },
                    dropdown: [
                        { id: 1, name: "5-9", state: "not selected" },
                        { id: 2, name: "10-49", state: "not selected" },
                        { id: 3, name: "50-99", state: "not selected" },
                        { id: 4, name: "100-499", state: "not selected" },
                        { id: 5, name: "1000+", state: "not selected" },
                    ],
                    value: "",
                },
                {
                    toggle: false,
                    field: {
                        id: 3,
                        inputType: "text",
                        state: "normal",
                        name: "sources of reference",
                        label: "Sources of Reference",
                        placeholder: "Select Source",
                        value: "",
                        readOnly: true,
                        imgBtn: arrowDownIcon,
                    },
                    dropdown: [
                        { id: 1, name: "Vendor", state: "not selected" },
                        { id: 2, name: "Friends", state: "not selected" },
                        {
                            id: 3,
                            name: "Direct Calling",
                            state: "not selected",
                        },
                        { id: 4, name: "Old Client", state: "not selected" },
                        { id: 5, name: "Others", state: "not selected" },
                    ],
                    value: "",
                },
            ],
            tabmenu: {
                id: 1,
                label: "",
                tabs: [
                    { id: 1, name: "Client", state: "selected" },
                    { id: 2, name: "Recruiter", state: "unselected" },
                    { id: 3, name: "Employee", state: "unselected" },
                ],
                selectedTab: "Client",
                state: "normal",
            },
            checkbox: {
                id: 1,
                name: "terms & condition",
                checkState: false,
                state: "normal",
            },
            button: {
                id: 1,
                style: "contained",
                name: "Register",
                text: "Register",
                readOnly: false,
            },
            currentSection: "",
            notification: {
                active: false,
                title: "",
                message: "",
                type: "",
            },
            isForgotPassSuccess: false,
            newUser: true,
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
        };
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        recruiterSignUp: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    };

    UNSAFE_componentWillMount = () => {
        let currentSection = this.state.currentSection;
        let state = this.state;
        let { location } = this.props;

        if (location.pathname === "/auth/login") {
            currentSection = "get started sign-in";
        } else if (location.pathname === "/auth/register") {
            currentSection = "get started sign-up";
        } else if (location.pathname === "/auth/login/email") {
            currentSection = "sign-in";
            state.currentSection = "sign-in";
            state.textfield[0].placeholder = "Enter your email address";
            state.textfield[0].value = "";
            state.textfield[0].hint = undefined;
            state.textfield[1].tipsbox = undefined;
            state.textfield[1].value = "";
            state.button.text = "Sign in";
        } else if (location.pathname === "/auth/register/email") {
            currentSection = "sign up";
            state.textfield[0].placeholder = "johnsmith@company.com";
            state.textfield[0].hint = "This must be your work email address.";
            state.textfield[1].tipsbox = {
                type: "checklist",
                title: "Password must have:",
                state: false,
                checklist: [
                    { id: 1, label: "at least 8 characters.", state: null },
                    {
                        id: 2,
                        label: "at least one uppercase letter.",
                        state: null,
                    },
                    {
                        id: 3,
                        label: "at least one lowercase letter.",
                        state: null,
                    },
                    {
                        id: 4,
                        label: "at least one special character.",
                        state: null,
                    },
                    { id: 5, label: "at least one number.", state: null },
                ],
            };

            state.button.text = "Register";
        } else if (location.pathname === "/auth/forgotpassword") {
            state.currentSection = "forgot-password";
            state.textfield[0].placeholder = "Enter your email address";
            state.textfield[0].value = "";
            state.textfield[0].hint = undefined;
            state.textfield[1].tipsbox = undefined;
            state.textfield[1].value = "";
            state.button.text = "Continue";
        }
        this.setState({
            currentSection,
        });
    };

    componentDidUpdate(prevProps, prevState) {
        const { error, isAuthenticated, user } = this.props;

        if (this.props.isForgotPassSuccess && !this.state.isForgotPassSuccess) {
            this.showNotification(
                "Reset Password Success",
                "Please check your mail.",
                "Success"
            );
            this.setState({ isForgotPassSuccess: true });
        }

        if (isAuthenticated) {
            if (user) {
                if (user.isVerified)
                    this.props.history.replace(`/${user.account_type}/profile`);
            } else {
                if (
                    this.state.newUser &&
                    !(this.state.currentSection === "sign-in")
                ) {
                    let state = this.state;
                    state.textfield[0].placeholder = "Enter your email address";
                    state.textfield[0].value = "";
                    state.textfield[0].hint = undefined;
                    state.textfield[1].tipsbox = undefined;
                    state.textfield[1].value = "";
                    state.button.text = "Sign in";
                    this.setState({
                        currentSection: "sign-in",
                        newUser: false,
                    });
                    this.showNotification(
                        "Registered Successfully",
                        "Please check your mail for verification",
                        "Success"
                    );
                    this.props.history.push("/auth/login/email");
                }
            }
        }
        if (error !== prevProps.error) {
            if (error.id === "REGISTER_FAIL") {
                let textfield = this.state.textfield;
                textfield[0].state = "error";
                textfield[0].hint =
                    "Please provide another work email address as it already used by a account.";
                this.setState({ textfield });
            }
            if (error.id === "LOGIN_FAIL") {
                if (error.message === "INVALID_CREDENTIALS") {
                    let textfield = this.state.textfield;
                    textfield[0].state = "error";
                    textfield[0].hint = "Invalid Credentials.";
                    textfield[1].state = "error";
                    textfield[1].hint = "Invalid Credentials.";
                    this.setState({ textfield });
                } else if (error.message === "VERIFY_FAIL") {
                    this.showNotification(
                        "Verify Your Email",
                        "Please check your mail for verification.",
                        "Warning"
                    );
                }
            }
            if (error.id === "FORGOT_PASS_FAIL") {
                let textfield = this.state.textfield;
                textfield[0].state = "error";
                textfield[0].hint =
                    "Please provide another work email address as it already used by a account.";
                this.setState({ textfield });
            }
        }

        if (prevState.currentSection !== this.state.currentSection) {
            let currentSection;
            if (this.state.currentSection === "get started sign-in") {
                this.props.history.replace("/auth/login");
            }
            if (this.state.currentSection === "get started sign-up") {
                this.props.history.replace("/auth/register");
            }
            if (this.state.currentSection === "sign-in") {
                this.props.history.replace("/auth/login/email");
            }
            if (this.state.currentSection === "sign up") {
                this.props.history.replace("/auth/register/email");
            }
            if (this.state.currentSection === "forgot-password") {
                this.props.history.replace("/auth/forgotpassword");
            }
        }
    }

    showNotification = (title, message, type) => {
        let notification = { ...this.state.notification };
        notification.active = true;
        notification.message = message;
        notification.title = title;
        notification.type = type;

        this.setState({ notification });
    };

    hideNotification = () => {
        let notification = { ...this.state.notification };
        notification.active = false;
        notification.message = "";
        notification.title = "";
        notification.type = "";
        this.setState({ notification });
    };

    toggleInputTipsbox = (event) => {
        event.preventDefault();

        let textfield = this.state.textfield;
        textfield.map((field) => {
            if (field.name === event.target.name) {
                if (field.tipsbox.state === null) {
                    field.tipsbox.state = true;
                } else {
                    field.tipsbox.state = field.tipsbox.state ? false : true;
                }
            }
            return field;
        });

        this.setState({
            textfield,
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

    handlePasswordTextToggle = () => {
        let textfield = this.state.textfield;

        if (textfield[1].inputType === "password") {
            textfield[1].inputType = "text";
            textfield[1].imgBtn = showIcon;
        } else {
            textfield[1].inputType = "password";
            textfield[1].imgBtn = hideIcon;
        }

        this.setState({ textfield });
    };

    handleTabClick = (tabname) => {
        let tabmenu = this.state.tabmenu;
        tabmenu.tabs.map((tab) => {
            if (tab.name === tabname) {
                tab.state = "selected";
                tabmenu.selectedTab = tab.name;
            } else {
                tab.state = "unselected";
            }

            return tab;
        });
        this.setState({
            tabmenu,
        });
    };

    handleCheckboxValueChange = () => {
        let checkbox = this.state.checkbox;
        checkbox.checkState = checkbox.checkState ? false : true;
        this.setState({
            checkbox,
        });
    };

    isFormValid = (event) => {
        event.preventDefault();
        this.props.clearErrors();

        let textfield = this.state.textfield;
        let isValid = true;

        if (this.state.currentSection === "sign up") {
            let checkbox = this.state.checkbox;

            if (!checkbox.checkState) {
                checkbox.state = "error";
                isValid = false;
            } else {
                checkbox.state = "normal";
            }

            this.setState({
                checkbox,
            });

            if (isValid) {
                const email = textfield[0].value;
                const password = textfield[1].value;
                const confirm_password = textfield[1].value;
                const account_type = this.state.tabmenu.selectedTab;
                if (account_type === "Client") {
                    const clientData = {
                        email,
                        password,
                        confirm_password,
                        account_type,
                        company_type: this.state.dropdowns[0].value,
                        company_name: textfield[3].value,
                        full_name: textfield[2].value,
                        designation: textfield[4].value,
                        employee_count: this.state.dropdowns[1].value,
                        contact_number: this.state.textfield[5].value,
                        source_of_reference: this.state.dropdowns[2].value,
                        location: this.state.location.value,
                    };
                    this.props.clientSignUp(clientData);
                } else if (account_type === "Recruiter") {
                    const recruiterData = {
                        email,
                        password,
                        confirm_password,
                        account_type,
                    };
                    this.props.recruiterSignUp(recruiterData);
                }
            }
        } else if (this.state.currentSection === "sign-in") {
            textfield.map((field) => {
                this.handleFieldValidation(field.name);
                if (field.state === "error") {
                    isValid = false;
                }
                return field;
            });
            const email = textfield[0].value;
            const password = textfield[1].value;
            let account_type = this.state.tabmenu.selectedTab;

            //login user
            const user = {
                email,
                password,
                account_type,
            };

            this.props.login(user);
            // this.props.history.replace("/recruiter/profile");
        } else if (this.state.currentSection === "forgot-password") {
            let field = textfield[0];
            this.handleFieldValidation(field.name);
            if (field.state === "error") {
                isValid = false;
            }

            const email = textfield[0].value;

            //login user
            const user = {
                email,
            };
            this.props.forgotPassword(user);
        }

        return isValid;
    };

    handleRightSectionChanges = (event) => {
        event.preventDefault();
        const state = { ...this.state };

        if (event.target.name === "get started sign-up") {
            state.currentSection = "get started sign-up";
            this.props.history.push("/auth/register");
        } else if (event.target.name === "get started sign-in") {
            state.currentSection = "get started sign-in";
            this.props.history.push("/auth/login");
        } else if (event.target.name === "sign up") {
            state.currentSection = "sign up";
            state.tabmenu.label = "";
            state.textfield[0].placeholder = "johnsmith@company.com";
            state.textfield[0].hint = "This must be your work email address.";
            state.textfield[1].tipsbox = {
                type: "checklist",
                title: "Password must have:",
                state: false,
                checklist: [
                    { id: 1, label: "at least 8 characters.", state: null },
                    {
                        id: 2,
                        label: "at least one uppercase letter.",
                        state: null,
                    },
                    {
                        id: 3,
                        label: "at least one lowercase letter.",
                        state: null,
                    },
                    {
                        id: 4,
                        label: "at least one special character.",
                        state: null,
                    },
                    { id: 5, label: "at least one number.", state: null },
                ],
            };

            state.button.text = "Register";
            this.props.history.push("/auth/register/email");
        } else if (event.target.name === "sign in") {
            state.currentSection = "sign-in";
            state.textfield[0].placeholder = "Enter your email address";
            state.textfield[0].value = "";
            state.textfield[0].hint = undefined;
            state.textfield[0].state = "normal";
            state.textfield[1].state = "normal";
            state.textfield[1].tipsbox = undefined;
            state.textfield[1].value = "";
            state.tabmenu.label = "Account Type";
            state.button.text = "Sign in";
            this.props.history.push("/auth/login/email");
        } else if (event.target.name === "forgot-password") {
            state.currentSection = "forgot-password";
            state.textfield[0].placeholder = "Enter your email address";
            state.textfield[0].value = "";
            state.textfield[0].state = "normal";
            state.textfield[1].state = "normal";
            state.textfield[0].hint = undefined;
            state.textfield[1].tipsbox = undefined;
            state.textfield[1].value = "";
            state.button.text = "Continue";
            this.props.history.push("/auth/forgotpassword");
        }

        this.setState({ ...state });
    };

    handleDropdownClick = (index, clickDropdown) => {
        let dropdowns = this.state.dropdowns;
        let dropdownMenu = dropdowns[index];
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

        this.setState({
            dropdowns,
        });

        const scope = this;
        setTimeout(() => {
            scope.handleDropdowntoggle(index);
        }, 150);
    };

    handleDropdowntoggle = (index) => {
        let dropdowns = this.state.dropdowns;
        let dropdownMenu = dropdowns[index];
        dropdownMenu.toggle = !dropdownMenu.toggle;

        this.setState({
            dropdowns,
        });
    };

    render() {
        return (
            <>
                {this.state.notification.active ? (
                    <Notification
                        closeClick={this.hideNotification}
                        type={this.state.notification.type}
                        msg={this.state.notification.message}
                        title={this.state.notification.title}
                    />
                ) : null}
                <div className="modal-container">
                    <div
                        className="modal-background"
                        onClick={() => this.props.handleModalToggle("Register")}
                    />
                    <div className="modal">
                        <div className="left-section">
                            <img src="" alt="" />
                        </div>
                        <div className="right-section">
                            <Route
                                exact
                                path="/auth/register"
                                render={() => (
                                    <div className="get-started-section">
                                        {/* <div className="blank-space-approx-4rem" /> */}
                                        <h3 className="title">Join us</h3>
                                        <h4 className="sub-title">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Ut
                                            nulla erat, iaculis vel justo eget,
                                            dictum accumsan elit. Vivamus
                                            suscipit vitae velit sollicitudin
                                            varius.
                                        </h4>
                                        <div className="content-section">
                                            <div className="btn-stack">
                                                <a href="/auth/google">
                                                    <button
                                                        onClick={() => {
                                                            // this.props.history.push('/auth/google')
                                                            // this.props.googleConnect();
                                                        }}
                                                        className="btn"
                                                    >
                                                        <img
                                                            src={googleIcon}
                                                            alt=""
                                                        />
                                                        Sign up with Google
                                                    </button>
                                                </a>
                                                <button className="btn">
                                                    <img
                                                        src={linkedinIcon}
                                                        alt=""
                                                    />
                                                    Sign up with Linkedin
                                                </button>
                                                <div className="or-line">
                                                    Or
                                                </div>
                                                <button
                                                    className="btn"
                                                    name="sign up"
                                                    onClick={
                                                        this
                                                            .handleRightSectionChanges
                                                    }
                                                >
                                                    <img
                                                        src={mailIcon}
                                                        alt=""
                                                    />
                                                    Sign up with Email
                                                </button>
                                            </div>
                                            <div className="outline-btn-holder">
                                                Already have an account?
                                                <button
                                                    name="get started sign-in"
                                                    className="outline-btn"
                                                    onClick={
                                                        this
                                                            .handleRightSectionChanges
                                                    }
                                                >
                                                    Sign in
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                            <Route
                                exact
                                path="/auth/login"
                                render={() => (
                                    <div className="get-started-section">
                                        <div className="content-section">
                                            {/* <div className="blank-space-approx-4rem" /> */}
                                            <h3 className="title">
                                                Welcome back.
                                            </h3>
                                            <h4 className="sub-title">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit. Ut
                                                nulla erat, iaculis vel justo
                                                eget, dictum accumsan elit.
                                                Vivamus suscipit vitae velit
                                                sollicitudin varius.
                                            </h4>
                                            <div className="content-section">
                                                <div className="btn-stack">
                                                    <button className="btn">
                                                        <img
                                                            src={googleIcon}
                                                            alt=""
                                                        />
                                                        Continue with Google
                                                    </button>
                                                    <button className="btn">
                                                        <img
                                                            src={linkedinIcon}
                                                            alt=""
                                                        />
                                                        Continue with Linkedin
                                                    </button>
                                                    <div className="or-line">
                                                        Or
                                                    </div>
                                                    <button
                                                        className="btn"
                                                        name="sign in"
                                                        onClick={
                                                            this
                                                                .handleRightSectionChanges
                                                        }
                                                    >
                                                        <img
                                                            src={mailIcon}
                                                            alt=""
                                                        />
                                                        Continue with Email
                                                    </button>
                                                </div>
                                                <div className="outline-btn-holder">
                                                    Don't have an account?
                                                    <button
                                                        name="get started sign-up"
                                                        className="outline-btn"
                                                        onClick={
                                                            this
                                                                .handleRightSectionChanges
                                                        }
                                                    >
                                                        Sign up
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                            <Route
                                path="/auth/register/email"
                                render={() => (
                                    <div className="get-started-section">
                                        <div className="content-section">
                                            <button
                                                className="back-btn"
                                                onClick={() => {
                                                    this.setState({
                                                        currentSection:
                                                            "get started sign-up",
                                                    });
                                                    this.props.history.goBack();
                                                }}
                                            >
                                                Back
                                            </button>
                                            <h3 className="title">Register</h3>
                                            <Tabmenu
                                                tabmenu={this.state.tabmenu}
                                                handleTabClick={
                                                    this.handleTabClick
                                                }
                                            />
                                            <form>
                                                {this.state.tabmenu
                                                    .selectedTab ===
                                                "Client" ? (
                                                    <>
                                                        {this.state.textfield.map(
                                                            (field) => (
                                                                <TextField
                                                                    textfield={
                                                                        field
                                                                    }
                                                                    key={
                                                                        field.id
                                                                    }
                                                                    handleInputValueChange={
                                                                        this
                                                                            .handleInputValueChange
                                                                    }
                                                                    handleFieldBtnClick={
                                                                        this
                                                                            .handlePasswordTextToggle
                                                                    }
                                                                    toggleInputTipsbox={
                                                                        this
                                                                            .toggleInputTipsbox
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                        <PlacesAutocomplete
                                                            value={
                                                                this.state
                                                                    .location
                                                                    .value
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleInputValueChangeLocation
                                                            }
                                                            onSelect={
                                                                this
                                                                    .handleInputValueChangeLocation
                                                            }
                                                        >
                                                            {({
                                                                getInputProps,
                                                                suggestions,
                                                                getSuggestionItemProps,
                                                                loading,
                                                            }) => (
                                                                <div>
                                                                    <TextField
                                                                        textfield={
                                                                            this
                                                                                .state
                                                                                .location
                                                                        }
                                                                        handleInputValueChange={
                                                                            this
                                                                                .handleInputValueChangeLocation
                                                                        }
                                                                        config={{
                                                                            ...getInputProps(
                                                                                {
                                                                                    placeholder:
                                                                                        "Search Location",
                                                                                }
                                                                            ),
                                                                        }}
                                                                    />
                                                                    <LocationDropdownWrapper>
                                                                        {loading ? (
                                                                            <Location>
                                                                                Loading...
                                                                            </Location>
                                                                        ) : null}
                                                                        {suggestions.map(
                                                                            (
                                                                                suggestion,
                                                                                i
                                                                            ) => {
                                                                                return (
                                                                                    <Location
                                                                                        {...getSuggestionItemProps(
                                                                                            suggestion
                                                                                        )}
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                        active={
                                                                                            suggestion.active
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            suggestion.description
                                                                                        }
                                                                                    </Location>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </LocationDropdownWrapper>
                                                                </div>
                                                            )}
                                                        </PlacesAutocomplete>
                                                        {this.state.dropdowns.map(
                                                            (
                                                                dropdown,
                                                                index
                                                            ) => (
                                                                <Dropdown
                                                                    dropdownMenu={
                                                                        dropdown
                                                                    }
                                                                    handleDropdowntoggle={() => {
                                                                        this.handleDropdowntoggle(
                                                                            index
                                                                        );
                                                                    }}
                                                                    handleDropdownClick={(
                                                                        name
                                                                    ) => {
                                                                        this.handleDropdownClick(
                                                                            index,
                                                                            name
                                                                        );
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <TextField
                                                            textfield={
                                                                this.state
                                                                    .textfield[0]
                                                            }
                                                            key={
                                                                this.state
                                                                    .textfield[0]
                                                                    .id
                                                            }
                                                            handleInputValueChange={
                                                                this
                                                                    .handleInputValueChange
                                                            }
                                                            handleFieldBtnClick={
                                                                this
                                                                    .handlePasswordTextToggle
                                                            }
                                                            toggleInputTipsbox={
                                                                this
                                                                    .toggleInputTipsbox
                                                            }
                                                        />
                                                        <TextField
                                                            textfield={
                                                                this.state
                                                                    .textfield[1]
                                                            }
                                                            key={
                                                                this.state
                                                                    .textfield[1]
                                                                    .id
                                                            }
                                                            handleInputValueChange={
                                                                this
                                                                    .handleInputValueChange
                                                            }
                                                            handleFieldBtnClick={
                                                                this
                                                                    .handlePasswordTextToggle
                                                            }
                                                            toggleInputTipsbox={
                                                                this
                                                                    .toggleInputTipsbox
                                                            }
                                                        />
                                                    </>
                                                )}

                                                <div className="checkbox-holder">
                                                    <Checkbox
                                                        checkbox={
                                                            this.state.checkbox
                                                        }
                                                        handleCheckboxValueChange={
                                                            this
                                                                .handleCheckboxValueChange
                                                        }
                                                    >
                                                        I have read &amp; agree
                                                        to{" "}
                                                        <a href="/">
                                                            Terms &amp;
                                                            Conditions
                                                        </a>
                                                    </Checkbox>
                                                </div>
                                                <TextBtn
                                                    button={this.state.button}
                                                    handleBtnClick={
                                                        this.isFormValid
                                                    }
                                                />
                                            </form>
                                            <div className="outline-btn-holder">
                                                Already have an account?
                                                <button
                                                    name="get started sign-in"
                                                    className="outline-btn"
                                                    onClick={
                                                        this
                                                            .handleRightSectionChanges
                                                    }
                                                >
                                                    Sign in
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                            <Route
                                path="/auth/login/email"
                                render={() => (
                                    <div className="get-started-section">
                                        <div className="content-section">
                                            {/* <div className="blank-space-approx-4rem" /> */}
                                            <button
                                                className="back-btn"
                                                onClick={() => {
                                                    this.props.history.goBack();
                                                    this.setState({
                                                        currentSection:
                                                            "get started sign-in",
                                                    });
                                                }}
                                            >
                                                Back
                                            </button>
                                            <h3 className="title">Sign in</h3>
                                            <form>
                                                <TextField
                                                    textfield={
                                                        this.state.textfield[0]
                                                    }
                                                    key={
                                                        this.state.textfield[0]
                                                            .id
                                                    }
                                                    handleInputValueChange={
                                                        this
                                                            .handleInputValueChange
                                                    }
                                                    handleFieldBtnClick={
                                                        this
                                                            .handlePasswordTextToggle
                                                    }
                                                    toggleInputTipsbox={
                                                        this.toggleInputTipsbox
                                                    }
                                                />
                                                <TextField
                                                    textfield={
                                                        this.state.textfield[1]
                                                    }
                                                    key={
                                                        this.state.textfield[1]
                                                            .id
                                                    }
                                                    handleInputValueChange={
                                                        this
                                                            .handleInputValueChange
                                                    }
                                                    handleFieldBtnClick={
                                                        this
                                                            .handlePasswordTextToggle
                                                    }
                                                    toggleInputTipsbox={
                                                        this.toggleInputTipsbox
                                                    }
                                                />
                                                <Tabmenu
                                                    tabmenu={this.state.tabmenu}
                                                    handleTabClick={
                                                        this.handleTabClick
                                                    }
                                                />
                                                <TextBtn
                                                    button={this.state.button}
                                                    handleBtnClick={
                                                        this.isFormValid
                                                    }
                                                />
                                            </form>

                                            <div className="outline-btn-holder">
                                                <button
                                                    name="forgot-password"
                                                    className="outline-btn"
                                                    onClick={
                                                        this
                                                            .handleRightSectionChanges
                                                    }
                                                >
                                                    Forgot password ?
                                                </button>
                                            </div>

                                            <div className="outline-btn-holder">
                                                Don't have an account?
                                                <button
                                                    name="get started sign-up"
                                                    className="outline-btn"
                                                    onClick={
                                                        this
                                                            .handleRightSectionChanges
                                                    }
                                                >
                                                    Sign up
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                            <Route
                                path="/auth/forgotpassword"
                                render={() => (
                                    <div className="get-started-section">
                                        <div className="content-section">
                                            {/* <div className="blank-space-approx-4rem" /> */}
                                            <button
                                                className="back-btn"
                                                onClick={() => {
                                                    this.props.history.goBack();
                                                    this.setState({
                                                        currentSection:
                                                            "sign-in",
                                                    });
                                                }}
                                            >
                                                Back
                                            </button>
                                            <h3 className="title">
                                                Forgot Password
                                            </h3>
                                            <form>
                                                <TextField
                                                    textfield={
                                                        this.state.textfield[0]
                                                    }
                                                    key={
                                                        this.state.textfield[0]
                                                            .id
                                                    }
                                                    handleInputValueChange={
                                                        this
                                                            .handleInputValueChange
                                                    }
                                                    handleFieldBtnClick={
                                                        this
                                                            .handlePasswordTextToggle
                                                    }
                                                    toggleInputTipsbox={
                                                        this.toggleInputTipsbox
                                                    }
                                                />
                                                <TextBtn
                                                    button={this.state.button}
                                                    handleBtnClick={
                                                        this.isFormValid
                                                    }
                                                />
                                            </form>
                                            <div className="outline-btn-holder">
                                                Don't have an account?
                                                <button
                                                    name="get started sign-up"
                                                    className="outline-btn"
                                                    onClick={
                                                        this
                                                            .handleRightSectionChanges
                                                    }
                                                >
                                                    Sign up
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.auth.isAuthenticated,
    user: state.auth.auth.user,
    error: state.auth.error,
    isForgotPassSuccess: state.auth.auth.isForgotPassSuccess,
});

export default connect(mapStateToProps, {
    googleConnect,
    recruiterSignUp,
    clientSignUp,
    clearErrors,
    login,
    forgotPassword,
})(withRouter(RegisterModal));
