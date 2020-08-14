import CanvasJSReact from "../../../../Assets/CanvasChart/canvasjs.react";
import React from 'react'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function BarChart(props) {
    const options = {
        animationEnabled: true,
        
        axisX: {
            labelFontFamily: "open sans",
        },
        axisY: {
            labelFontFamily: "open sans",
        },

        // documentation for title :
        //  https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/title/
        title: {
            ...props.title,
        },
        // Domentaion for Data:
        // https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/working-with-data/
        data: props.data,
    };

    return (
        <>
            <CanvasJSChart
                options={options}
            />
        </>
    );
}

