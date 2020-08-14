import React, { useEffect } from "react";
import { useState } from "react";
import {
    ChangePasswordWrapper,
    InputFieldWrapper,
    SubmitWraper,
    SubmitButtonWrapper,
} from "./style";
import hideIcon from "../../../Assets/Images/hide-icon.png";
import showIcon from "../../../Assets/Images/show-icon.png";
import SectionHeader from "../../Components/Interactive/SectionHeader/SectionHeader";
import Textfield from "../../Components/Interactive/inputs/text-field/text-field";
import Button from "../../../Reusuable/Components/Interactive/Button/Button";

export default function ChangePassword(props) {
    const [textfields, settextfields] = useState([
        {
            id: 1,
            inputType: "password",
            state: "normal",
            name: "current password",
            label: "Current Password",
            placeholder: "••••••••",
            value: "",
            imgBtn: hideIcon,
            readOnly: false,
        },
        {
            id: 2,
            inputType: "password",
            state: "normal",
            name: "new password",
            label: "New Password",
            placeholder: "••••••••",
            value: "",
            imgBtn: hideIcon,
            readOnly: false,
        },
        {
            id: 3,
            inputType: "password",
            state: "normal",
            name: "confirm password",
            label: "Confirm Password",
            placeholder: "••••••••",
            value: "",
            imgBtn: hideIcon,
            readOnly: false,
        },
    ]);

    const handlePasswordTextToggle = (id) => {
        if (textfields[id].inputType === "password") {
            textfields[id].inputType = "text";
            textfields[id].imgBtn = showIcon;
        } else {
            textfields[id].inputType = "password";
            textfields[id].imgBtn = hideIcon;
        }
        settextfields(JSON.parse(JSON.stringify(textfields)));
    };

    const handleInputValueChange = (index, event) => {
        textfields[index].value = event.target.value;
        settextfields(JSON.parse(JSON.stringify(textfields)));
    };

    const isFormValid = () => {
        let valid = true;
        textfields.forEach((textfield) => {
            if (!(textfield.value.trim().length > 0)) {
                valid = false;
                textfield.state = "error";
                textfield.hint = `Please provide ${textfield.name}`;
            } else {
                textfield.state = "normal";
                textfield.hint = ``;
            }
        });

        if (valid) {
            if (textfields[1].value !== textfields[2].value) {
                valid = false;
                textfields[1].state = "error";
                textfields[2].state = "error";
                textfields[1].hint = "Password doesn't match";
                textfields[2].hint = "Password doesn't match";
            } else if (textfields[0].value === textfields[1].value) {
                valid = false;
                textfields[1].state = "error";
                textfields[2].state = "error";
                textfields[1].hint =
                    "New password cannot be same as previous password";
                textfields[2].hint =
                    "New password cannot be same as previous password";
            }
        }

        if (valid) {
            const data = {
                current_password: textfields[0].value,
                new_password: textfields[1].value,
            };
            props.formSubmit(data);
        } else {
            settextfields(JSON.parse(JSON.stringify(textfields)));
        }
    };

    useEffect(() => {
        if (props.passwordChanged) {
            textfields[0].state = "error";
            textfields[0].hint = "Invalid Credential";
            settextfields(JSON.parse(JSON.stringify(textfields)));
        }
    }, [props.passwordChanged]);

    return (
        <ChangePasswordWrapper>
            <SectionHeader
                title="Change Password"
                desc="Please fill the below details to change the password"
            />
            <InputFieldWrapper>
                {textfields.map((textfield, index) => {
                    return (
                        <Textfield
                            textfield={textfield}
                            key={textfield.id}
                            handleInputValueChange={(event) =>
                                handleInputValueChange(index, event)
                            }
                            handleFieldBtnClick={() =>
                                handlePasswordTextToggle(index)
                            }
                        />
                    );
                })}
            </InputFieldWrapper>
            <SubmitWraper>
                <SubmitButtonWrapper>
                    <Button
                        label="Cancel"
                        buttonClick={props.cancelChangePassword}
                    />
                    <Button
                        type="dark"
                        label="Submit"
                        buttonClick={isFormValid}
                    />
                </SubmitButtonWrapper>
            </SubmitWraper>
        </ChangePasswordWrapper>
    );
}
