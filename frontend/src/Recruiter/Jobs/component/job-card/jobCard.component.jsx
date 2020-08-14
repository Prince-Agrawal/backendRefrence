import React, { useState } from "react";
import {
    JobCardWrapper,
    ContentWrapper,
    SubContentWrapper,
    Label,
    ColumnWrapper,
    MainContentWrapper,
    JobImageWrapper,
    MoreIconWrapper,
    TitleContentWrapper,
    Menu,
    MenuWrapper,
} from "./jobCard.style";

import CustomButtonBar from "../custom-button-bar/custom-button-bar.componenets";
import MoreIcon from "../../../../Assets/JobIcons/more.svg";
import IconLabel from "../../../../Reusuable/Components/View/IconLabel/IconLabel";
import JobImage from "../../../../Assets/Icons/Jobs-Icons/Job-Card/Image.svg";
import UrgentImage from "../../../../Assets/Icons/Jobs-Icons/Job-Card/Urgent.png";
import IdIcon from "../../../../Assets/Icons/Jobs-Icons/Job-Card/Id.svg";
import ExperienceIcon from "../../../../Assets/Icons/Jobs-Icons/Job-Card/Job Experience.svg";
import JobTypeIcon from "../../../../Assets/Icons/Jobs-Icons/Job-Card/Job Type.svg";
import JobShiftIcon from "../../../../Assets/Icons/Jobs-Icons/Job-Card/Job Shift.svg";
import CandidateIcon from "../../../../Assets/Icons/Jobs-Icons/Job-Card/Candidate.svg";
import CandidateSalaryIcon from "../../../../Assets/Icons/Jobs-Icons/Job-Card/Candidate Salary.svg";

const JobCard = ({
    job,
    category,
    jobCardClick,
    addCandidateClick,
    addExistingCandidateClick,
    showCandidateClick,
    moreIconClick,
}) => {
    const {
        _id,
        designation,
        job_title,
        location,
        annual_CTC,
        experience_level,
        no_of_positions,
        job_type,
        CTC,
    } = job;

    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <JobCardWrapper onClick={jobCardClick}>
            {moreIconClick ? (
                <Menu
                    onClick={(e) => {
                        if (!e) var e = window.event;
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();
                        setToggleMenu(!toggleMenu);
                    }}
                >
                    <MoreIconWrapper icon={MoreIcon} />
                    {toggleMenu ? (
                        <MenuWrapper
                            onClick={(e) => {
                                if (!e) var e = window.event;
                                e.cancelBubble = true;
                                if (e.stopPropagation) e.stopPropagation();
                                moreIconClick(_id);
                            }}
                            onMouseLeave={() => {
                                setToggleMenu(false);
                            }}
                        >
                            Undo
                        </MenuWrapper>
                    ) : null}
                </Menu>
            ) : null}
            <ContentWrapper noBorderBottomOn={!moreIconClick ? 3 : 4}>
                <SubContentWrapper>
                    <JobImageWrapper icon={JobImage} />
                    <ColumnWrapper>
                        <Label type="primary" color="dark">
                            {CTC}{" "}
                            <Label type="tertiary" color="dark">
                                %
                            </Label>
                        </Label>
                        <Label type="tertiary">of CTC</Label>
                    </ColumnWrapper>
                </SubContentWrapper>
                <TitleContentWrapper>
                    <Label type="secondary" color="dark">
                        {job_title}
                    </Label>
                    <IconLabel icon={UrgentImage} />
                </TitleContentWrapper>
                <ColumnWrapper>
                    <Label type="tertiary">{job_title}, Department,</Label>
                    <Label type="tertiary">{location}</Label>
                </ColumnWrapper>
            </ContentWrapper>
            <ContentWrapper noBorderBottomOn={!moreIconClick ? 3 : 4}>
                <MainContentWrapper>
                    <IconLabel icon={IdIcon} label={"12345"} />
                    <IconLabel icon={ExperienceIcon} label={experience_level} />
                </MainContentWrapper>
                <MainContentWrapper>
                    <IconLabel icon={JobTypeIcon} label={job_type} />
                    <IconLabel icon={JobShiftIcon} label={"Day"} />
                </MainContentWrapper>
            </ContentWrapper>
            <ContentWrapper noBorderBottomOn={!moreIconClick ? 3 : 4}>
                <MainContentWrapper>
                    <span
                        onClick={(e) => {
                            if (!e) var e = window.event;
                            e.cancelBubble = true;
                            if (e.stopPropagation) e.stopPropagation();
                            showCandidateClick();
                        }}
                    >
                        <IconLabel
                            style={{ cursor: "pointer !important" }}
                            icon={CandidateIcon}
                            label={no_of_positions + " candidates"}
                        />
                    </span>
                    <IconLabel icon={CandidateSalaryIcon} label={annual_CTC} />
                </MainContentWrapper>
            </ContentWrapper>
            <CustomButtonBar
                category={category}
                job={job}
                addCandidateClick={addCandidateClick}
                addExistingCandidateClick={addExistingCandidateClick}
            />
        </JobCardWrapper>
    );
};

export default JobCard;
