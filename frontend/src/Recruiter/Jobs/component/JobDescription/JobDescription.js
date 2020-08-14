import React from "react";

import { connect } from "react-redux";
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableHead,
} from "@material-ui/core";

import {
    acceptJob,
    rejectJob,
    toggel,
    getJobCandidate,
} from "../../../../Redux/actions/Recruiter/panel.actions";

import {
    JobDescriptionWrapper,
    MainContentWrapper,
    LeftAside,
    RightAside,
    JobImage,
    KeyValueWrapper,
    Label,
    SubContentWrapper,
    JobDescriptionButton,
} from "./style";
import IconLabel from "../../../../Reusuable/Components/View/IconLabel/IconLabel";
import JobIcon from "../../../../Assets/Icons/Jobs-Icons/Job-Card/Image.svg";
import { useEffect } from "react";
import Candidate from "../Candidates/Candidate";

const getRightButton = (
    history,
    category,
    job,
    acceptJob,
    rejectJob,
    toggel
) => {
    if (category === "live") {
        return [
            <JobDescriptionButton
                onClick={() => {
                    history.replace(`/recruiter/jobs/${category}`);
                    acceptJob(job._id);
                }}
                accept
            >
                Accept
            </JobDescriptionButton>,
            <JobDescriptionButton
                id="job"
                onClick={(event) => {
                    history.replace(`/recruiter/jobs/${category}`);
                    rejectJob(job._id);
                }}
            >
                Reject
            </JobDescriptionButton>,
        ];
    } else if (category === "accepted") {
        return (
            <JobDescriptionButton
                accept
                onClick={() => {
                    history.push("/recruiter/candidates/new");
                    toggel(job);
                }}
            >
                Add Candidate
            </JobDescriptionButton>
        );
    } else {
        return (
            <JobDescriptionButton accept readOnly disabled>
                Rejected
            </JobDescriptionButton>
        );
    }
};

const JobDescription = ({
    history,
    match,
    liveJobs,
    acceptedJobs,
    rejectedJobs,
    acceptJob,
    rejectJob,
    toggel,
    jobID,
    view,
    cover,
    getJobCandidate,
    candidates,
}) => {
    useEffect(() => {
        getJobCandidate(match?.params.jobId || jobID);
    }, []);
    let jobs;
    switch (match?.params.category || "accepted") {
        case "live":
            jobs = liveJobs;
            break;
        case "accepted":
            jobs = acceptedJobs;
            break;
        case "rejected":
            jobs = rejectedJobs;
            break;
        default:
            jobs = liveJobs;
            break;
    }
    if (!jobs) {
        history.replace("/recruiter");
        return <div></div>;
    }
    const jobDescription = jobs.filter(
        (job) => job._id === (match?.params.jobId || jobID)
    )[0];

    const {
        designation,
        job_title,
        location,
        mandatory_skills,
        additional_skills,
        salary,
        experience_level,
        about_company,
        no_of_positions,
        roles_and_responsiblities,
        additional_information,
        technical_experience,
        activate_on,
        department,
        payment_terms,
        replacement_clause,
        CTC,
    } = jobDescription;

    return (
        <>
            <JobDescriptionWrapper cover={cover}>
                <LeftAside>
                    <JobImage>
                        <IconLabel icon={JobIcon} />
                    </JobImage>
                    <KeyValueWrapper>
                        <Label small>Designation</Label>
                        <Label small bold>
                            Career Level 0-9 consultant
                        </Label>
                    </KeyValueWrapper>
                    <KeyValueWrapper>
                        <Label>Assign Role</Label>
                        <Label small bold>
                            Transaction, Proccessing, Representative
                        </Label>
                    </KeyValueWrapper>
                    <KeyValueWrapper>
                        <Label>Qualification</Label>
                        <Label small bold>
                            Master of Business
                        </Label>
                    </KeyValueWrapper>
                    <KeyValueWrapper style={{ marginBottom: "0" }}>
                        <Label>Skills</Label>
                        <Label small bold>
                            {mandatory_skills
                                .concat(additional_skills)
                                .join(" ")}
                        </Label>
                    </KeyValueWrapper>
                    <Label grey>Job Update</Label>
                    <hr />
                    <KeyValueWrapper style={{ marginBottom: "0" }}>
                        <Label title bold>
                            Update Title
                        </Label>
                        <Label>date</Label>
                    </KeyValueWrapper>
                    <Label>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed, neque!
                    </Label>
                </LeftAside>
                <MainContentWrapper>
                    <Label heading title bold>
                        {designation}
                    </Label>
                    <SubContentWrapper>
                        <Label heading>{job_title}</Label>
                        <Label title grey>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Perferendis optio amet voluptas corporis ut
                            iste? Voluptate unde autem excepturi illo officiis
                            obcaecati quasi ut facere modi fugiat tempora minus
                            quos eligendi, rem porro ratione amet corrupti
                            voluptas facilis saepe velit.
                        </Label>
                    </SubContentWrapper>
                    <SubContentWrapper>
                        <Label heading>Key Responsibilities</Label>
                        <Label title grey>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quod placeat neque distinctio doloribus
                            exercitationem natus modi, ipsum deleniti eius minus
                            aliquid atque. Ipsum ea maxime totam sint incidunt
                            illo minima, facere velit adipisci. Error fugit
                            reiciendis beatae totam provident. Doloribus!
                        </Label>
                    </SubContentWrapper>
                    <SubContentWrapper>
                        <Label heading>Technical Experience</Label>
                        <Label title grey>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Necessitatibus sint blanditiis repellat
                            deleniti impedit voluptas illo minima. Eligendi,
                            delectus consequuntur. Accusantium, tenetur beatae.
                            Minima libero, placeat quaerat amet harum beatae
                            nesciunt nemo ad inventore omnis officiis laudantium
                            rem odio. Asperiores!
                        </Label>
                    </SubContentWrapper>
                    <SubContentWrapper>
                        <Label heading>Additional Information</Label>
                        <Label title grey>
                            {additional_information}
                        </Label>
                    </SubContentWrapper>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Stage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidates?.map((candidate, index) => {
                                    return (
                                        <Candidate key={index} {...candidate} />
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainContentWrapper>
                <RightAside>
                    <Label heading bold>
                        {CTC}
                        <span
                            style={{
                                fontSize: ".75rem",
                                fontWeight: "0rem",
                                color: "#000",
                            }}
                        >
                            {" of CTC"}
                        </span>
                    </Label>
                    <hr />
                    <br />
                    <KeyValueWrapper>
                        <Label>Activated on</Label>
                        <Label small bold>
                            {activate_on}
                        </Label>
                    </KeyValueWrapper>
                    <KeyValueWrapper>
                        <Label>Openings</Label>
                        <Label small bold>
                            {no_of_positions}
                        </Label>
                    </KeyValueWrapper>
                    <KeyValueWrapper>
                        <Label>Location</Label>
                        <Label small bold>
                            {location}
                        </Label>
                    </KeyValueWrapper>
                    <Label grey>Job Details</Label>
                    <hr />
                    <br />
                    <KeyValueWrapper>
                        <Label>Experience</Label>
                        <Label small bold>
                            {experience_level}
                        </Label>
                    </KeyValueWrapper>
                    <KeyValueWrapper>
                        <Label>Salary</Label>
                        <Label small bold>
                            {salary}
                        </Label>
                    </KeyValueWrapper>
                    <KeyValueWrapper>
                        <Label>Domain</Label>
                        <Label small bold>
                            department
                        </Label>
                    </KeyValueWrapper>
                    <KeyValueWrapper>
                        <Label>Payment Terms</Label>
                        <Label small bold>
                            {payment_terms}
                        </Label>
                    </KeyValueWrapper>
                    <KeyValueWrapper style={{ marginBottom: ".3rem" }}>
                        <Label small>Replacement Clause</Label>
                        <Label small bold>
                            {replacement_clause}
                        </Label>
                    </KeyValueWrapper>
                    {!view &&
                        getRightButton(
                            history,
                            match.params.category,
                            jobDescription,
                            acceptJob,
                            rejectJob,
                            toggel
                        )}
                </RightAside>
            </JobDescriptionWrapper>
        </>
    );
};
const mapStateToProps = (state) => ({
    acceptedJobs: state.recruiter.panel.acceptedJobs,
    rejectedJobs: state.recruiter.panel.rejectedJobs,
    liveJobs: state.recruiter.panel.liveJobs,
    candidates: state.recruiter.panel.candidates,
});

const mapDispatchToProps = {
    acceptJob,
    rejectJob,
    toggel,
    getJobCandidate,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDescription);
