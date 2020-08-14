import React, { Component } from "react";
import * as d3 from "d3";
import Slice from "./Slice";
export class Pie extends Component {
    constructor(props) {
        super(props);
        // https://github.com/d3/d3/wiki/Ordinal-Scales#category10
        this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        this.renderSlice = this.renderSlice.bind(this);
    }

    render() {
        let { x, y, data } = this.props;
        // https://github.com/d3/d3/wiki/Pie-Layout
        let pie = d3.pie();
        return (
            <g transform={`translate(${x}, ${y})`}>
                {/* Render a slice for each data point */}
                {pie(data).map(this.renderSlice)}
            </g>
        );
    }

    renderSlice(value, i) {
        let { innerRadius, outerRadius, cornerRadius, padAngle } = this.props;

        return (
            <Slice
                key={i}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                cornerRadius={cornerRadius}
                padAngle={padAngle}
                value={value}
                label={value.data}
                fill={this.colorScale(i)}
            />
        );
    }
}

export default Pie;
