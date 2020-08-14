import { combineReducers } from "redux";
import panelReducer from "./panel.reducer";
import profileReducer from "./profile";

const index = combineReducers({
    panel: panelReducer,
    profile: profileReducer,
});

export default index;
