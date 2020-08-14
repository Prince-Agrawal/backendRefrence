import React from "react";
import IconUrgent from "../../../../../../Assets/Icons/Jobs-Icons/Job-Card/Urgent.png";
import {
    CardWrapper,
    HeaderWrapper,
    SecondaryWrapper,
    MainContent,
    Footer,
    TableData,
} from "./style";
import IconLabel from "../../../../../../Reusuable/Components/View/IconLabel/IconLabel";

export default function JobCard(props) {
    /*
       state = {
                id: 1,
                title: "Game Developer",
                location: "Location",
                date: "Date",
                status: "0",
                screen: "10",
                offers: "0",
                interview: "0",
                onHolds: "0",
                rejected: "0",
                candidates: "20",
                toReview: true,
                urgent: true,
            },

    */
    return (
        <CardWrapper onClick={props.jobCardClick}>
            <TableData>
                <span>{+props.index + 1 ? props.index + 1 : "--"}</span>
            </TableData>
            <TableData>
                <div style={{ display: "inline-flex" }}>
                    <span style={{ marginRight: "10px" }}>
                        {props.job_title}
                    </span>
                    {props.urgency_to_hire ? (
                        <IconLabel icon={IconUrgent} />
                    ) : null}
                </div>
            </TableData>
            <TableData>
                <span>
                    {+props.no_of_positions ? props.no_of_positions : "--"}
                </span>
            </TableData>
            <TableData>
                <span>{+props.count ? props.count : "--"}</span>
            </TableData>
            <TableData>
                <span>{props.location ? props.location : "--"}</span>
            </TableData>
            <TableData>
                <span>{props.joining_date ? props.joining_date : "--"}</span>
            </TableData>

            {/* <HeaderWrapper>
                <div>
                    <span>{props.job_title}</span>
                    {props.urgency_to_hire ? (
                        <IconLabel icon={IconUrgent} />
                    ) : null}
                </div>
                <label>
                    {props.location}, {props.joining_date}
                </label>
            </HeaderWrapper>
            <SecondaryWrapper>
                <span>Status</span>
                <label>
                    {+props.status ? props.status : "--"}
                    {" / 4"}
                </label>
            </SecondaryWrapper>
            <MainContent>
                <div>
                    <div>
                        <span>Screen</span>
                        <span>{+props.screen ? props.screen : "--"}</span>
                    </div>
                    <div>
                        <span>Offers</span>
                        <span>{+props.offers ? props.offers : "--"}</span>
                    </div>
                    <div>
                        <span>Rejected</span>
                        <span>{+props.rejected ? props.rejected : "--"}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Interview</span>
                        <span>{props.interview}</span>
                    </div>
                    <div>
                        <span>On Holds</span>
                        <span>{+props.onHolds ? props.onHolds : "--"}</span>
                    </div>
                </div>
            </MainContent>
            <Footer toReview={props.toReview} onClick={props.candidatesClick}>
                <span>Candidates</span>
                <span>
                    {+props.no_of_positions ? props.no_of_positions : "--"}
                </span>
            </Footer> */}
        </CardWrapper>
    );
}
