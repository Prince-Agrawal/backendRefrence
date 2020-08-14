import React from "react";
import { NotificationWrapper, Header, Label, BackDrop } from "./style";
import IconLabel from "../../../Reusuable/Components/View/IconLabel/IconLabel";
import WarningIcon from "../../../Assets/Icons/Notification-Icon/Warning-Icon.png";
import SuccessIcon from "../../../Assets/Icons/Notification-Icon/Success-Icon.png";
import CrossIcon from "../../../Assets/Icons/Cross-icon/Cross-Active.png";

export default function Notification(props) {
    return (
        <>
            <BackDrop onClick={props.closeClick} />
            <NotificationWrapper>
                <Header>
                    <div
                        style={{
                            display: "grid",
                            alignItems: "center",
                            gridAutoFlow: "column",
                            gap: "1rem",
                        }}
                    >
                        <IconLabel
                            icon={
                                props.type === "Warning"
                                    ? WarningIcon
                                    : SuccessIcon
                            }
                        />
                        <Label title>{props.title}</Label>
                    </div>
                    <div
                        style={{ display: "flex", alignItems: "center" }}
                        style={{ cursor: "pointer" }}
                        onClick={props.closeClick}
                    >
                        <IconLabel icon={CrossIcon} />
                    </div>
                </Header>
                <Label style={{ margin: "1rem" }}>{props.msg}</Label>
            </NotificationWrapper>
        </>
    );
}
