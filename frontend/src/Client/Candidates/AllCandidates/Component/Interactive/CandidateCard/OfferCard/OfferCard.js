import React from "react";
import {
    CardWrapper,
    HeaderWrapper,
    MainContent,
    Footer,
} from "./style";
import TertiaryButton from "../../../../../../../Reusuable/Components/Interactive/Button/TertiaryButton";

export default function OfferCard(props) {
    return (
        <CardWrapper>
            <HeaderWrapper>
                <div>
                    <span>{props.candidateName}</span>
                    <span>{props.date}</span>
                </div>
                <label>
                    {props.location}, {props.experience}
                </label>
            </HeaderWrapper>
            <MainContent>
                <TertiaryButton clicked={() => {}} name={"Hire Candidate"} />
            </MainContent>
            <Footer>
                <span>Resume</span>
                <TertiaryButton
                    clicked={props.changeStatus}
                    name={"Retake Interview"}
                />
            </Footer>
        </CardWrapper>
    );
}
