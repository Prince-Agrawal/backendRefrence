import React, { Component } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
    getMonthlySchedule,
    completeInterviewStage,
} from "../../../Redux/actions/Client/PanelActions";
import { connect } from "react-redux";
import BottomUpModal from "../../../Reusuable/Components/Interactive/BottomUpModal/BottomUpModal";
import { EventsWrapper, Event, ButtonWrapper } from "./style";
import SectionHeader from "../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import Button from "../../../Reusuable/Components/Interactive/Button/Button";
import CandidateUpdate from "../../Candidates/JobCandidates/Components/CandidateUpdateForm/CandidateUpdate";

const localizer = momentLocalizer(moment);
export class SchedulesMonth extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        const currYear = date.getFullYear();
        const currMonth = date.getMonth() + 1;
        const currDate = String(date.getDate()).padStart(2, "0");

        const formattedDate = currDate + "/" + currMonth + "/" + currYear;

        this.props.getMonthlySchedule(formattedDate);
    }
    state = {
        events: [],
        popupEvents: [],
        selectedEvent: {},
        showModal: false,
        isCompletedTapped: false,
        isRescheduleTapped: false,
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.monthlySchedule !== this.props.monthlySchedule) {
            console.log(
                this.props.monthlySchedule &&
                    Object.keys(this.props.monthlySchedule).length
            );
            if (
                this.props.monthlySchedule &&
                Object.keys(this.props.monthlySchedule).length
            ) {
                let events = [];
                Object.keys(this.props.monthlySchedule).forEach((key) => {
                    this.props.monthlySchedule[key].forEach((schedule) => {
                        var dateString = `${key}`;
                        var dateParts = dateString.split("/");
                        let date = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`;
                        events.push({
                            start: date,
                            end: date,
                            status: schedule.status,
                            candidate_id: schedule.candidate_id,
                            eventClasses: "optionalEvent",
                            title: `${schedule.status} for ${schedule.name} in ${schedule.job_title}`,
                            backgroundColor: schedule.is_complete
                                ? "#32CD32"
                                : "rgb(49, 116, 173)",
                            stages: schedule.stages,
                            candidate_id: schedule.candidate_id,
                            job_id: schedule.job_id,
                        });
                    });
                });
                this.setState({ events });
            }
        }
        if (
            prevProps.isInterviewStageCompleted !==
            this.props.isInterviewStageCompleted
        ) {
            if (this.props.isInterviewStageCompleted) {
                this.toggleModal();
            }
        }
    }
    toggleModal = () => {
        this.setState({
            showModal: false,
            popupEvents: [],
            selectedEvent: null,
            isRescheduleTapped: false,
            isCompletedTapped: false,
        });
    };

    onRecheduleClick = () => {
        this.setState({ isRescheduleTapped: true });
    };

    onCompletedClick = () => {
        this.setState({ isCompletedTapped: true });
        const data = {};
        data["candidate_id"] = this.state.selectedEvent.candidate_id;
        data["status"] = this.state.selectedEvent.status;
        this.props.completeInterviewStage(data);
    };

    eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event);
        var backgroundColor = event.backgroundColor;
        var style = {
            backgroundColor: backgroundColor,
        };
        return {
            style: style,
        };
    };

    render() {
        let modalContent;
        if (
            this.state.selectedEvent &&
            Object.keys(this.state.selectedEvent).length
        ) {
            modalContent = (
                <EventsWrapper>
                    <SectionHeader
                        small
                        title={this.state.selectedEvent.title}
                    />
                    {this.state.isRescheduleTapped ? (
                        <CandidateUpdate
                            noTitle
                            readOnly
                            stages={this.state.selectedEvent.stages}
                            currentStage={this.state.selectedEvent.status}
                            candidateID={this.state.selectedEvent.candidate_id}
                            candidateUpdated={this.toggleModal}
                            jobID={this.state.selectedEvent.job_id}
                        />
                    ) : this.state.isCompletedTapped ? null : (
                        <ButtonWrapper>
                            <Button
                                buttonClick={this.onCompletedClick}
                                type="dark"
                                label="Completed"
                            />
                            <Button
                                buttonClick={this.onRecheduleClick}
                                type="light"
                                label="Reschedule"
                            />
                        </ButtonWrapper>
                    )}
                </EventsWrapper>
            );
        } else if (this.state.popupEvents.length) {
            modalContent = (
                <EventsWrapper>
                    <SectionHeader
                        small
                        title={this.state.popupEvents[0].start}
                    />
                    {this.state.popupEvents.map((event) => (
                        <Event
                            onClick={() => {
                                this.setState({
                                    showModal: true,
                                    selectedEvent: event,
                                });
                            }}
                            key={event.title}
                        >
                            {event.title}
                        </Event>
                    ))}
                </EventsWrapper>
            );
        }
        return (
            <div style={{ position: "relative" }}>
                {this.state.showModal && (
                    <BottomUpModal toggelModal={this.toggleModal}>
                        {modalContent}
                    </BottomUpModal>
                )}
                <Calendar
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    views={["month", "agenda"]}
                    onShowMore={(events, date) =>
                        this.setState({ showModal: true, popupEvents: events })
                    }
                    onSelectEvent={(event, e) => {
                        this.setState({
                            showModal: true,
                            selectedEvent: event,
                        });
                    }}
                    eventPropGetter={this.eventStyleGetter}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    monthlySchedule: state.client.panel.monthlySchedule,
    isInterviewStageCompleted: state.client.panel.isInterviewStageCompleted,
});

const mapDispatchToProps = {
    getMonthlySchedule,
    completeInterviewStage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SchedulesMonth);
