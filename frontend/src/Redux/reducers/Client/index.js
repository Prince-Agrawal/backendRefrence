import { combineReducers } from "redux";
import profileReducer from "./profile";
import panel from "./PanelActions";

const index = combineReducers({
    panel,
    profile: profileReducer,
});

export default index;
