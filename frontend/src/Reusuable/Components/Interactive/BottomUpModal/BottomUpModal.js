import React from "react";
import {
    BackDrop,
    ModalWrapper,
    ModalContainer,
    CloseIconWrapper,
} from "./style";

import IconLabel from "../../View/IconLabel/IconLabel";
import CloseIcon from "../../../../Assets/Icons/Close-Icon/close icon.svg";
import { useState } from "react";
import { useEffect } from "react";

export default function BottomUpModal(props) {
    useEffect(() => {
        window.document.body.style.height = "100vh";
        window.document.body.style.overflowY = `hidden`;
        window.document.body.style.paddingRight = `15px`;
        return () => {
            window.document.body.style.height = "";
            window.document.body.style.overflowY = ``;
            window.document.body.style.paddingRight = `0`;
        };
    }, []);
    const [goDown, setGoDown] = useState(false);
    if (props.closeModal) {
        setGoDown(true);
        setTimeout(() => {
            props.toggelModal();
        }, 450);
    }
    return (
        <ModalContainer>
            <BackDrop
                onClick={() => {
                    setGoDown(true);
                    setTimeout(() => {
                        props.toggelModal();
                    }, 450);
                }}
            />
            <ModalWrapper cover={props.cover} goDown={goDown}>
                <CloseIconWrapper
                    cover={props.cover}
                    onClick={() => {
                        setGoDown(true);
                        setTimeout(() => {
                            props.toggelModal();
                        }, 450);
                    }}
                >
                    <IconLabel icon={CloseIcon} />
                </CloseIconWrapper>
                {props.children}
            </ModalWrapper>
        </ModalContainer>
    );
}
