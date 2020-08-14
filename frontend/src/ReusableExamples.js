import React, { Component } from "react";

//Reuseable components
import RadioButton from "./Reusuable/Components/Interactive/RadioButton/RadioButton";
import Checkbox from "./Reusuable/Components/Interactive/Checkbox/Checkbox";
import Toggle from "./Reusuable/Components/Interactive/Toggle/Toggle";
import Select from "./Reusuable/Components/Interactive/SelectBoxHorizontal/SelectBoxHorizontal";
import CloseIcon from "./Assets/Icons/Close-Icon/close icon.svg";
import IconLabel from "./Reusuable/Components/View/IconLabel/IconLabel";
import Notification from "./Reusuable/Components/Interactive/Notification/NotificationMessage/Notification";
import NotificationIcon from "./Reusuable/Components/Interactive/Notification/Icon/NotificationIcon";
import Tab from "./Reusuable/Components/Interactive/Tab/Tab";
import TabSidebar from "./Reusuable/Components/Interactive/Tab/Sidebar/TabSidebar";
import Tag from "./Reusuable/Components/Interactive/Tag/tag";
import JobCard from "./Client/Jobs/AllJobs/Component/Interactive/JobCard/JobCard";

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            radioButton: {
                active: false,
                label: "Value",
            },
            selectBoxes: [
                {
                    name: "selectBox1",
                    options: [
                        {
                            id: 0,
                            active: true,
                            label: "Value",
                        },
                    ],
                },
                {
                    name: "selectBox2",
                    options: [
                        {
                            id: 0,
                            active: true,
                            label: "Value",
                        },
                        {
                            id: 1,
                            active: false,
                            label: "Value",
                        },
                    ],
                },
                {
                    name: "selectBox3",
                    options: [
                        {
                            id: 0,
                            active: true,
                            label: "Value",
                        },
                        {
                            id: 1,
                            active: false,
                            label: "Value",
                        },
                        {
                            id: 2,
                            active: false,
                            label: "Value",
                        },
                    ],
                },
                {
                    name: "selectBox1Label",
                    label: "Label",
                    options: [
                        {
                            id: 0,
                            active: true,
                            label: "Value",
                        },
                    ],
                },
                {
                    name: "selectBox2Label",
                    label: "Label",

                    options: [
                        {
                            id: 0,
                            active: true,
                            label: "Value",
                        },
                        {
                            id: 1,
                            active: false,
                            label: "Value",
                        },
                    ],
                },
                {
                    name: "selectBox3Label",
                    label: "Label",
                    options: [
                        {
                            id: 0,
                            active: true,
                            label: "Value",
                        },
                        {
                            id: 1,
                            active: false,
                            label: "Value",
                        },
                        {
                            id: 2,
                            active: false,
                            label: "Value",
                        },
                    ],
                },
            ],
            icon: {
                icon: CloseIcon,
            },
            iconL: {
                icon: CloseIcon,
                label: "Value",
            },
            iconR: {
                icon: CloseIcon,
                label: "Value",
                left: true,
            },
            notifications: [
                {
                    id: 0,
                    type: "success",
                    label: "Value",
                },
                {
                    id: 1,
                    type: "error",
                    label: "Value",
                },
                {
                    id: 2,
                    type: "warning",
                    label: "Value",
                },
                {
                    id: 3,
                    type: "system",
                    label: "Value",
                },
            ],
            notificationIcons: [
                {
                    id: 0,
                    active: true,
                    count: 3,
                },
                {
                    id: 1,
                    active: false,
                },
            ],
            tags: [
                {
                    id: 0,
                    label: "Tag 1",
                },
                {
                    id: 1,
                    label: "This is a tag 2 elements",
                },
                {
                    id: 2,
                    label: "Tag 3",
                },
            ],
            jobs: [
                {
                    title: "Game Developer",
                    location: "Location",
                    date: "Date",
                    status: "0",
                    screen: "10",
                    offers: "0",
                    interview: "0",
                    onHolds: "0",
                    rejected: "0",
                    candidates: "20",
                    toReview: true,
                    urgent: true,
                },
            ],
        };
    }

    //
    //  Active Handler for Checkbox, RadioButton, Toggle
    activeHandler = () => {
        const radioButton = { ...this.state.radioButton };

        radioButton.active = !this.state.radioButton.active;

        this.setState({ radioButton });
    };
    // ends
    //

    //
    //  Active Handler for Tag
    handleTagCloseBtnClick = (removeTag) => {
        this.setState({
            tags: this.state.tags.filter((tag) => tag.id !== removeTag.id),
        });
    };
    //  Ends
    //

    //
    // SelectBoxHorizontal -> Option Click
    handleSelectBoxOptionClick = (clickSelectBoxName, clickOptionId) => {
        const selectBoxes = this.state.selectBoxes;

        selectBoxes.map((selectBox) => {
            if (selectBox.name === clickSelectBoxName) {
                selectBox.options.map((option) => {
                    if (option.id === clickOptionId)
                        option.active = !option.active;
                    else option.active = false;
                    return option;
                });
            }
            return selectBox;
        });

        this.setState({
            selectBoxes,
        });
    };
    // Ends
    //

    //
    //  Notification => On Notification Click
    handleNotificationClick = (id) => {
        const notifications = this.state.notifications;
        notifications.forEach((notification) => {
            if (notification.id === id) alert(`Clicked Notification ${id}`);
        });
    };
    // Ends
    //

    //
    //  Notification => On Notification Close
    handleNotificationClose = (id) => {
        let notifications = this.state.notifications;

        notifications = notifications.filter(
            (notification) => notification.id !== id
        );

        this.setState({ notifications });
    };
    // Ends
    //

    //
    //  NotificationIcon => On Notification Icon Click
    handleNotificationIconClick = (id) => {
        const notificationIcons = this.state.notificationIcons;
        notificationIcons.forEach((notificationIcons) => {
            if (notificationIcons.id === id)
                alert(`Clicked Notification ${id}`);
        });
    };
    // Ends
    //

    render() {
        return (
            <div
                style={{
                    display: "grid",
                    rowGap: "2rem",
                    backgroundColor: "#abcdef",
                    padding: "1rem"
                }}
            >
                {this.state.tags.map((tag) => (
                    <Tag
                        key={tag.id}
                        length={this.state.tags.length}
                        tag={tag}
                        handleCloseBtnClick={this.handleTagCloseBtnClick}
                    />
                ))}
                <RadioButton
                    {...this.state.radioButton}
                    radioBtnClick={this.activeHandler}
                />
                <Checkbox
                    {...this.state.radioButton}
                    checkboxClick={this.activeHandler}
                />
                <Toggle
                    {...this.state.radioButton}
                    toggleClick={this.activeHandler}
                />
                {this.state.selectBoxes.map((selectBox) => (
                    <Select
                        key={selectBox.name}
                        selectBox={selectBox}
                        handleOptionClick={this.handleSelectBoxOptionClick}
                    />
                ))}
                <IconLabel {...this.state.icon} />
                <IconLabel {...this.state.iconL} />
                <IconLabel {...this.state.iconR} />
                {this.state.notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        notificationClick={() =>
                            this.handleNotificationClick(notification.id)
                        }
                        notificationClose={() =>
                            this.handleNotificationClose(notification.id)
                        }
                        label={notification.label}
                        type={notification.type}
                    />
                ))}
                {this.state.notificationIcons.map((notificationIcon) => (
                    <NotificationIcon
                        key={notificationIcon.id}
                        notificationIconClick={this.handleNotificationIconClick}
                        {...notificationIcon}
                    />
                ))}
                <Tab
                    tabClick={this.activeHandler}
                    to={"/reusables"}
                    {...this.state.radioButton}
                />
                <TabSidebar
                    tabSidebarClick={this.activeHandler}
                    {...this.state.radioButton}
                    link={"/reusables"}
                    activeIcon={CloseIcon}
                    inactiveIcon={CloseIcon}
                />
                {this.state.jobs.map((job) => (
                    <JobCard{...job} />
                ))}
            </div>
        );
    }
}
