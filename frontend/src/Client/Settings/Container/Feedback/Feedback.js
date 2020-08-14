import React, { Component } from "react";
import { FeedbackFormWrapper } from "./style";
import AdditionalQuestions from "../../../NewJob/Container/AdditionalQuestions/AdditionalQuestions";
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";

export class Feedback extends Component {
    render() {
        return (
            <FeedbackFormWrapper>
                <SectionHeader
                    title="Feedback Template"
                    desc="Customize your feedback form for the candidates"
                />
                <AdditionalQuestions noTitle />
            </FeedbackFormWrapper>
        );
    }
}

export default Feedback;
