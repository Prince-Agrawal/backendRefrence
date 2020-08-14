import React, { useState } from "react";

import { withRouter } from "react-router-dom";
import classes from "./Navbar.module.css";
import Hamburger from "../../../Assets/Icons/NavigationBar-Icon/Hamburger.svg";
import Logo from "../../../Assets/Icons/NavigationBar-Icon/logo.svg";
import Notification from "../../../Assets/Icons/NavigationBar-Icon/Notification.svg";
import UserPic from "../../../Assets/Icons/NavigationBar-Icon/user pic.png";
import DropDown from "../../../Assets/Icons/NavigationBar-Icon/chevron-down.svg";
import DropdownMenu from "../../Components/Interactive/DropdownMenu/DropdownMenu";
import NotificationIcon from "../../Components/Interactive/Notification/Icon/NotificationIcon";

export default withRouter(function Navbar(props) {
    const [isUserProfileClicked, setUserProfileClicked] = useState(false);
    const [isNotificationClicked, setNotificationClicked] = useState(false);
    return (
        <div className={classes.Navbar}>
            <div className={classes.Item}>
                <div style={{ cursor: "pointer" }} onClick={props.toggleNavBar}>
                    <img src={Hamburger} alt="hamburger" />
                </div>
                <div>
                    <img className={classes.Logo} src={Logo} alt="logo" />
                </div>
            </div>
            <div className={classes.Item}>
                <div
                    onClick={() =>
                        setNotificationClicked(!isNotificationClicked)
                    }
                >
                    <NotificationIcon
                        active={props.notifications?.length > 0}
                        count={props.notifications?.length}
                    />
                    {isNotificationClicked ? (
                        <DropdownMenu
                            dropdownClick={() => setNotificationClicked(false)}
                            menus={
                                props.notifications?.map((notification) => {
                                    let message = notification.message;
                                    let jobId;
                                    if (notification.type === "status") {
                                        message = notification.message.split(
                                            "$"
                                        )[0];
                                        jobId = notification.message.split(
                                            "$"
                                        )[1];
                                    }
                                    return (
                                        <span
                                            onClick={() => {
                                                props.removeNotification(
                                                    notification._id
                                                );
                                                if (
                                                    notification.type ===
                                                    "status"
                                                ) {
                                                    props.jobDescription(jobId);
                                                } else {
                                                    props.liveJobs();
                                                }
                                            }}
                                            style={{
                                                display: "flex",
                                                width: "100%",
                                                height: "100%",
                                                alignItems: "center",
                                            }}
                                        >
                                            {message}
                                        </span>
                                    );
                                }) || [<h5>No Notifications Available</h5>]
                            }
                        />
                    ) : null}
                </div>
                <div>Hello, {props.userName || props.account_type}</div>
                <div
                    onClick={() => setUserProfileClicked(!isUserProfileClicked)}
                >
                    <img
                        src={props.userIcon || UserPic}
                        className={classes.UserPic}
                        alt="user pic"
                    />
                    <img
                        className={classes.DropDown}
                        src={DropDown}
                        alt="dropdown"
                    />
                    {isUserProfileClicked ? (
                        <DropdownMenu
                            dropdownClick={() => setUserProfileClicked(false)}
                            menus={[
                                <span
                                    onClick={props.profileClick}
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        height: "100%",
                                        alignItems: "center",
                                    }}
                                >
                                    My Profile
                                </span>,
                                <span
                                    onClick={props.changePasswordClick}
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        height: "100%",
                                        alignItems: "center",
                                    }}
                                >
                                    Change Password
                                </span>,
                                <a
                                    href={props.faqLink}
                                    target="_blank"
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        height: "100%",
                                        alignItems: "center",
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    FAQ
                                </a>,
                                <span
                                    onClick={props.logOutClick}
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        height: "100%",
                                        alignItems: "center",
                                    }}
                                >
                                    Log Out
                                </span>,
                            ]}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
});
