import React, { Component } from "react";
import {
    JobDetailsWrapper,
    ContentWrapper,
    KeyValueWrapper,
    Label,
    RowWrapper,
} from "./style";
import Button from "../../../../../Reusuable/Components/Interactive/Button/Button";

export class JobDetails extends Component {
    render() {
        return (
            <JobDetailsWrapper>
                <RowWrapper>
                    <div
                        style={{
                            display: "grid",
                            gridAutoFlow: "column",
                            width: "fit-content",
                            alignItems: "center",
                        }}
                    >
                        <Label title style={{ marginRight: "1rem" }} heading>
                            {this.props.job.job_title}
                        </Label>
                        <Label grey>(Ref: #545)</Label>
                    </div>
                    <Label>{this.props.job.joining_date}</Label>
                    <Label>
                        {this.props.job.department}, {this.props.job.location}
                    </Label>
                </RowWrapper>
                <KeyValueWrapper>
                    <ContentWrapper
                        style={{
                            paddingRight: "1rem",
                        }}
                    >
                        <RowWrapper style={{ gap: "1rem" }}>
                            <KeyValueWrapper>
                                <Label title grey>
                                    Number of Positions
                                </Label>
                                <Label title>
                                    {this.props.job.no_of_positions}
                                </Label>
                            </KeyValueWrapper>
                            <KeyValueWrapper>
                                <Label title grey>
                                    Number of Applicants
                                </Label>
                                <Label title>{this.props.totalCandidate}</Label>
                            </KeyValueWrapper>
                            <KeyValueWrapper>
                                <Label title grey>
                                    In Process
                                </Label>
                                <Label title>
                                    {this.props.inProcess_candidate.length}
                                </Label>
                            </KeyValueWrapper>
                            <KeyValueWrapper>
                                <Label title grey>
                                    Offered
                                </Label>
                                <Label title>
                                    {this.props.offered_candidate.length}
                                </Label>
                            </KeyValueWrapper>
                            <KeyValueWrapper>
                                <Label title grey>
                                    Joined
                                </Label>
                                <Label title>
                                    {this.props.joined_candidate.length}
                                </Label>
                            </KeyValueWrapper>
                        </RowWrapper>
                    </ContentWrapper>
                    <ContentWrapper
                        style={{
                            paddingLeft: "0",
                        }}
                    >
                        <RowWrapper
                            style={{
                                gap: "1rem",
                            }}
                        >
                            <KeyValueWrapper>
                                <Label title grey>
                                    Number of accepted candidates
                                </Label>
                                <Label title>0</Label>
                            </KeyValueWrapper>
                            <KeyValueWrapper>
                                <Label title grey>
                                    Number of candidates in process
                                </Label>
                                <Label title>0</Label>
                            </KeyValueWrapper>
                            <KeyValueWrapper>
                                <Label title grey>
                                    Number of candidates in rejected
                                </Label>
                                <Label title>
                                    {this.props.rejected_candidate.length}
                                </Label>
                            </KeyValueWrapper>
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    padding: "1rem 0 0 0",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button type="dark" label="Full Description" />
                            </div>
                        </RowWrapper>
                    </ContentWrapper>
                </KeyValueWrapper>
            </JobDetailsWrapper>
        );
    }
}

export default JobDetails;
