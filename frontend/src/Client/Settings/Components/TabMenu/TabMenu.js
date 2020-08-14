import React from "react";
import { TabMenuWrapper, TabMenu as Menu } from "./style";

export default function TabMenu(props) {
    return (
        <TabMenuWrapper>
            {props.tabs.map((tab) => {
                return (
                    <Menu
                        onClick={() => props.tabClick(tab.id)}
                        active={tab.active}
                    >
                        {tab.label}
                    </Menu>
                );
            })}
        </TabMenuWrapper>
    );
}
