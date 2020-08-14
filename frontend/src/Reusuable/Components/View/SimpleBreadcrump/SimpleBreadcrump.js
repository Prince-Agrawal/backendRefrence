import React from "react";
import { SimpleWrapper, Label } from "./style";
import IconArrowActive from "../../../../Assets/Icons/Icon-Default-Arrow/Icon-Default-Arrow Right Active.png";
import IconArrow from "../../../../Assets/Icons/Icon-Default-Arrow/Icon-Default-Arrow Right.png";

export default function SimpleBreadcrump(props) {
    /*
        state = {
            simpleBreadcrump : {
                active: false  => required => boolean
                label: "Label" => required => string
            }
        }

        Example : <SimpleBreadCrump 
                   active = {this.state.simplBreadcrump.active}
                   label = {this.state.simplBreadcrump.label}
                   />
    */

    return (
        <SimpleWrapper>
            <Label active={props.active}>{props.label}</Label>
            <img
                className="img"
                src={props.active ? IconArrowActive : IconArrow}
                alt="simpleArrow"
            />
        </SimpleWrapper>
    );
}
