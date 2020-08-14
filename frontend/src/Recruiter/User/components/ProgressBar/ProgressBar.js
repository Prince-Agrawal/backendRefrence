import React from "react";

const ProgressBar = (props) => {
    const { from, to, badge, completed } = props;

    const containerStyles = {
        height: "1rem",
        width: "80%",
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: " 0 auto",
    };

    const fillerStyles = {
        height: "100%",
        width: `${completed}%`,
        backgroundColor: "#10299C",
        borderRadius: "inherit",
        textAlign: "right",
    };

    const fromLabel = {
        color: "#979797",
        fontSize: ".75rem",
        float: "left",
    };
    const toLabel = {
        fontSize: ".75rem",
        color: "#979797",
        float: "right",
    };

    return (
        <div style={{ display: "block", marginBottom: "1rem" }}>
            <div style={containerStyles}>
                <div style={fillerStyles}></div>
                <div style={{ display: "block" }}>
                    <span style={fromLabel}>Lvl {" " + from}</span>
                    <span style={toLabel}>Lvl {" " + to}</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
