import React from "react";
import { TabSidebarWrapper, Label } from "./style";
import IconLabel from "../../../View/IconLabel/IconLabel";
import { NavLink } from "react-router-dom";

export default function TabSidebar(props) {
    /*
        state = {
                id : 0   => required => number
                active: false  => required => boolean
                label: "Label" => required => string
                activeIcon: ActiveIcon  => required => image path
                inactiveIcon: InactiveIcon => required => image path
        }
        
        handlerTabSidebarClick = (value) => {
            // process to toggle the active state of tabSidebar
        }

        Example : <TabSidebar
                   tabSidebarClick = {this.handlerTabSidebarClick}
                   active = {this.state.active}
                   label = {this.state.label}
                   activeIcon = {this.state.activeIcon}
                   inactiveIcon ={this.state.inactiveIcon}
                   />
    */
    return (
            <TabSidebarWrapper
                to={props.link}
                exact={props.exact}
                style={{ textDecoration: "none" }}
                onClick={props.tabSidebarClick}
            >
                <IconLabel
                    icon={props.active ? props.activeIcon : props.inactiveIcon}
                />
                <Label active={props.active}>{props.label}</Label>
            </TabSidebarWrapper>
    );
}
