import React from "react";
import { SecondarySideBarWrapper, SideBar, Icon, Label } from "./style";
import { useState } from "react";

export default function SecondarySideBar(props) {
    return (
        <SecondarySideBarWrapper>
            {props.sidebar.map((item) => (
                <div key={item.id} style={{ position: "relative" }}>
                    {item.active ? <Label>{item.label}</Label> : null}
                    <SideBar
                        onMouseLeave={() =>
                            props.onSideBarHover(item.id, false)
                        }
                    >
                        <Icon
                            onMouseEnter={() => {
                                props.onSideBarHover(item.id, true);
                            }}
                            onClick={() => props.sideBarClick(item.id)}
                            src={item.icon}
                        />
                    </SideBar>
                </div>
            ))}
        </SecondarySideBarWrapper>
    );
}
