import React from "react";
import {
    UnactionedCandidatesWrapper,
    Label,
    LabelWrapper,
    UnactionedJobsWrapper,
} from "./style";

export default function UnactioneedCandidates(props) {
    return (
        <UnactionedJobsWrapper>
            {props.unactionedJobs.map((job, index) => (
                <UnactionedCandidatesWrapper
                    key={index}
                    index={index}
                    length={props.unactionedJobs.length}
                >
                    <LabelWrapper>
                        <Label type="dark">{job.title}</Label>
                        <Label type="grey">, {" " + job.location}</Label>
                    </LabelWrapper>
                    <Label
                        type="light"
                        index={index}
                        length={props.unactionedJobs.length}
                    >
                        {job.count}
                        {" unactioned candidates"}
                    </Label>
                </UnactionedCandidatesWrapper>
            ))}
        </UnactionedJobsWrapper>
    );
}
