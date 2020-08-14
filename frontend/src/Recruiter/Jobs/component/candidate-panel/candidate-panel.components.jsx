import React from "react";
import { connect } from "react-redux";

import {
    getRecruiterCandidate,
    getJobCandidate,
} from "../../../../Redux/actions/Recruiter/panel.actions";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";

import {
    CandidateCardContainer,
    CandidateContainer,
    CandidatePanelWrapper,
    Label,
    KeyValueWrapper,
    LeadingContent,
    HeroImage,
} from "./candidate-panel.style";
import { useEffect } from "react";
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import Sort from "../../../../Assets/Icons/Jobs-Icons/SectionTopBar/sort btn.png";
import Search from "../../../../Assets/Icons/Jobs-Icons/SectionTopBar/search btn.svg";
import Archieved from "../../../../Assets/Icons/Jobs-Icons/SectionTopBar/archieved btn.png";
import Filter from "../../../../Assets/Icons/Jobs-Icons/SectionTopBar/filter btn.png";
import TabbarMain from "../../../../Reusuable/Container/SectionTopBar/TabbarMain";
import { useState } from "react";

const CandidatePanel = ({
    candidates,
    jobId,
    getJobCandidate,
    getRecruiterCandidate,
    user,
}) => {
    useEffect(() => {
        if (user) {
            if (jobId) {
                getJobCandidate(jobId);
            } else {
                getRecruiterCandidate();
            }
        }
        return () => {};
    }, []);

    // const [tabs, setTabs] = useState(sectionTopBar);

    return (
        <CandidatePanelWrapper>
            <SectionHeader title="Candidates" />
            <CandidateContainer>
                {candidates.length ? (
                    candidates.map(
                        ({ name, email, phone_number, resume_link }, index) => {
                            return (
                                <CandidateCardContainer key={index}>
                                    <LeadingContent>
                                        <HeroImage name={name} />
                                        <div
                                            style={{
                                                display: "grid",
                                                height: "fit-content",
                                            }}
                                        >
                                            <Label heading bold>
                                                {name}
                                            </Label>
                                            <Label grey>{email}</Label>
                                            <Label grey>{phone_number}</Label>
                                        </div>
                                    </LeadingContent>
                                    <LeadingContent>
                                        <a
                                            target="_blank"
                                            href={resume_link}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <Button
                                                label="Resume"
                                                type="dark"
                                            />
                                        </a>
                                    </LeadingContent>
                                </CandidateCardContainer>
                            );
                        }
                    )
                ) : (
                    <h4>Please add Candidates</h4>
                )}
            </CandidateContainer>
        </CandidatePanelWrapper>
    );
};

const mapStateToProps = (state) => ({
    candidates: state.recruiter.panel.candidates,
    user: state.auth.auth.user,
});

export default connect(mapStateToProps, {
    getJobCandidate,
    getRecruiterCandidate,
})(CandidatePanel);
