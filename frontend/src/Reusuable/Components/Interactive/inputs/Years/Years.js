import React from "react";
import { YearsMenu, YearsField, DropdownContainer, Dropdown } from "./style";
import Textfield from "../text-field/text-field";

const Years = (props) => {
    const dropdownMenu = JSON.parse(JSON.stringify(props.dropdownMenu));
    let label = dropdownMenu.field.label;
    dropdownMenu.field.label = "";
    dropdownMenu.field.placeholder = "Years";
    return (
        <YearsMenu>
            <YearsField onClick={() => props.handleDropdowntoggle()}>
                <Textfield
                    textfield={dropdownMenu.field}
                    handleFieldBtnClick={() => {}}
                    handleInputValueChange={props.handleInputValueChange}
                />
            </YearsField>
            {dropdownMenu.toggle ? (
                <DropdownContainer>
                    {dropdownMenu.dropdown.map((dropdown) => (
                        <Dropdown
                            key={dropdown.id}
                            selected={dropdown.state === "selected"}
                            onClick={() =>
                                props.handleDropdownClick(dropdown.name)
                            }
                        >
                            {dropdown.name}
                        </Dropdown>
                    ))}
                </DropdownContainer>
            ) : null}
        </YearsMenu>
    );
};

export default Years;
