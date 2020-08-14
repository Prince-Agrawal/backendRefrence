import React from "react";
import { Wrapper, Icon, Label } from "./style";
export default function IconLabel(props) {
    /*
        icon: {
                icon: CloseIcon, => required => imgSrc
                label: "Value", => optional => string => lable for the icon
                left: true, => optional => boolean => to left align the icon
            },

           example:     <IconLabel {...this.state.icon} />
        
    */
    return (
        <Wrapper left={props.left}>
            <Icon small={props.small} icon={props.icon} label={props.label} />
            {props.label ? (
                <Label small={props.small} dark={props.dark}>
                    {props.label}
                </Label>
            ) : null}
        </Wrapper>
    );
}
