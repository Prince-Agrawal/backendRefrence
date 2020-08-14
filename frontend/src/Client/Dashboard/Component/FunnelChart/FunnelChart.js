import CanvasJSReact from "../../../../Assets/CanvasChart/canvasjs.react";
import React from "react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function FunnelChart(props) {
    var dataPoint;
    var total;
    const options = {
        animationEnabled: true,
        title: {
            ...props.title,
        },
        data: props.data,
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
        <>
            <CanvasJSChart options={options} />
        </>
    );
}
