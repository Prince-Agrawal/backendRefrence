import React from "react";
import { ButtonWrapper } from "./style";

export default function Button(props) {
    return (
        <ButtonWrapper type={props.type} onClick={props.buttonClick}>
            {props.label}
        </ButtonWrapper>
    );
}
