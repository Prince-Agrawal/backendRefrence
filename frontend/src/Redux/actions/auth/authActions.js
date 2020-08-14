import axios from "axios";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    RECRUITER_REGISTER_SUCCESS,
    RECRUITER_REGISTER_FAIL,
    CLIENT_REGISTER_SUCCESS,
    CLIENT_REGISTER_FAIL,
    FORGOT_PASS_SUCCESS,
    FORGOT_PASS_FAIL,
} from "./types";

import { returnErrors, clearErrors } from "./errorActions";

const URL = "http://localhost:3000";

//check token & load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    const token = localStorage.getItem("token");

    axios
        .get(`${URL}/auth/userData?token=${token}`, tokenConfig(getState))
        .then((res) =>
            dispatch({
                type: USER_LOADED,
                payload: res.data[0],
            })
        )
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR,
            });
        });
};

// register recruiter
export const recruiterSignUp = (data) => (dispatch) => {
    //User loading
    dispatch({
        type: USER_LOADING,
    });

    //headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    axios
        .post(`${URL}/auth/recruiterSignUp`, data, config)
        .then((res) => {
            dispatch({
                type: RECRUITER_REGISTER_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    "REGISTER_FAIL"
                )
            );
            dispatch({
                type: RECRUITER_REGISTER_FAIL,
            });
        });
};

// register client
export const clientSignUp = (data) => (dispatch) => {
    //User loading
    dispatch({
        type: USER_LOADING,
    });

    //headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    axios
        .post(`${URL}/auth/clientSignUp`, data, config)
        .then((res) => {
            dispatch({
                type: CLIENT_REGISTER_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    "REGISTER_FAIL"
                )
            );
            dispatch({
                type: CLIENT_REGISTER_FAIL,
            });
        });
};

//login
export const login = ({ email, password, account_type }) => (dispatch) => {
    //headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    //request body
    const body = JSON.stringify({ email, password, account_type });

    dispatch({
        type: USER_LOADING,
    });
    axios
        .post(`${URL}/auth/signIn`, body, config)
        .then((res) =>
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    "LOGIN_FAIL"
                )
            );
            dispatch({
                type: LOGIN_FAIL,
            });
        });
};

//forgot password
export const forgotPassword = ({ email }) => (dispatch) => {
    dispatch({
        type: USER_LOADING,
    });
    //headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    //request body
    const body = JSON.stringify({ email });

    axios
        .put(`${URL}/auth/forgotPassword`, body, config)
        .then((res) =>
            dispatch({
                type: FORGOT_PASS_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    "FORGOT_PASS_FAIL"
                )
            );
            dispatch({
                type: FORGOT_PASS_FAIL,
            });
        });
};

// Connect with Google
export const googleConnect = () => (dispatch, getState) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    axios.get(`${URL}/auth/google`, config).then((res) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    });
};

//logout user
export const logout = () => (dispatch, getState) => {
    axios.get(`${URL}/auth/logOut`).then((res) => {
        dispatch({
            type: LOGOUT_SUCCESS,
        });
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

    if (token) {
        config.headers["authorization"] = `bearer ${token}`;
    }

    return config;
};
