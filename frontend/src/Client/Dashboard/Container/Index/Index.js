import React, { Component } from "react";
import { DashboardWrapper, SummaryWrapper, ChartWrapper, Label } from "./style";
import SummaryCard from "../../Component/SummaryCard/SummaryCard";
import BarChart from "../../Component/BarChart/BarChart";
import FunnelChart from "../../Component/FunnelChart/FunnelChart";
import UnactioneedCandidates from "../../Component/UnactionedJobs/UnactioneedJobs";
import InterviewScheduled from "../../Component/InterviewScheduled/InterviewScheduled";
import { getDailySchedule } from "../../../../Redux/actions/Client/PanelActions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    dailySchedule: state.client.panel.dailySchedule,
});

const mapDispatchToProps = {
    getDailySchedule,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class Index extends Component {
        constructor(props) {
            super(props);
            const date = new Date();
            const currYear = date.getFullYear();
            const currMonth = date.getMonth() + 1;
            const currDate = String(date.getDate()).padStart(2, "0");

            const formattedDate = currDate + "/" + currMonth + "/" + currYear;
            this.today = formattedDate;
            this.props.getDailySchedule(formattedDate);
        }

        render() {
            return (
                <DashboardWrapper>
                    <SummaryWrapper>
                        <SummaryCard count="20" label="Total Hired" />
                        <SummaryCard count="20" label="Apps per hire" />
                        <SummaryCard count="20" label="Avg time to hire" />
                        <SummaryCard count="20" label="Avg cost per hire" />
                        <SummaryCard count="20" label="Open positions" />
                    </SummaryWrapper>
                    <ChartWrapper>
                        <BarChart
                            title={{
                                text: "Offer Acceptance Rate by Department",
                                horizontalAlign: "left",
                                fontColor: "#10299c",
                                fontSize: 24,
                                fontFamily: "open sans",
                                padding: 16,
                            }}
                            data={[
                                {
                                    type: "bar",
                                    theme: "light2",
                                    dataPoints: [
                                        { label: "Executive Office", y: 10 },
                                        { label: "Production", y: 15 },
                                        { label: "Sales", y: 25 },
                                        { label: "IT", y: 30 },
                                        {
                                            label: "Software Engineering",
                                            y: 28,
                                        },
                                    ],
                                },
                            ]}
                        />
                    </ChartWrapper>
                    <ChartWrapper>
                        <FunnelChart
                            title={{
                                text: "Recruitment Funnel",
                                horizontalAlign: "left",
                                fontColor: "#10299c",
                                fontSize: 24,
                                fontFamily: "open sans",
                                padding: 16,
                            }}
                            data={[
                                {
                                    type: "funnel",
                                    theme: "light2",
                                    valueRepresents: "area",
                                    toolTipContent:
                                        "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                                    indexLabelPlacement: "inside",
                                    indexLabel: "{label} ({percentage}%)",
                                    dataPoints: [
                                        { y: 100, label: "Screen" },
                                        { y: 47, label: "Offer" },
                                        { y: 65, label: "Interview" },
                                        { y: 40, label: "Hire" },
                                    ],
                                },
                            ]}
                        />
                    </ChartWrapper>
                    <ChartWrapper>
                        <Label>Unactioned Candidates</Label>
                        <UnactioneedCandidates
                            unactionedJobs={[
                                {
                                    title: "title",
                                    location: "location",
                                    count: 10,
                                },
                                {
                                    title: "title",
                                    location: "location",
                                    count: 11,
                                },
                                {
                                    title: "title",
                                    location: "location",
                                    count: 12,
                                },
                            ]}
                        />
                    </ChartWrapper>
                    <ChartWrapper>
                        <Label>Today's Schedule</Label>
                        <InterviewScheduled
                            date={this.today}
                            interviewSchedule={this.props.dailySchedule}
                        />
                    </ChartWrapper>
                </DashboardWrapper>
            );
        }
    }
);
