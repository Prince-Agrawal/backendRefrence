import React from "react";

import { Wrapper, CheckBox, Label } from "./style";

export default function Checkbox(props) {
    /*
        state = {
            checkbox : {
                id: 1   => required => Number
                active: false  => required => boolean
                label: "Label" => optional => string
            }
            value: ""      => to store the checkbox value
        }
        
        handlerCheckboxClick = (value) => {
            this.setState({value})
        }

        Example : <CheckBox 
                   checkboxClick = {this.handlerCheckBoxCLick}
                   active = {this.state.checkbox.active}
                   label = {this.state.checkbox.label}
                   />
    */
    return (
        <Wrapper label={props.label}>
            <CheckBox
                onClick={props.checkboxClick}
                active={props.active}
                label={props.label}
            />
            {props.label ? <Label>{props.label}</Label> : null}
        </Wrapper>
    );
}
