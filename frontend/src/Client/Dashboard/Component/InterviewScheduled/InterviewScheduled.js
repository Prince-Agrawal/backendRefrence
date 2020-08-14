import React from "react";
import {
    InterviewScheduleWrapper,
    Interviews,
    LabelWrapper,
    Label,
} from "./style";

export default function InterviewScheduled(props) {
    return (
        <InterviewScheduleWrapper>
            {props.interviewSchedule.length ? (
                props.interviewSchedule.map((interview, i) => (
                    <Interviews
                        key={i}
                        index={i}
                        length={props.interviewSchedule.length}
                    >
                        <LabelWrapper>
                            <Label type="dark">{interview.name}</Label>
                            <Label type="grey">{props.date}</Label>
                        </LabelWrapper>
                        <Label
                            type="grey"
                            index={i}
                            length={props.interviewSchedule.length}
                        >
                            {interview.job_title}
                        </Label>
                    </Interviews>
                ))
            ) : (
                <Label type="dark">You have no Interview Schedules today</Label>
            )}
        </InterviewScheduleWrapper>
    );
}
