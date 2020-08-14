import React, { Component } from "react";
import "./drop-down.css";
import TextField from "../text-field/text-field";

class Dropdown extends Component {
    render() {
        const dropdownMenu = this.props.dropdownMenu;
        return (
            <div
                style={this.props.fit ? { width: "100%" } : null}
                className="dropdown-menu"
            >
                <div
                    className="dropdown-field"
                    onClick={() => this.props.handleDropdowntoggle()}
                >
                    <TextField
                        textfield={dropdownMenu.field}
                        handleFieldBtnClick={() => {}}
                        handleInputValueChange={
                            this.props.handleInputValueChange
                        }
                    />
                </div>
                {dropdownMenu.toggle ? (
                    <div
                        style={
                            this.props.fit
                                ? {
                                      transform: "translateY(3rem)",
                                      width: " 18.3rem",
                                  }
                                : null
                        }
                        className="dropdown-container"
                    >
                        {dropdownMenu.dropdown.map((dropdown) => (
                            <div
                                key={dropdown.id}
                                className={
                                    dropdown.state === "selected"
                                        ? "dropdown-selected"
                                        : "dropdown"
                                }
                                onClick={() =>
                                    this.props.handleDropdownClick(
                                        dropdown.name
                                    )
                                }
                            >
                                {dropdown.name}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Dropdown;
