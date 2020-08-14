import React from "react";

import { Slider, Switch, Label, Wrapper } from "./style";

export default function Toggle(props) {
    /*
        state = {
            toggle : {
                active: false  => required => boolean
                label: "Label" => required => string
            }
        }
        
        handleToggleClick = () => {
            const toggle = this.state.toggle
            toggle.active = !toggle.active
            this.setState({toggle})
        }

        Example : <Toggle 
                   toggleClick = {this.handlerToggleCLick}
                   active = {this.state.toggle.active}
                   label = {this.state.toggle.label}
                   />
    */
    return (
        <Wrapper>
            {props.label ? <Label>{props.label}</Label> : null}
            <Switch>
                <Slider onClick={props.toggleClick} active={props.active}></Slider>
            </Switch>
        </Wrapper>
    );
}
