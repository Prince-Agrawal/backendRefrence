import React from "react";
import { Wrapper, CircleId, Label } from "./style.js";
import IconDone from "../../../../Assets/Icons/Icon-Check/Icon-Check-White.png";

export const Breadcrump = (props) => {
    /*
        state = {
            breadcrump : {
                active: false  => required => boolean
                done: false    => required => boolean
                label: "Label" => required => string
            }
        }

        Example : <BreadCrump 
                   active = {this.state.breadcrump.active}
                   label = {this.state.breadcrump.label}
                   />
    */

    return (
        <Wrapper>
            <CircleId active={props.active} done={props.done}>
                {props.done ? (
                    <img className="img" src={IconDone} alt="done" />
                ) : (
                    props.id
                )}
            </CircleId>
            <Label active={props.active} done={props.done}>
                {props.label}
            </Label>{" "}
        </Wrapper>
    );
};
