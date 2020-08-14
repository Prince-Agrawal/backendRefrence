import React from "react";
import { Wrapper, Select, Label, MainWrapper } from "./style";

export default function SelectBoxHorizontal(props) {
    /*
        state = {
             selectBoxes: [
                {
                    name: "selectBox1",  => required => string => unique
                    options: [           => required => array => number of selectboxes needed in a horizontal line
                        {
                            id: 0,           => required => number => unique
                            active: true,    => required => boolean
                            label: "Value",  => required => string => unique
                        },
                    ],
                },
                {
                    name: "selectBox1Label", => with label
                    label: "Label",          => optional => string => label for the 
                                                                      whole selectBoxHorizontal

                    options: [    
                        {
                            id: 0,
                            active: true,    
                            label: "Value",
                        },
                    ],
                },
            ],
        
        handleSelectBoxOptionClick = (clickSelectBoxName, clickOptionId) => {
        const selectBoxes = this.state.selectBoxes;
        
        selectBoxes.map((selectBox) => {
            if (selectBox.name === clickSelectBoxName) {
                selectBox.options.map((option) => {
                    if (option.id === clickOptionId) option.active = !option.active;
                    else option.active = false;
                    return option;
                });
            }
            return selectBox;
        });

        this.setState({
            selectBoxes,
        });
    };

        Example : {this.state.selectBoxes.map((selectBox) => (
                    <Select
                        selectBox={selectBox}
                        handleOptionClick={this.handleSelectBoxOptionClick}
                    />
                ))}
    */

    return (
        <MainWrapper>
            {props.selectBox.label ? (
                <Label>{props.selectBox.label}</Label>
            ) : null}
            <Wrapper>
                {props.selectBox.options.map((option,index) => (
                    <Select
                        key={option.id}
                        index={index}
                        length={props.selectBox.options.length}
                        active={option.active}
                        onClick={() =>
                            props.handleOptionClick(
                                props.selectBox.name,
                                option.id
                            )
                        }
                    >
                        {option.label}
                    </Select>
                ))}
            </Wrapper>
        </MainWrapper>
    );
}
