import ActionTypes from "./ActionTypes";
import axios from "axios";

const URL = "http://localhost:3000";

// get the FAQ document
export const getLineupxFAQ = () => (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_LINEUPX_LOADING });
    axios
        .get(`${URL}/recruiter/FAQ`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ActionTypes.GET_LINEUPX_FAQ_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.GET_LINEUPX_FAQ_FAIL });
        });
};

// get top clients for the dropdown in domain expertise
export const getLineupxClients = () => (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_LINEUPX_LOADING });
    axios
        .get(`${URL}/recruiter/topClient`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ActionTypes.GET_LINEUPX_CLIENTS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.GET_LINEUPX_CLIENTS_FAIL });
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
