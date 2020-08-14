import React, { useEffect, useRef } from "react";

import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../Redux/actions/auth/authActions";
import { changePassword } from "../Redux/actions/Recruiter/profile";
import { getLineupxFAQ } from "../Redux/actions/lineupx/action";
import ActionTypes from "../Redux/actions/Client/ActionTypes";

import classes from "./index.module.css";

import CandidateIcon from "../Assets/Icons/AppDrawer-Icon/candidate icon.svg";
import HomeIcon from "../Assets/Icons/AppDrawer-Icon/home icon.svg";
import Icon from "../Assets/Icons/AppDrawer-Icon/icon.svg";

import Navbar from "../Reusuable/Container/NavigationBar/Navbar";
import AppDrawer from "../Reusuable/Container/AppDrawer/AppDrawer";
import { useState } from "react";
import ChangePassword from "../Reusuable/Container/ChangePassword/ChangePassword";
import SecondarySideBar from "../Reusuable/Container/SecondarySideBar/SecondarySideBar";
import Dashboard from "./Dashboard/Container/Index/Index";
import Jobs from "./Jobs/AllJobs/Container/Index.js";
import Profile from "./Profile/Container/index";
import NewJob from "./NewJob/Container/index";
import Settings from "./Settings/index";

import DashboardIcon from "../Assets/JobIcons/dashboard.svg";
import ScheduleIcon from "../Assets/JobIcons/interview.svg";
import JobIcon from "../Assets/JobIcons/work.svg";
import GearIcon from "../Assets/JobIcons/settings.svg";
import HumanResources from "../Assets/JobIcons/human-resources.png";
import Index from "./Candidates/AllCandidates/Container";
import JobCandidate from "./Candidates/JobCandidates/Container/JobCandidate";
import SchedulesMonth from "./InterviewSchedule/SchedulesMonth/SchedulesMonth";

function App(props) {
    const navigationItems = [
        {
            name: "Navigation",
            routes: [
                {
                    id: 1,
                    active: true,
                    label: "Dashboard",
                    activeIcon: HomeIcon,
                    inactiveIcon: HomeIcon,
                    route: "/client",
                    exact: true,
                },
                {
                    id: 2,
                    active: false,
                    label: "Jobs",
                    activeIcon: JobIcon,
                    inactiveIcon: JobIcon,
                    route: "/client/alljobs/",
                },
                {
                    id: 3,
                    active: false,
                    label: "Candidates",
                    activeIcon: CandidateIcon,
                    inactiveIcon: CandidateIcon,
                    route: "/client/candidates",
                },
            ],
        },
        {
            name: "Support",
            routes: [
                {
                    id: 4,
                    active: false,
                    label: "Help Desk",
                    activeIcon: Icon,
                    inactiveIcon: Icon,
                    route: "/support",
                },
                {
                    id: 5,
                    active: false,
                    label: "Tutorials",
                    activeIcon: Icon,
                    inactiveIcon: Icon,
                    route: "/tutorials",
                },
                {
                    id: 6,
                    active: false,
                    label: "Feedback",
                    activeIcon: Icon,
                    inactiveIcon: Icon,
                    route: "/feedback",
                },
            ],
        },
    ];

    const secondarySideBar = [
        {
            id: 1,
            icon: DashboardIcon,
            active: false,
            label: "Dashboard",
            route: "/client",
        },
        {
            id: 2,
            icon: JobIcon,
            active: false,
            label: "Jobs",
            route: "/client/alljobs/openjob",
        },
        {
            id: 3,
            icon: HumanResources,
            active: false,
            label: "Candidates",
            route: "/client/candidates",
        },
        {
            id: 4,
            icon: ScheduleIcon,
            active: false,
            label: "Scheduler",
            route: "/client/interview",
        },
        {
            id: 5,
            icon: GearIcon,
            active: false,
            label: "Gear",
            route: "/client/settings",
        },
    ];

    const [sideBar, setsideBar] = useState(secondarySideBar);
    const sideBarUpdate = (id, value) => {
        sideBar[id - 1].active = value;
        setsideBar(JSON.parse(JSON.stringify(sideBar)));
    };
    const handleSideBarClick = (id) => {
        if (sideBar[id - 1].route !== props.location.pathname)
            props.history.push(sideBar[id - 1].route);
    };
    const [toggleNavBar, setToggleNavBar] = useState(false);

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };
    const prevUser = usePrevious({ user: props.user });
    useEffect(() => {
        if (
            props?.user &&
            JSON.stringify(prevUser?.user) !== JSON.stringify(props.user)
        ) {
            if (
                props.user.is_companyInfo_updated &&
                props.user.is_aboutCompany_updated &&
                props.user.is_billingInformation_updated
            ) {
                props.history.replace("/client");
                props.comapanyInfoSuccess();
                props.aboutCompanySuccess();
                props.billingInfoSuccess();
            } else if (props.user.is_aboutCompany_updated) {
                props.comapanyInfoSuccess();
                props.aboutCompanySuccess();
                props.history.replace("/client/profile");
            } else if (props.user.is_companyInfo_updated) {
                props.comapanyInfoSuccess();
                props.history.replace("/client/profile");
            } else {
                props.history.replace("/client/profile");
            }
            props.getLineupxFAQ();
        }
    }, [props.user]);

    const [isChangePassFail, setIsChangePassFail] = useState(false);
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
        if (didMount) {
            if (props.passwordUpdated === false) {
                setIsChangePassFail(true);
            } else if (props.passwordUpdated === true) {
                props.history.goBack();
                alert("Success");
            }
        } else {
            setDidMount(true);
        }
    }, [props.passwordUpdated]);

    if (!props.user) {
        return <> </>;
    }

    const NavBarClasses = [classes.SideDrawer];
    if (toggleNavBar) {
        NavBarClasses.push(classes.SideDrawerOpen);
    }

    const handleChangePasswordClick = () => {
        props.history.push("/client/changepassword");
    };

    const handleCancelChangePassword = () => {
        props.history.goBack();
    };

    const handleFormSubmit = (data) => {
        props.changePassword(data);
    };

    return (
        <>
            {toggleNavBar ? (
                <div
                    onClick={() => setToggleNavBar(!toggleNavBar)}
                    className={classes.BackDrop}
                ></div>
            ) : null}
            <main className={classes.ClientLayout}>
                <div className={classes.NavBar}>
                    <Navbar
                        profileClick={() => props.history.push("/client/user")}
                        logOutClick={props.logout}
                        userIcon={props.user.profile_url}
                        userName={props.user.full_name}
                        toggleNavBar={() => setToggleNavBar(!toggleNavBar)}
                        changePasswordClick={handleChangePasswordClick}
                        faqLink={props.FAQ}
                        account_type="Client"
                    />
                </div>
                <SecondarySideBar
                    sideBarClick={handleSideBarClick}
                    onSideBarHover={sideBarUpdate}
                    sidebar={sideBar}
                />
                <div className={NavBarClasses.join(" ")}>
                    <AppDrawer
                        toggleNavBar={() => setToggleNavBar(!toggleNavBar)}
                        navigationItems={navigationItems}
                    />
                </div>
                <div className={classes.MainContent}>
                    <Switch>
                        <Route path="/client/profile" component={Profile} />
                        <Route path="/client/alljobs/" component={Jobs} />
                        <Route path="/client/newjob" component={NewJob} />
                        <Route
                            path="/client/changepassword"
                            render={() => (
                                <ChangePassword
                                    cancelChangePassword={
                                        handleCancelChangePassword
                                    }
                                    formSubmit={handleFormSubmit}
                                    passwordChanged={isChangePassFail}
                                />
                            )}
                        />
                        <Route
                            path={[
                                "/client/interview/:year/:month",
                                "/client/interview",
                            ]}
                            component={SchedulesMonth}
                        />
                        <Route
                            path="/client/:job/:id"
                            component={JobCandidate}
                        />
                        <Route path="/client/candidates" component={Index} />
                        <Route path="/client/settings" component={Settings} />
                        <Route path="/client" component={Dashboard} />
                    </Switch>
                </div>
            </main>
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.auth.isAuthenticated,
    user: state.auth.auth.user,
    passwordUpdated: state.client?.profile.passwordUpdated,
    FAQ: state.lineupx.FAQ,
});

const mapDispatchToProps = {
    logout,
    comapanyInfoSuccess: () => (dispatch) => {
        dispatch({ type: ActionTypes.COMPANY_INFO_SUCCESS });
    },
    aboutCompanySuccess: () => (dispatch) => {
        dispatch({ type: ActionTypes.ABOUT_COMPANY_SUCCESS });
    },
    billingInfoSuccess: () => (dispatch) => {
        dispatch({ type: ActionTypes.BILLING_INFO_SUCCESS });
    },
    changePassword,
    getLineupxFAQ,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
