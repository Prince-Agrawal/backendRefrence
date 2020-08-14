import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    RECRUITER_REGISTER_SUCCESS,
    RECRUITER_REGISTER_FAIL,
    FORGOT_PASS_FAIL,
    FORGOT_PASS_SUCCESS,
    CLIENT_REGISTER_SUCCESS,
    CLIENT_REGISTER_FAIL,
} from "../../actions/auth/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    isForgotPassSuccess: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.Token);
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.User,
                token: action.payload.Token,
            };
        case RECRUITER_REGISTER_SUCCESS:
        case CLIENT_REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
            };
        case FORGOT_PASS_SUCCESS:
            return {
                ...state,
                isForgotPassSuccess: true,
                isLoading: false,
            };
        case AUTH_ERROR:
        case RECRUITER_REGISTER_FAIL:
        case CLIENT_REGISTER_FAIL:
        case FORGOT_PASS_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isForgotPassSuccess: null,
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            window.location.reload();
            break;
        default:
            return state;
    }
}
