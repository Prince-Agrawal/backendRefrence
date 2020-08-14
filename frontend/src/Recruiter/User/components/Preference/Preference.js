import React from "react";
import { PreferenceWrapper, KeyValueWrapper, Label } from "./style";
import Level from "../../../../Assets/JobIcons/job-search-symbol-with-a-man-and-bars-graphic.svg";
import CTC from "../../../../Assets/JobIcons/job-search-symbol-of-a-man-with-dollar-coin.svg";
import ClientIcon from "../../../../Assets/JobIcons/crm.svg";
import ResumeIcon from "../../../../Assets/JobIcons/curriculum.svg";

import IconLabel from "../../../../Reusuable/Components/View/IconLabel/IconLabel";

export default function Preference({ user }) {
    return (
        <PreferenceWrapper>
            <KeyValueWrapper>
                <IconLabel icon={Level} label="Level of Recruiter" />
                <Label>{user.level_of_recruiter}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <IconLabel icon={CTC} label="CTC Range" />
                <Label>{user.CTC_rang}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <IconLabel icon={ClientIcon} label="Sources of Client" />
                <Label>{user.client_generation}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <IconLabel icon={ResumeIcon} label="Resume" />
                <a
                    style={{
                        textDecoration: "none",
                        color: "#3B5FFF",
                        textAlign: "left",
                        width: "10rem",
                    }}
                    target="_blank"
                    href={user.resume_url}
                >
                    {user.name + "_resume.pdf"}
                </a>
            </KeyValueWrapper>
        </PreferenceWrapper>
    );
}
