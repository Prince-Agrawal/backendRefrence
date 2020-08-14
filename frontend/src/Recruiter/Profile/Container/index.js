import React, { Component } from "react";
import { ProfileWrapper, BreadcrumpWrapper, TitleWrapper } from "./style";
import { Breadcrump } from "../../../Reusuable/Components/View/Breadcrump/Breadcrump";
import DomainExpertise from "./DomainExpertise/DomainExpertise";
import AdditionalInformation from "./AdditionalInformation/AdditionalInformation";
import PersonalIformation from "./PersonalInformation/PersonalIformation";
import { connect } from "react-redux";
import panelActionTypes from "../../../Redux/actions/Recruiter/ActionTypes";
import SectionHeader from "../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [
                {
                    id: 1,
                    label: "Personal Information",
                    active: true,
                    done: false,
                },
                {
                    id: 2,
                    label: "Domain Expertise",
                    active: false,
                    done: false,
                },
                {
                    id: 3,
                    label: "Additional Information",
                    active: false,
                    done: false,
                },
            ],
        };
    }

    handleSubmitClick = (current, next) => {
        const sections = this.state.sections.map((section) => {
            section.active = false;
            if (section.id === next) {
                section.active = true;
            }
            if (section.id === current) {
                section.done = true;
            }
            return section;
        });

        this.setState({
            sections,
        });
    };

    getActiveSection = () => {
        const activeSection = this.state.sections.find(
            (section) => section.active === true
        );
        return activeSection;
    };

    goToPreviousSection = (current, id) => {
        const sections = this.state.sections.map((section) => {
            section.active = false;
            if (section.id === id) {
                section.active = true;
            }
            if (section.id === current) {
                section.done = false;
            }
            return section;
        });
        if (id === 1) {
            this.props.personalInfoFail();
        } else if (id === 2) {
            this.props.domainExpertiseFail();
        }
        this.setState({
            sections,
        });
    };

    render() {
        const { id } = this.getActiveSection();
        return (
            <ProfileWrapper>
                <SectionHeader
                    title="Profile"
                    desc="Complete your profile to continue"
                />
                <BreadcrumpWrapper>
                    {this.state.sections.map((section) => (
                        <Breadcrump
                            key={section.id}
                            id={section.id}
                            active={section.active}
                            done={section.done}
                            label={section.label}
                        />
                    ))}
                </BreadcrumpWrapper>
                {id === 3 ? (
                    <AdditionalInformation
                        previousSection={() => this.goToPreviousSection(3, 2)}
                    />
                ) : id === 2 ? (
                    <DomainExpertise
                        previousSection={() => this.goToPreviousSection(2, 1)}
                        submitClick={() => this.handleSubmitClick(2, 3)}
                    />
                ) : (
                    <PersonalIformation
                        submitClick={() => this.handleSubmitClick(1, 2)}
                    />
                )}
            </ProfileWrapper>
        );
    }
}

const mapDispatchToProps = {
    personalInfoFail: () => (dispatch) =>
        dispatch({ type: panelActionTypes.PERSONAL_INFO_FAIL }),
    domainExpertiseFail: () => (dispatch) =>
        dispatch({ type: panelActionTypes.DOMAIN_FAIL }),
};

export default connect(null, mapDispatchToProps)(Index);
