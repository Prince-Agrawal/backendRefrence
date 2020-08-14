import React, { Component } from "react";
import { SettingsWrapper } from "./style";
import TabMenu from "./Components/TabMenu/TabMenu";
import InterviewStages from "./Container/InterviewStages/InterviewStages";
import Feedback from "./Container/Feedback/Feedback";

export class Index extends Component {
    state = {
        tabs: [
            {
                id: 1,
                active: true,
                label: "Department",
            },
            {
                id: 2,
                active: false,
                label: "Feedback Template",
            },
        ],
    };

    getCurrentActiveTab = () => {
        let acitveTabID;
        this.state.tabs.forEach((tab) => {
            if (tab.active) {
                acitveTabID = tab.id;
            }
        });
        return acitveTabID;
    };
    tabClickHandler = (id) => {
        let tabs = this.state.tabs.map((tab) => {
            if (tab.id === id) {
                tab.active = true;
            } else {
                tab.active = false;
            }
            return tab;
        });
        this.setState({ tabs });
    };
    render() {
        return (
            <SettingsWrapper>
                <TabMenu
                    tabClick={this.tabClickHandler}
                    tabs={this.state.tabs}
                />
                {this.getCurrentActiveTab() === 1 ? (
                    <InterviewStages />
                ) : (
                    <Feedback />
                )}
            </SettingsWrapper>
        );
    }
}

export default Index;
