import React, { Component } from "react";
import { ProfileWrapper, BreadcrumpWrapper, TitleWrapper } from "./style";
import { Breadcrump } from "../../../Reusuable/Components/View/Breadcrump/Breadcrump";
import JobDetails from "./JobDetails/JobDetails";
import { connect } from "react-redux";
import ActionTypes from "../../../Redux/actions/Client/ActionTypes";
import SectionHeader from "../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";

class Index extends Component {
    render() {
        return (
            <ProfileWrapper>
                <SectionHeader
                    title="New Job"
                    desc="Create your new job posting here"
                />

                <JobDetails />
            </ProfileWrapper>
        );
    }
}

export default Index;
