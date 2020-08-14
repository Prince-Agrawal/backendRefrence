import React, { Component } from "react";
import { CardWrapper, ContentWrapper, Svg } from "./style";

import { Doughnut } from "react-chartjs-2";
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import Pie from "./Pie";

export default class DoughnutChart extends Component {
    render() {
        let width = 200;
        let height = 200;
        let minViewportSize = Math.min(width, height);
        // This sets the radius of the pie chart to fit within
        // the current window size, with some additional padding
        let radius = (minViewportSize * 0.9) / 2;

        // Centers the pie chart
        let x = width / 2;
        let y = height / 2;

        return (
            <CardWrapper>
                <SectionHeader small title={this.props.title} />
                <ContentWrapper>
                    {/* Example Chart made by d3.js */}
                    {/* <Svg>
                        <Pie
                            x={x}
                            y={y}
                            innerRadius={radius * 0.7}
                            outerRadius={radius}
                            cornerRadius={0}
                            padAngle={0.02}
                            data={[58, 67, 22]}
                        />
                    </Svg> */}
                    <Doughnut
                        options={{
                            maintainAspectRatio: false,
                            cutoutPercentage: 70,
                            legend: {
                                position: "bottom",
                            },
                        }}
                        data={this.props.data}
                    />
                </ContentWrapper>
            </CardWrapper>
        );
    }
}
