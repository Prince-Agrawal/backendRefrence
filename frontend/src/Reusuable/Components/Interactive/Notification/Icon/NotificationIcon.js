import React from "react";
import { NotificationIconWrapper } from "./style";

import Icon from "../../../View/IconLabel/IconLabel";
import NotificationActiveIcon from "../../../../../Assets/Icons/Notification-Icon/Notification-Active.png";
import NotificationInactiveIcon from "../../../../../Assets/Icons/Notification-Icon/Notification-Inactive.png";

export default function NotificationIcon(props) {
    /*
        state = {
            notificationIcon: {
                active: true / False,   => required => boolean 
                count: 3                => optional => Number => incase you need to mention,
                                                                 the count of notifications
            }
        }

        handleNotificationIconClick = () => {
            //process for displayning notifications
        }

        Example: <NotificationIcon notificationIconClick={this.notificationIconClick}
                                     {...this.state.notificationIcon}
                    />

    */
    return (
        <NotificationIconWrapper
            count={props.active ? (props.count ? props.count : " ") : 0}
            onClick={props.notificationIconClick}
        >
            <Icon
                icon={
                    props.active
                        ? NotificationActiveIcon
                        : NotificationInactiveIcon
                }
            />
        </NotificationIconWrapper>
    );
}
