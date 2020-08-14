import React, { Component } from "react";

import {
    UserProfileWrapper,
    LeftAside,
    MainContentWrapper,
    UserImage,
    Label,
    KeyValueWrapper,
    SubContentWrapper,
    TagWrapper,
} from "./style";

import { connect } from "react-redux";
import { getUserInfo } from "../../../Redux/actions/Recruiter/profile";

import JobIcon from "../../../Assets/Icons/Jobs-Icons/Job-Card/Image.svg";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Tab from "../../../Reusuable/Components/Interactive/Tab/Tab";
import About from "../components/About/About";
import Work from "../components/Work/Work";
import Preference from "../components/Preference/Preference";
import EditIcon from "../../../Assets/JobIcons/edit.svg";
import PersonIcon from "../../../Assets/JobIcons/person.svg";
import CancelIcon from "../../../Assets/JobIcons/cancel.svg";
import EarnedIcon from "../../../Assets/JobIcons/job-search-symbol-of-a-man-with-dollar-coin.svg";
import IconLabel from "../../../Reusuable/Components/View/IconLabel/IconLabel";
import panelActionTypes from "../../../Redux/actions/Recruiter/ActionTypes";

class User extends Component {
    state = {
        tabs: [
            {
                id: 1,
                active: true,
                label: "About",
            },
            {
                id: 2,
                active: false,
                label: "Work",
            },
            {
                id: 3,
                active: false,
                label: "Preference",
            },
        ],
    };

    componentDidMount() {
        // super(props);
        if (this.props.user) {
            this.props.getUserInfo();
        }
    }

    handlerTabClick = (id) => {
        let tabs = this.state.tabs.concat();
        tabs.forEach((tab) => {
            tab.active = false;
            if (tab.id === id) tab.active = true;
        });

        this.setState({
            tabs,
        });
    };

    getRightTabContent = () => {
        let tabs = this.state.tabs.concat();
        let currentContent;
        tabs.forEach((tab) => {
            if (tab.active === true) {
                if (tab.id === 1)
                    currentContent = <About user={this.props.user} />;
                if (tab.id === 2)
                    currentContent = <Work user={this.props.user} />;
                if (tab.id === 3)
                    currentContent = <Preference user={this.props.user} />;
            }
        });
        return currentContent;
    };

    handleEditClick = () => {
        this.state.tabs.forEach((tab) => {
            if (tab.active) {
                if (tab.id === 1) {
                    this.props.personalInfoFail();
                }
                if (tab.id === 2) {
                    this.props.domainExpertiseFail();
                }
                if (tab.id === 3) {
                    this.props.additionalInfoFail();
                }
            }
        });
        this.props.history.push("/recruiter/profile");
    };

    render() {
        const { user } = this.props;
        if (!user) return <></>;
        return (
            <UserProfileWrapper>
                <LeftAside>
                    <UserImage src={user.profile_url || PersonIcon} />
                    <ProgressBar
                        badge={JobIcon}
                        from="3"
                        to="4"
                        completed="25"
                    />
                    <br />
                    <Label grey>Stats</Label>
                    <hr />
                    <br />
                    <KeyValueWrapper>
                        <IconLabel
                            small
                            icon={CancelIcon}
                            label={"Job Closed"}
                        />
                        <Label small>{"200"}</Label>
                    </KeyValueWrapper>
                    <KeyValueWrapper style={{ marginBottom: "0" }}>
                        <IconLabel small icon={EarnedIcon} label={"Earned"} />
                        <Label small>{"$20K"}</Label>
                    </KeyValueWrapper>
                    {user && user.skills ? (
                        <>
                            <Label grey>Skills</Label>
                            <hr />
                            <Label small bold>
                                {[user.skills].join(" ")}
                            </Label>
                        </>
                    ) : null}
                </LeftAside>
                <MainContentWrapper>
                    <Label heading title bold>
                        {user.name}
                    </Label>
                    <SubContentWrapper>
                        <Label heading>Freelance Recruiter</Label>
                        <Label title grey>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Accusamus incidunt, blanditiis et asperiores
                            iusto impedit dolorem debitis ullam deserunt nobis.
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Aliquid aperiam asperiores rem amet magni
                            accusamus, molestiae obcaecati sed minus quod. Lorem
                            ipsum dolor, sit amet consectetur adipisicing elit.
                            At debitis incidunt ipsum iure accusamus? Ullam qui
                            voluptas nulla harum quaerat consectetur facilis
                            aspernatur sint? Id facilis magni voluptatum
                            temporibus! Nostrum?
                        </Label>
                    </SubContentWrapper>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <TagWrapper>
                            {this.state.tabs.map((tab) => (
                                <Tab
                                    normal
                                    tabClick={() =>
                                        this.handlerTabClick(tab.id)
                                    }
                                    active={tab.active}
                                    label={tab.label}
                                />
                            ))}
                        </TagWrapper>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={this.handleEditClick}
                        >
                            <IconLabel icon={EditIcon} />
                        </div>
                    </div>
                    {this.getRightTabContent()}
                </MainContentWrapper>
            </UserProfileWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.auth.user,
    profileUpdated: state.recruiter.profile.profileUpdated,
});

const mapDispatchToProps = {
    getUserInfo,
    personalInfoFail: () => (dispatch) =>
        dispatch({ type: panelActionTypes.PERSONAL_INFO_FAIL }),
    domainExpertiseFail: () => (dispatch) =>
        dispatch({ type: panelActionTypes.DOMAIN_FAIL }),
    additionalInfoFail: () => (dispatch) =>
        dispatch({ type: panelActionTypes.ADDITIONAL_INFO_FAIL }),
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
