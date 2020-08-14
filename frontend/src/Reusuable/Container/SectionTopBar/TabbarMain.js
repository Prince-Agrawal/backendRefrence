import React from "react";

import { withRouter } from "react-router-dom";

import Tab from "../../../Reusuable/Components/Interactive/Tab/Tab";
import IconLabel from "../../../Reusuable/Components/View/IconLabel/IconLabel";
import { SectionTabbarWrapper, TabWrapper, IconWrapper } from "./style";

const TabbarMain = (props) => {
    return (
        <SectionTabbarWrapper>
            {/* Leading Tabs */}
            <TabWrapper>
                {props.tabs.map((tab, i) => (
                    <Tab
                        normal
                        key={tab.id}
                        tabClick={() => props.tabClick(tab.id)}
                        active={tab.active}
                        label={tab.name}
                    />
                ))}
            </TabWrapper>
            {/* Ending Tools */}
            <TabWrapper>
                {props.actions?.map((action, i) => (
                    <IconWrapper key={i}>
                        <IconLabel icon={action.image} />
                    </IconWrapper>
                ))}
            </TabWrapper>
        </SectionTabbarWrapper>
    );
};

export default withRouter(TabbarMain);
