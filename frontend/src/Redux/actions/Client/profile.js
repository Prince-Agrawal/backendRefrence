import ActionTypes from "./ActionTypes";
import { USER_LOADED } from "../auth/types";
import axios from "axios";

const URL = "http://localhost:3000";

// to load the user
export const loadUser = () => ({
    type: ActionTypes.USER_LOADING,
});

// to update company Info
export const updateCompanyInfo = (data) => (dispatch, getState) => {
    const token = getState().auth.auth.token;

    dispatch({ type: ActionTypes.CLIENT_LOADING_PROFILE });
    data["_id"] = getState().auth.auth.user["_id"];
    axios
        .put(`${URL}/company/companyInfo`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: ActionTypes.COMPANY_INFO_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.COMPANY_INFO_FAIL });
        });
};

// to update about company
export const updateAboutCompany = (data) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PROFILE });
    data.append("_id", getState().auth.auth.user["_id"]);
    axios
        .put(`${URL}/company/aboutCompany`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: ActionTypes.ABOUT_COMPANY_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.ABOUT_COMPANY_FAIL });
        });
};

// to update billing info
export const updateBillingInfo = (data) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PROFILE });
    data["_id"] = getState().auth.auth.user["_id"];
    axios
        .put(`${URL}/company/billingInformation`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: ActionTypes.BILLING_INFO_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.BILLING_INFO_FAIL });
        });
};

export const changePassword = (data) => (dispatch, getState) => {
    data["token"] = getState().auth.auth.token;
    dispatch({ type: ActionTypes.USER_LOADING_PROFILE });
    axios
        .put(`${URL}/auth/changePassword`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: ActionTypes.CLIENT_CHANGE_PASSWORD_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.CLIENT_CHANGE_PASSWORD_FAIL });
        });
};

//setup config/headers and token
export const tokenConfig = (getState) => {
    //get token from localStorage
    const token = getState().auth.auth.token;

    //headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    //If token exits, then add to headers
    if (token) {
        config.headers["authorization"] = `bearer ${token}`;
    }

    return config;
};
