import React, { Component } from "react";
import "./text-btn.css";

class TextBtn extends Component {
  state = {
    // button: {
    //   id: 1,
    //   style: "secondary",
    //   text: "Sign in"
    // }
  };

  getBtnClasses = style => {
    if (style === "contained") {
      return "contained-btn";
    } else if (style === "outline") {
      return "outline-btn";
    } else if (style === "text") {
      return "text-btn";
    }
  };
  render() {
    let button = this.props.button;
    return (
      <button
        className={this.getBtnClasses(button.style)}
        key={button.id}
        name={button.name}
        onClick={this.props.handleBtnClick}>
        {button.text}
      </button>
    );
  }
}

export default TextBtn;
