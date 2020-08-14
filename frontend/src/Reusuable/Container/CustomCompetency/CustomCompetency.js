import React, { Component } from "react";
import { FilterPanelWrapper, Label, TagWrapper, RowWrapper } from "./style";
import Tag from "../../Components/Interactive/Tag/tag";
import Textfield from "../../Components/Interactive/inputs/text-field/text-field";
import Dropdown from "../../Components/Interactive/inputs/drop-down/drop-down";
import RangeSlider from "../../Components/Interactive/RangeSlider/RangeSlider";
import Checkbox from "../../Components/Interactive/Checkbox/Checkbox";

export class CustomCompetency extends Component {
    render() {
        return (
            <FilterPanelWrapper float={this.props.float}>
                <Label style={{ marginBottom: "1rem" }} heading bold>
                    {this.props.title || "CUSTOM COMPETENCY"}
                </Label>
                {this.props.filters?.map((filter, index) => (
                    <RowWrapper>
                        <Label title bold>
                            {filter.name}
                        </Label>
                        {filter.type === "textfield" ? (
                            <>
                                <TagWrapper>
                                    {filter.filterValues.map(
                                        (tag, tagIndex) => (
                                            <Tag
                                                key={index}
                                                tag={{
                                                    id: index + 1,
                                                    label: tag,
                                                }}
                                                handleCloseBtnClick={() =>
                                                    this.props.removeTag(
                                                        index,
                                                        "filters",
                                                        tagIndex
                                                    )
                                                }
                                                small
                                            />
                                        )
                                    )}
                                </TagWrapper>
                                <Textfield
                                    textfield={filter.filterField}
                                    handleFieldBtnClick={() =>
                                        this.props.addTag(index, "filters")
                                    }
                                    handleInputValueChange={(event) =>
                                        this.props.textfieldChange(
                                            event,
                                            "filters",
                                            index
                                        )
                                    }
                                    handleKeyPress={(event) =>
                                        this.props.textfieldKeyPress(
                                            event,
                                            "filters",
                                            index
                                        )
                                    }
                                />
                            </>
                        ) : filter.type === "dropdown-with-range-slider" ? (
                            <>
                                <Dropdown
                                    fit
                                    dropdownMenu={filter.filterField}
                                    handleDropdowntoggle={() => {
                                        this.props.handleDropdowntoggle(
                                            "filters",
                                            index
                                        );
                                    }}
                                    handleDropdownClick={(name) => {
                                        this.props.handleDropdownClick(
                                            "filters",
                                            index,
                                            name
                                        );
                                    }}
                                />
                                <RangeSlider
                                    range={[filter.start, filter.end]}
                                    handleChange={(event, value) =>
                                        this.props.handleSliderChange(
                                            event,
                                            value,
                                            index
                                        )
                                    }
                                />
                            </>
                        ) : filter.type === "dropdown" ? (
                            <>
                                <TagWrapper>
                                    {filter.filterValues?.map(
                                        (tag, tagIndex) => (
                                            <Tag
                                                key={index}
                                                tag={{
                                                    id: index + 1,
                                                    label: tag,
                                                }}
                                                handleCloseBtnClick={() =>
                                                    this.props.removeTag(
                                                        index,
                                                        "filters",
                                                        tagIndex
                                                    )
                                                }
                                                small
                                            />
                                        )
                                    )}
                                </TagWrapper>
                                <Dropdown
                                    fit
                                    dropdownMenu={filter.filterField}
                                    handleDropdowntoggle={() => {
                                        this.props.handleDropdowntoggle(
                                            "filters",
                                            index
                                        );
                                    }}
                                    handleDropdownClick={(name) => {
                                        this.props.handleDropdownClick(
                                            "filters",
                                            index,
                                            name
                                        );
                                    }}
                                    handleInputValueChange={(event) =>
                                        this.props.handleDropdownInputValueChange(
                                            event,
                                            "filters",
                                            index
                                        )
                                    }
                                />
                            </>
                        ) : filter.type === "range-slider" ? (
                            <RangeSlider
                                range={[filter.start, filter.end]}
                                handleChange={(event, value) =>
                                    this.props.handleSliderChange(
                                        event,
                                        value,
                                        index
                                    )
                                }
                            />
                        ) : filter.type === "checkbox" ? (
                            <RowWrapper>
                                {filter.filterField.map((checkbox) => (
                                    <Checkbox
                                        id={checkbox.id}
                                        key={checkbox.id}
                                        active={checkbox.active}
                                        label={checkbox.label}
                                        checkboxClick={() =>
                                            this.props.handleCheckboxClick(
                                                "filters",
                                                index,
                                                checkbox.id
                                            )
                                        }
                                    />
                                ))}
                            </RowWrapper>
                        ) : null}
                    </RowWrapper>
                ))}
            </FilterPanelWrapper>
        );
    }
}

export default CustomCompetency;
