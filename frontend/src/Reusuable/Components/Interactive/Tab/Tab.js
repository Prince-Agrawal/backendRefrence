import React from "react";
import { TabWrapper, Label, TabWrapperNormal } from "./style";

export default function Tab(props) {
    /*
        state = {
                id : 0   => required => number
                active: false  => required => boolean
                label: "Label" => required => string
        }
        
        handlerTabClick = (value) => {
            // process to toggle the active state of tab
        }

        Example : <Tab
                   tabClick = {this.handlerTabClick}
                   active = {this.state.active}
                   label = {this.state.label}
                   />
    */
    return props.normal ? (
        <TabWrapperNormal
            to={props.to}
            onClick={props.tabClick}
            active={props.active}
        >
            <Label active={props.active}>{props.label}</Label>
        </TabWrapperNormal>
    ) : (
        <TabWrapper
            to={props.to}
            onClick={props.tabClick}
            active={props.active}
        >
            <Label active={props.active}>{props.label}</Label>
        </TabWrapper>
    );
}
