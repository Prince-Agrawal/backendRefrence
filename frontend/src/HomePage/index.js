import React from "react";

import { Route, NavLink } from "react-router-dom";
import { Component } from "react";
import RegisterModal from "./Authentication/login-signup-modal";
import Button from "../Reusuable/Components/Interactive/Button/Button";

export default class Index extends Component {
    state = {
        modal: { name: "get started sign-in", status: false },
    };

    toggleModal = (modalName) => {
        let modal = this.state.modal;
        modal.name = modalName;
        modal.status = !modal.status;

        this.props.history.replace("/");

        this.setState({
            modal,
        });
    };

    render() {
        return (
            <>
                <Route
                    path={"/auth/:mode/"}
                    render={() => (
                        <RegisterModal
                            modal={this.state.modal}
                            handleModalToggle={this.toggleModal}
                        />
                    )}
                />

                <div
                    style={{
                        display: "grid",
                        width: "100%",
                        height: "100vh",
                        gap: "1rem",
                        gridAutoFlow: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <NavLink onClick={this.toggleModal} to="/auth/login">
                        <Button
                            type="dark"
                            buttonClick={() => {}}
                            label={"Login"}
                        />
                    </NavLink>
                    <NavLink onClick={this.toggleModal} to="/auth/register">
                        <Button
                            type="dark"
                            buttonClick={() => {}}
                            label={"Register"}
                        />
                    </NavLink>
                </div>
            </>
        );
    }
}
