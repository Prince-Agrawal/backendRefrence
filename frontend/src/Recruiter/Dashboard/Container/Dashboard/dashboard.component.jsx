import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import {
    getLiveJobs,
    getAcceptedJobs,
    getRejectedJobs,
} from "../../../../Redux/actions/Recruiter/panel.actions";

import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import {
    HorizontalWrapper,
    HorizontalWrapperFilled,
    DashboardWrapper,
} from "./style";
import SummaryCard from "../../Components/SummaryCard/SummaryCard";
import DoughnutChart from "../../Components/DoughnutChart/DoughnutChart";
import FunnelChart from "../../Components/FunnelChart/FunnelChart";

class Dashboard extends Component {
    componentDidMount() {
        this.props.getLiveJobs();
        this.props.getAcceptedJobs();
        this.props.getRejectedJobs();
    }

    render() {
        return (
            <DashboardWrapper>
                <SectionHeader
                    title="Dashboard"
                    desc="Review your activities. Based on your performance"
                />
                <HorizontalWrapper>
                    <SummaryCard
                        count={
                            this.props.liveJobs?.length >= 0
                                ? this.props.liveJobs?.length
                                : "..."
                        }
                        title="live jobs"
                    />
                    <SummaryCard
                        count={
                            this.props.acceptedJobs?.length >= 0
                                ? this.props.acceptedJobs.length
                                : "..."
                        }
                        title="accepted jobs"
                    />
                    <SummaryCard
                        count={
                            this.props.rejectedJobs?.length >= 0
                                ? this.props.rejectedJobs.length
                                : "..."
                        }
                        title="rejected jobs"
                    />
                </HorizontalWrapper>
                <HorizontalWrapperFilled>
                    <DoughnutChart
                        data={{
                            labels: ["Accepted", "Rejected", "Pending"],
                            datasets: [
                                {
                                    data: [300, 50, 100],
                                    backgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56",
                                    ],
                                    hoverBackgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56",
                                    ],
                                },
                            ],
                        }}
                        title="candidates on board"
                    />
                    <FunnelChart
                        title="Recruitment Funnel"
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
                    <DoughnutChart
                        data={{
                            labels: ["Live", "Accepted", "Rejected"],
                            datasets: [
                                {
                                    data: [300, 50, 100],
                                    backgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56",
                                    ],
                                    hoverBackgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56",
                                    ],
                                },
                            ],
                        }}
                        title="jobs on board"
                    />
                </HorizontalWrapperFilled>
            </DashboardWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    liveJobs: state.recruiter.panel.liveJobs,
    acceptedJobs: state.recruiter.panel.acceptedJobs,
    rejectedJobs: state.recruiter.panel.rejectedJobs,
});

const mapDispatchToProps = {
    getLiveJobs,
    getAcceptedJobs,
    getRejectedJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
