import React from "react";
import { NotificationWrapper, LeadingWrapper, Label, Icon } from "./style";
import SuccessIcon from "../../../../../Assets/Icons/Notification-Icon/Success-Icon.png";
import ErrorIcon from "../../../../../Assets/Icons/Notification-Icon/Error-Icon.png";
import WarningIcon from "../../../../../Assets/Icons/Notification-Icon/Warning-Icon.png";
import SystemIcon from "../../../../../Assets/Icons/Notification-Icon/System-Icon.png";
import CloseIcon from "../../../../../Assets/Icons/Notification-Icon/Close-Icon.png";

export default function Notification(props) {
    /*
        state = {
                    id: 0,            => Number (Unique) => to identify individual notification
                    type: "success",  => String ["success","warning","error","system"] => type of notification
                    label: "Value",   => String => label
        }

        handleNotificationClick = id => {
            // open the notification which has this.state.id === id
        }

        handleNotificationClose => id => {
            // process to delete the notification which has his.state.id === id
        }

        example: <Notification 
                    notificationClick={this.handleNotificationClick(this.state.id)} 
                    notificationClose={this,handleNotificationClose}
                    {...this.state}
                />
    */

    return (
        <NotificationWrapper>
            <LeadingWrapper onClick={props.notificationClick}>
                <Icon
                    leading
                    src={
                        props.type === "error"
                            ? ErrorIcon
                            : props.type === "success"
                            ? SuccessIcon
                            : props.type === "warning"
                            ? WarningIcon
                            : SystemIcon
                    }
                />
                <Label>{props.label}</Label>
            </LeadingWrapper>
            <Icon onClick={props.notificationClose} src={CloseIcon} />
        </NotificationWrapper>
    );
}
