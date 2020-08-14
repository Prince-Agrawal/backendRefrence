import React, { Component } from "react";
import "./TextArea.css";
import cancelIcon from "../../../../../Assets/Images/cancel-icon.png";
import checkedIcon from "../../../../../Assets/Images/check-icon.png";
import checknoneIcon from "../../../../../Assets/Images/check-none-icon.png";

class Textarea extends Component {
    state = {
        // textField: {
        //     id: interger/string,   e.g. 1,"any"                             //unique for rendering
        //     inputType: string,     e.g. "text", "password"
        //     state: string,         e.g. "normal" or "error" or "disable"
        //     name: string,          e.g. "area name"                       //used for validation purpose
        //     label: string,         e.g. "Field Name"                       //user for visual purpose
        //     placeholder: string,   e.g. "anything",
        //     helper: string,        e.g. "This is area helper.", //
        //     prefix: string,        e.g. "$"
        //     suffix: string,        e.g. "lbs"
        //     value: string,                                                //actual area value
        //     readOnly: bool
        //     imgBtn: string,        e.g. "icon.png"                        //used for toggle area value
        // },
    };

    // handler needed
    //      handleInputValueChange  //to handle input value change
    //      handleImgBtnClick       //to toggle the input text

    getFieldClasses = (fieldState) => {
        if (fieldState === "error") {
            return "area-box-error";
        } else if (fieldState === "disable") {
            return "area-box-disable";
        } else {
            return "area-box";
        }
    };

    getHelperTextClasses = (fieldState) => {
        if (fieldState === "error") {
            return "helper-text-error";
        } else if (fieldState === "disable") {
            return "helper-text-disable";
        } else {
            return "helper-text";
        }
    };

    getTipsbox = (tipsbox, fieldname) => {
        return (
            <div className="tips-box">
                <button
                    name={fieldname}
                    onClick={this.props.toggleInputTipsbox}
                />
                {tipsbox.state ? (
                    <div className="content">
                        <div className="title">{tipsbox.title}</div>

                        <div className="description">
                            {tipsbox.type === "checklist" ? (
                                <div className="checklist">
                                    {tipsbox.checklist.map((item) => (
                                        <div className="item" key={item.id}>
                                            <img
                                                src={
                                                    item.state === null
                                                        ? checknoneIcon
                                                        : item.state
                                                        ? checkedIcon
                                                        : cancelIcon
                                                }
                                                alt={item.label}
                                            />
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-description">
                                    {tipsbox.description}
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    };

    render() {
        let textarea = this.props.textarea;

        return (
            <div className="text-area-container" key={textarea.id}>
                {textarea.label === undefined &&
                textarea.label === "" ? null : (
                    <label className="area-name" htmlFor={textarea.label}>
                        <div>{textarea.label}</div>
                        {textarea.tipsbox
                            ? this.getTipsbox(textarea.tipsbox, textarea.name)
                            : null}
                    </label>
                )}
                <div className={this.getFieldClasses(textarea.state)}>
                    {textarea.prefix === undefined ? null : (
                        <div className="prefix">{textarea.prefix}</div>
                    )}
                    <textarea
                        className="area"
                        type={textarea.inputType}
                        name={textarea.name}
                        value={textarea.value}
                        placeholder={textarea.placeholder}
                        onChange={this.props.handleInputValueChange}
                        readOnly={textarea.readOnly}
                        onKeyPress={this.props.handleKeyPress}
                        {...this.props.config}
                    />
                    {textarea.imgBtn === undefined ? null : (
                        <img
                            src={textarea.imgBtn}
                            alt=""
                            onClick={this.props.handleFieldBtnClick}
                        />
                    )}
                    {textarea.suffix === undefined ? null : (
                        <div className="suffix">{textarea.suffix}</div>
                    )}
                </div>
                {textarea.hint === undefined && textarea.hint === "" ? null : (
                    <div className={this.getHelperTextClasses(textarea.state)}>
                        {textarea.hint}
                    </div>
                )}
            </div>
        );
    }
}

export default Textarea;
