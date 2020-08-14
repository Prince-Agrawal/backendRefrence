import React from "react";
import { DropdownMenuWrapper, ContentWrapper } from "./style";

const DropdownMenu = (props) => {
    return (
        <DropdownMenuWrapper onMouseLeave={props.dropdownClick}>
            {props.menus.map((menu) => (
                <ContentWrapper onClick={props.dropdownClick}>
                    {menu}
                </ContentWrapper>
            ))}
        </DropdownMenuWrapper>
    );
};

export default DropdownMenu;
