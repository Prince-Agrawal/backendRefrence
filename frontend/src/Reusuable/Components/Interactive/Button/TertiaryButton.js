import React from "react";
import classes from "./TertiaryButton.module.css";

export default function TertiaryButton(props) {
    return (
        <button
            type="button"
            onClick={props.clicked}
            className={classes.TertiaryButton}
        >
            {props.name}
        </button>
    );
}