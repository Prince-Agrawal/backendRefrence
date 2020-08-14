import React, { Component } from "react";

import { Route, Switch, withRouter } from "react-router-dom";
import { NProgress } from "@tanem/react-nprogress";
import { connect } from "react-redux";
import { loadUser } from "./Redux/actions/auth/authActions";
import ReusableExamples from "./ReusableExamples";
import Client from "./Client/";
import Recruiter from "./Recruiter/";
import Index from "./HomePage";
import SlimLoadingBar from "./Reusuable/Container/SlimLoadingBar/SlimLoadingBar";

class App extends Component {
    componentDidMount() {
        if (this.props.token) {
            this.props.loadUser();
        } else {
            this.props.history.replace("/");
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            if (
                prevProps.isAuthenticated !== this.props.isAuthenticated &&
                this.props.isAuthenticated &&
                this.props.user.isVerified &&
                this.props.user.phone_number?.length > 0
            ) {
                this.props.history.replace(`/${this.props.user.account_type}`);
            }
            if (
                prevProps.isAuthenticated !== this.props.isAuthenticated &&
                !this.props.isAuthenticated
            ) {
                this.props.history.replace("/");
            }
        }
    }

    render() {
        return (
            <>
                <NProgress
                    isAnimating={
                        this.props.isLoading ||
                        this.props.isProfileLoading ||
                        this.props.isJobsLoading
                    }
                >
                    {({ isFinished, progress, animationDuration }) => (
                        <SlimLoadingBar
                            isFinished={isFinished}
                            animationDuration={animationDuration}
                            progress={progress}
                            animationDuration={animationDuration}
                        />
                    )}
                </NProgress>

                <Switch>
                    <Route path="/client" component={Client} />
                    <Route path="/recruiter" component={Recruiter} />
                    <Route path="/reusables" component={ReusableExamples} />
                    <Route path="/" component={Index} />
                </Switch>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.auth.isLoading,
    isProfileLoading:
        state.recruiter.profile.isLoading || state.client.profile.isLoading,
    isJobsLoading:
        state.recruiter.panel.isLoading || state.client.panel.isLoading,
    token: state.auth.auth.token,
    isAuthenticated: state.auth.auth.isAuthenticated,
    user: state.auth.auth.user,
});

export default connect(mapStateToProps, { loadUser })(withRouter(App));
