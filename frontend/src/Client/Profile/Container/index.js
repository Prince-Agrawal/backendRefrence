import React, { Component } from "react";
import { ProfileWrapper, BreadcrumpWrapper, TitleWrapper } from "./style";
import { Breadcrump } from "../../../Reusuable/Components/View/Breadcrump/Breadcrump";
import AboutCompany from "./AboutCompany/AboutCompany";
import BillingInformation from "./BillingInformation/BillingInformation";
import CompanyInformation from "./CompanyInformation/CompanyInformation";
import { connect } from "react-redux";
import ActionTypes from "../../../Redux/actions/Client/ActionTypes";
import SectionHeader from "../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [
                {
                    id: 1,
                    label: "Company Information",
                    active: true,
                    done: false,
                },
                {
                    id: 2,
                    label: "About Company",
                    active: false,
                    done: false,
                },
                {
                    id: 3,
                    label: "Billing Information",
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
            this.props.comapanyInfoFail();
        } else if (id === 2) {
            this.props.aboutCompanyFail();
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
                    <BillingInformation
                        previousSection={() => this.goToPreviousSection(3, 2)}
                    />
                ) : id === 2 ? (
                    <AboutCompany
                        previousSection={() => this.goToPreviousSection(2, 1)}
                        submitClick={() => this.handleSubmitClick(2, 3)}
                    />
                ) : (
                    <CompanyInformation
                        submitClick={() => this.handleSubmitClick(1, 2)}
                    />
                )}
            </ProfileWrapper>
        );
    }
}

const mapDispatchToProps = {
    comapanyInfoFail: () => (dispatch) =>
        dispatch({ type: ActionTypes.COMPANY_INFO_FAIL }),
    aboutCompanyFail: () => (dispatch) =>
        dispatch({ type: ActionTypes.ABOUT_COMPANY_FAIL }),
};

export default connect(null, mapDispatchToProps)(Index);
