import ActionTypes from "./ActionTypes";
import { USER_LOADED } from "../auth/types";
import axios from "axios";

const URL = "http://localhost:3000";

// to load the user
export const loadUser = () => ({
    type: ActionTypes.USER_LOADING,
});

// to update persoanl Info
export const updatePersonalInfo = (data) => (dispatch, getState) => {
    const token = getState().auth.auth.token;

    //headers
    const config = {
        headers: {
            "Content-Type": "'multipart/form-data",
        },
    };

    //If token exits, then add to headers
    if (token) {
        config.headers["authorization"] = `bearer ${token}`;
    }
    dispatch({ type: ActionTypes.USER_LOADING_PROFILE });
    data.append("_id", getState().auth.auth.user["_id"]);
    axios
        .put(`${URL}/recruiter/profile_information`, data, config)
        .then((res) => {
            dispatch({ type: ActionTypes.PERSONAL_INFO_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.PERSONAL_INFO_FAIL });
        });
};

// to update domain expertise
export const updateDomainExpertise = (data) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_LOADING_PROFILE });
    data["_id"] = getState().auth.auth.user["_id"];
    axios
        .put(`${URL}/recruiter/domain_detail`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: ActionTypes.DOMAIN_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.DOMAIN_FAIL });
        });
};

// to update additional info
export const updateAdditionalInfo = (data) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_LOADING_PROFILE });
    data.append("_id", getState().auth.auth.user["_id"]);
    axios
        .put(`${URL}/recruiter/additional_info`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: ActionTypes.ADDITIONAL_INFO_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.ADDITIONAL_INFO_FAIL });
        });
};

//  get user info
export const getUserInfo = () => (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_LOADING_PROFILE });
    const userId = getState().auth.auth.user["_id"];
    axios
        .get(
            `${URL}/recruiter/profile_info?_id=${userId}`,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch({
                type: ActionTypes.GET_USER_INFO_SUCCESS,
            });
            dispatch({ type: USER_LOADED, payload: res.data[0] });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.GET_USER_INFO_FAIL });
        });
};

export const changePassword = (data) => (dispatch, getState) => {
    data["token"] = getState().auth.auth.token;
    dispatch({ type: ActionTypes.USER_LOADING_PROFILE });
    axios
        .put(`${URL}/auth/changePassword`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: ActionTypes.CHANGE_PASSWORD_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.CHANGE_PASSWORD_FAIL });
        });
};

export const getNotifications = () => (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_LOADING_PROFILE });
    axios
        .get(
            `${URL}/recruiter/notification?recruiter_id=${
                getState().auth.auth.user["_id"]
            }`,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch({
                type: ActionTypes.GET_NOTIFICATION_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.GET_NOTIFICATION_FAIL });
        });
};

export const updateNotifications = (notificationID) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_LOADING_PROFILE });
    axios
        .put(
            `${URL}/recruiter/notification_seen?recruiter_id=${
                getState().auth.auth.user["_id"]
            }&notification_id=${notificationID}`,
            null,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch({
                type: ActionTypes.UPDATE_NOTIFICATION_SUCCESS,
            });
            getNotifications()(dispatch, getState);
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.UPDATE_NOTIFICATION_FAIL });
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
