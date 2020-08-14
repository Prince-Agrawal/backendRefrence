import React, { Component } from "react";
import { CardWrapper, ContentWrapper } from "./style";
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import CanvasJSReact from "../../../../Assets/CanvasChart/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class FunnelChart extends Component {
    render() {
        var dataPoint;
        var total;
        const options = {
            animationEnabled: true,
            title: {
                ...this.props.title,
            },
            data: this.props.data,
        };
        //calculate percentage
        dataPoint = options.data[0].dataPoints;
        total = dataPoint[0].y;
        for (var i = 0; i < dataPoint.length; i++) {
            if (i === 0) {
                options.data[0].dataPoints[i].percentage = 100;
            } else {
                options.data[0].dataPoints[i].percentage = (
                    (dataPoint[i].y / total) *
                    100
                ).toFixed(2);
            }
        }
        return (
            <CardWrapper>
                <SectionHeader small title={this.props.title} />
                <ContentWrapper>
                    <CanvasJSChart options={options} />
                </ContentWrapper>
            </CardWrapper>
        );
    }
}
