import React from "react";
import { connect } from "react-redux";

import { ButtonBarConatiner, Button } from "./custom-button-bar.style";
import {
    acceptJob,
    rejectJob,
    toggel,
} from "../../../../Redux/actions/Recruiter/panel.actions";
import { useState } from "react";

/*
-renders different type of button based on the type of jobs
-for ex:  for live jobs--- accept and reject button
          for accepted jobs--- Add candidate Button
          
- each button fires specified actions.
*/

const CustomButtonBar = ({
    category,
    job,
    acceptJob,
    rejectJob,
    toggel,
    addCandidateClick,
    addExistingCandidateClick,
}) => {
    const [isAddCandidateClicked, setIsAddCandidateClicked] = useState(false);
    if (category == "live") {
        return (
            <ButtonBarConatiner>
                <Button
                    onClick={(e) => {
                        if (!e) var e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();
                        rejectJob(job._id);
                    }}
                >
                    Reject
                </Button>
                <Button
                    type="button"
                    onClick={(e) => {
                        if (!e) var e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();
                        acceptJob(job._id);
                    }}
                >
                    Accept
                </Button>
            </ButtonBarConatiner>
        );
    } else if (category == "accepted") {
        return isAddCandidateClicked ? (
            <div style={{ display: "grid", gap: ".3rem" }}>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <span>Would you like to continue with?</span>
                    <span
                        onClick={(e) => {
                            if (!e) var e = window.event;
                            e.cancelBubble = true;
                            if (e.stopPropagation) e.stopPropagation();
                            setIsAddCandidateClicked(false);
                        }}
                        style={{ float: "right", color: "#c2c2c2" }}
                    >
                        Cancel
                    </span>
                </div>
                <Button
                    onClick={(e) => {
                        if (!e) var e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();
                        toggel(job);
                        addExistingCandidateClick();
                    }}
                >
                    Existing Candidate
                </Button>
                <Button
                    onClick={(e) => {
                        if (!e) var e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();
                        addCandidateClick();
                        toggel(job);
                    }}
                >
                    New Candidate
                </Button>
            </div>
        ) : (
            <ButtonBarConatiner>
                <Button
                    onClick={(e) => {
                        if (!e) var e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();
                        setIsAddCandidateClicked(!isAddCandidateClicked);
                    }}
                >
                    Add Candidate
                </Button>
            </ButtonBarConatiner>
        );
    } else {
        return (
            <ButtonBarConatiner>
                <Button disabled>Rejected</Button>
            </ButtonBarConatiner>
        );
    }
};

const mapDispatchToProps = {
    acceptJob,
    rejectJob,
    toggel,
};

export default connect(null, mapDispatchToProps)(CustomButtonBar);
