import React, { useEffect, useRef } from "react";

import { Route, Switch } from "react-router-dom";

import SocketIOClient from "socket.io-client";

import { connect } from "react-redux";
import { logout } from "../Redux/actions/auth/authActions";
import {
    changePassword,
    getNotifications,
    updateNotifications,
} from "../Redux/actions/Recruiter/profile";
import { getLineupxFAQ } from "../Redux/actions/lineupx/action";
import ActionTypes from "../Redux/actions/Recruiter/ActionTypes";

import classes from "./index.module.css";

import CandidateIcon from "../Assets/Icons/AppDrawer-Icon/candidate icon.svg";
import HomeIcon from "../Assets/Icons/AppDrawer-Icon/home icon.svg";
import Icon from "../Assets/Icons/AppDrawer-Icon/icon.svg";
import DashboardIcon from "../Assets/JobIcons/dashboard.svg";
import CandidatesIcon from "../Assets/JobIcons/list-with-possible-workers-to-choose.svg";
import LiveIcon from "../Assets/JobIcons/online-job-search-symbol.svg";
import AcceptedIcon from "../Assets/JobIcons/accept.svg";
import RejectedIcon from "../Assets/JobIcons/rejected.svg";
import Panel from "./Jobs/pages/panel/panel.component";
import Navbar from "../Reusuable/Container/NavigationBar/Navbar";
import AppDrawer from "../Reusuable/Container/AppDrawer/AppDrawer";
import Index from "./Profile/Container";
import User from "./User/container/User";
import { useState } from "react";
import ChangePassword from "../Reusuable/Container/ChangePassword/ChangePassword";
import SecondarySideBar from "../Reusuable/Container/SecondarySideBar/SecondarySideBar";

const END_POINT = "localhost:3000";

function App(props) {
    useEffect(() => {
        const socket = SocketIOClient(END_POINT);
        socket.on("recruiter", (data) => {
            props.getNotifications();
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const navigationItems = [
        {
            name: "Navigation",
            routes: [
                {
                    id: 1,
                    label: "Dashboard",
                    activeIcon: HomeIcon,
                    inactiveIcon: HomeIcon,
                    route: "/recruiter",
                    exact: true,
                },
                {
                    id: 2,
                    label: "Candidates",
                    activeIcon: CandidateIcon,
                    inactiveIcon: CandidateIcon,
                    route: "/recruiter/candidates",
                },
            ],
        },
        {
            name: "Jobs",
            routes: [
                {
                    id: 3,
                    label: "Live",
                    activeIcon: Icon,
                    inactiveIcon: Icon,
                    route: "/recruiter/jobs/live",
                },
                {
                    id: 4,
                    label: "Accepted",
                    activeIcon: Icon,
                    inactiveIcon: Icon,
                    route: "/recruiter/jobs/accepted",
                },
                {
                    id: 5,
                    label: "Rejected",
                    activeIcon: Icon,
                    inactiveIcon: Icon,
                    route: "/recruiter/jobs/rejected",
                },
            ],
        },
        {
            name: "Support",
            routes: [
                {
                    id: 6,
                    active: false,
                    label: "Help Desk",
                    activeIcon: Icon,
                    inactiveIcon: Icon,
                    route: "/recruiter/support",
                },
                {
                    id: 7,
                    active: false,
                    label: "Tutorials",
                    activeIcon: Icon,
                    inactiveIcon: Icon,
                    route: "/recruiter/tutorials",
                },
                {
                    id: 8,
                    active: false,
                    label: "Feedback",
                    activeIcon: Icon,
                    inactiveIcon: Icon,
                    route: "/recruiter/feedback",
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
            route: "/recruiter",
        },
        {
            id: 2,
            icon: CandidatesIcon,
            active: false,
            label: "Candidates",
            route: "/recruiter/candidates",
        },
        {
            id: 3,
            icon: LiveIcon,
            active: false,
            label: "Live Jobs",
            route: "/recruiter/jobs/live",
        },
        {
            id: 4,
            icon: AcceptedIcon,
            active: false,
            label: "Accepted Jobs",
            route: "/recruiter/jobs/accepted",
        },
        {
            id: 5,
            icon: RejectedIcon,
            active: false,
            label: "Rejected Jobs",
            route: "/recruiter/jobs/rejected",
        },
    ];
    const [sideBar, setsideBar] = useState(secondarySideBar);
    const sideBarUpdate = (id, value) => {
        sideBar[id - 1].active = value;
        setsideBar(JSON.parse(JSON.stringify(sideBar)));
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
                props.user.is_profile_update &&
                props.user.is_domain_update &&
                props.user.is_additional_info_update
            ) {
                props.history.replace("/recruiter");
                props.personalInfoSuccess();
                props.domainSuccess();
                props.additionalInfoSuccess();
            } else if (props.user.is_domain_update) {
                props.personalInfoSuccess();
                props.domainSuccess();
                props.history.replace("/recruiter/profile");
            } else if (props.user.is_profile_update) {
                props.personalInfoSuccess();
                props.history.replace("/recruiter/profile");
            } else {
                props.history.replace("/recruiter/profile");
            }
            props.getLineupxFAQ();
            props.getNotifications();
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
        props.history.push("/recruiter/changepassword");
    };

    const handleCancelChangePassword = () => {
        props.history.goBack();
    };

    const handleFormSubmit = (data) => {
        props.changePassword(data);
    };

    const handleSideBarClick = (id) => {
        if (sideBar[id - 1].route !== props.location.pathname)
            props.history.push(sideBar[id - 1].route);
    };

    const goToLiveJobs = () => {
        props.history.push("/recruiter/jobs/live");
    };

    const goToJobDescription = (jobId) => {
        props.history.push(`/recruiter/jobs/accepted/${jobId}`);
    };

    const removeNotification = (notificationID) => {
        props.updateNotifications(notificationID);
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
                        profileClick={() =>
                            props.history.push("/recruiter/user")
                        }
                        logOutClick={props.logout}
                        userIcon={props.user.profile_url}
                        userName={props.user.name}
                        toggleNavBar={() => setToggleNavBar(!toggleNavBar)}
                        changePasswordClick={handleChangePasswordClick}
                        faqLink={props.FAQ}
                        account_type="Recruiter"
                        notifications={props.notifications}
                        liveJobs={goToLiveJobs}
                        jobDescription={goToJobDescription}
                        removeNotification={removeNotification}
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
                        <Route path="/recruiter/user" component={User} />
                        <Route path="/recruiter/profile" component={Index} />
                        <Route
                            path="/recruiter/changepassword"
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
                        <Route path="/recruiter" component={Panel} />
                    </Switch>
                </div>
            </main>
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.auth.isAuthenticated,
    user: state.auth.auth.user,
    passwordUpdated: state.recruiter.profile.passwordUpdated,
    notifications: state.recruiter.profile.notifications,
    FAQ: state.lineupx.FAQ,
});

const mapDispatchToProps = {
    logout,
    personalInfoSuccess: () => (dispatch) => {
        dispatch({ type: ActionTypes.PERSONAL_INFO_SUCCESS });
    },
    domainSuccess: () => (dispatch) => {
        dispatch({ type: ActionTypes.DOMAIN_SUCCESS });
    },
    additionalInfoSuccess: () => (dispatch) => {
        dispatch({ type: ActionTypes.ADDITIONAL_INFO_SUCCESS });
    },
    changePassword,
    getLineupxFAQ,
    getNotifications,
    updateNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
