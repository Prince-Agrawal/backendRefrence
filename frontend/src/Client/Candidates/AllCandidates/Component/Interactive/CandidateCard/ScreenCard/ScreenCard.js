import React from "react";
import {
    CardWrapper,
    HeaderWrapper,
    MainContent,
    Footer,
} from "./style";
import TertiaryButton from "../../../../../../../Reusuable/Components/Interactive/Button/TertiaryButton";

export default function ScreenCard(props) {
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
                <div>
                    <span>Additional Qualities</span>
                    <div>
                        {props.aditionalQualities.map((quality,i) => (
                            <span key={i}>{quality}</span>
                        ))}
                    </div>
                </div>
            </MainContent>
            <Footer>
                <span>Resume</span>
                <TertiaryButton clicked={props.changeStatus} name={"Call For Interview"}/>
            </Footer>
        </CardWrapper>
    );
}
