import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import React from "react";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import { Component } from "react";

export default class Pickers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
        };
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };

    getCurrentValue = () => {
        if (this.state.selectedDate === null) return "";
        const currYear = this.state.selectedDate.getFullYear();
        const currMonth = this.state.selectedDate.getMonth() + 1;
        const currDate = String(this.state.selectedDate.getDate()).padStart(
            2,
            "0"
        );

        const formattedDate = currDate + "/" + currMonth + "/" + currYear;
        return formattedDate;
    };

    render() {
        return (
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <InputLabel
                        style={{ fontSize: "1.25rem", color: "#000" }}
                        shrink
                        htmlFor="bootstrap-input"
                    >
                        {this.props.label}
                    </InputLabel>
                    {this.props.type === "date" ? (
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="bootstrap-input"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            error={this.props.error}
                            helperText={this.props.hint}
                        />
                    ) : this.props.type === "date-dialog" ? (
                        <KeyboardDatePicker
                            margin="normal"
                            id="bootstrap-input"
                            format="dd/MM/yyyy"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            error={this.props.error}
                            helperText={this.props.hint}
                        />
                    ) : this.props.type === "time" ? (
                        <KeyboardTimePicker
                            margin="normal"
                            id="bootstrap-input"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change time",
                            }}
                            error={this.props.error}
                            helperText={this.props.hint}
                        />
                    ) : null}
                </MuiPickersUtilsProvider>
            </div>
        );
    }
}
