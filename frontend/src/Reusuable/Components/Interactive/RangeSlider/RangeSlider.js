import React from "react";
import Slider from "@material-ui/core/Slider";

export default function RangeSlider(props) {
    const [value, setValue] = React.useState([props.range[0], props.range[1]]);

    const handleChangeLocally = (event, newValue) => {
        setValue(newValue);
    };

    const marks = [];

    let start = 0;
    let end = 30;
    const step = end / 5;
    for (let i = 0; i < 5; i++) {
        marks.push({
            value: start,
            label: start,
        });
        start += step;
    }
    marks.push({
        value: start,
        label: start,
    });

    return (
        <div style={{ padding: "1.5rem 1rem 0 1rem" }}>
            <Slider
                value={value}
                onChange={handleChangeLocally}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                onChangeCommitted={props.handleChange}
                marks={marks}
                max={30}
            />
        </div>
    );
}
