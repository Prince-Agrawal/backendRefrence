import React from "react";
import { AboutWrapper, Label, KeyValueWrapper } from "./style";
import IconLabel from "../../../../Reusuable/Components/View/IconLabel/IconLabel";
import PhoneIcon from "../../../../Assets/JobIcons/phone.svg";
import EmailIcon from "../../../../Assets/JobIcons/email.svg";
import LocationIcon from "../../../../Assets/JobIcons/address.svg";
import DegreeIcon from "../../../../Assets/JobIcons/patent.svg";
import GenderIcon from "../../../../Assets/JobIcons/gender.svg";
import MemberIcon from "../../../../Assets/JobIcons/membership.svg";

export default function About({ user }) {
    return (
        <AboutWrapper>
            <Label
                style={{
                    marginBottom: "1rem",
                    borderBottom: "1px solid #c2c2c2",
                }}
            >
                Contact Information
            </Label>
            <KeyValueWrapper>
                <IconLabel icon={PhoneIcon} label="Phone" />
                <Label>{user.phone_no}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <IconLabel icon={EmailIcon} label="Email" />
                <Label>{user.email}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <IconLabel icon={LocationIcon} label="Location" />
                <Label>{user.location}</Label>
            </KeyValueWrapper>
            <Label
                style={{
                    marginBottom: "1rem",
                    borderBottom: "1px solid #c2c2c2",
                }}
            >
                Basic Information
            </Label>
            <KeyValueWrapper>
                <IconLabel icon={DegreeIcon} label="Qualification" />
                <Label>{user.highest_qualification}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <IconLabel icon={GenderIcon} label="Gender" />
                <Label>{user.gender}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <IconLabel icon={MemberIcon} label="Member" />
                <Label>Since {user.register_date}</Label>
            </KeyValueWrapper>
        </AboutWrapper>
    );
}
