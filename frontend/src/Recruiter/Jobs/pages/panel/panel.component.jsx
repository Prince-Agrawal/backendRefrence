import React from "react";
import { Route, Router, Switch } from "react-router-dom";

//Componenets
import Dashboard from "../../../Dashboard/Container/Dashboard/dashboard.component";
import JobPanel from "../../component/JobPanel/jobpanel.component";
import CandidatePanel from "../../component/MainCandidatePanel/MainCandidatePanel";
import JobDescription from "../../component/JobDescription/JobDescription";
import AddCandidate from "../../component/AddCandidate/AddCandidate";
import { useEffect } from "react";

// This Page serves as the main page, Different panels render based of the url in this section
const Panel = () => {
    return (
        <Switch>
            <Route
                path="/recruiter/jobs/:category/:jobId"
                component={JobDescription}
            />
            <Route path="/recruiter/jobs/:category" component={JobPanel} />
            <Route path="/recruiter/candidates/new" component={AddCandidate} />
            <Route path="/recruiter/candidates" component={CandidatePanel} />
            <Route exact path="/recruiter" component={Dashboard} />
        </Switch>
    );
};

export default Panel;
