import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./PostJobButton.module.css";

export default class PostJobButton extends Component {

    state = {
        hover: false
    }

    hoverLeaveHandler = () => {
        this.setState({hover: false})
    }

    hoverEnterHandler = ()=>{
        this.setState({hover: true})
    }

    render() {

        const animatedClass = [classes.Top];

        if(this.state.hover) {
            animatedClass.push(classes.MoveLeft)
        }

        const animatedButton = [classes.Bottom];

        if(this.state.hover){
            animatedButton.push(classes.BottomHover)
        }

        return (
            <React.Fragment>
                <div
                    onMouseEnter={this.hoverEnterHandler}
                    className={animatedClass.join(" ")}
                ></div>
                <Link
                    onMouseOut={this.hoverLeaveHandler}
                    to={this.props.link}
                    className={animatedButton.join(" ")}
                >
                    {this.props.name}
                </Link>
            </React.Fragment>
        );
    }
}
