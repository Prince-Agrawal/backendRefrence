import { combineReducers } from "redux";
import auth from "./auth";
import recruiter from "./Recruiter";
import client from "./Client";
import lineupx from "./lineupx/reducer";

const index = combineReducers({
    auth,
    recruiter,
    client,
    lineupx,
});

export default index;
