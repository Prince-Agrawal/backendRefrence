import React from "react";
import {
    SectionHeaderWrapper,
    ContentWrapper,
    DescriptionWrapper,
    Title,
} from "./style";

import Icon from "../../../../Assets/Icons/QuestionMark-Icon/QuestionMark.svg";
import callout from "../../../../Assets/Icons/CallOut-Icon/callout.png";
import IconLabel from "../../View/IconLabel/IconLabel";
import { useState } from "react";

export default function SectionHeader(props) {
    const [Description, setDescription] = useState(false);
    return (
        <SectionHeaderWrapper>
            <ContentWrapper>
                <Title small={props.small}>{props.title}</Title>
            </ContentWrapper>
            <div style={{ display: "flex" }}>
                {props.error?.length ? (
                    <span
                        style={{
                            color: "red",
                            fontSize: ".8rem",
                            marginRight: "1rem",
                        }}
                    >
                        {props.error}
                    </span>
                ) : null}
                {props.desc ? (
                    <span
                        style={{ position: "relative" }}
                        onMouseEnter={() => setDescription(true)}
                        onMouseLeave={() => setDescription(false)}
                    >
                        {Description ? (
                            <DescriptionWrapper>
                                {props.desc}{" "}
                                <span>
                                    <img src={callout} alt="" />
                                </span>
                            </DescriptionWrapper>
                        ) : null}
                        <IconLabel icon={Icon} />
                    </span>
                ) : null}
            </div>
        </SectionHeaderWrapper>
    );
}
