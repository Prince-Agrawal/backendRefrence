import ActionTypes from "./ActionTypes";
import Axios from "axios";

const URL = "http://localhost:3000";

// get all candidates for this client
export const getAllCandidates = () => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PANEL });
    Axios.get(
        `${URL}/job/Candidates?company_id=${getState().auth.auth.user._id}`,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: ActionTypes.GET_ALL_CANDIDATES_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.GET_ALL_CANDIDATES_FAIL });
        });
};

// get jobs of respective client
export const getOpenJobs = () => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PANEL });
    Axios.get(
        `${URL}/company/job_related_company?company_id=${
            getState().auth.auth.user._id
        }`,
        tokenConfig(getState)
    )
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: ActionTypes.GET_CLIENT_OPEN_JOBS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.GET_CLIENT_OPEN_JOBS_FAIL });
        });
};

// to add a new job to client => assignedjobs => recruiter(s)
export const addNewJob = (data) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PANEL });
    data["company_id"] = getState().auth.auth.user._id;
    Axios.post(`${URL}/job/job_detail`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: ActionTypes.ADD_NEW_JOB_SUCCESS });
        })
        .catch((err) => dispatch({ type: ActionTypes.ADD_NEW_JOB_FAIL }));
};

// get the departments with interview stages
export const getDepartment = () => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PANEL });
    Axios.get(
        `${URL}/job/department?company_id=${getState().auth.auth.user._id}`,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: ActionTypes.GET_CLIENT_DEPARTMENT_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) =>
            dispatch({ type: ActionTypes.GET_CLIENT_DEPARTMENT_FAIL })
        );
};

// add department with interviewstages
export const addDepartment = (department) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PANEL });
    const data = {
        company_id: getState().auth.auth.user._id,
        interview_stage: department,
    };

    Axios.post(`${URL}/company/setting`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: ActionTypes.ADD_CLIENT_DEPARTMENT_SUCCESS });
            getDepartment()(dispatch, getState);
        })
        .catch((err) =>
            dispatch({ type: ActionTypes.ADD_CLIENT_DEPARTMENT_FAIL })
        );
};

// update interview stage of one candidate
export const updateCandidateStage = (data, jobID) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PANEL });

    Axios.post(
        `${URL}/company/updateInterviewStage`,
        data,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({ type: ActionTypes.UPDATE_INTERVIEW_STAGE_SUCCESS });
            getParticularJob(jobID)(dispatch, getState);
            getMonthlySchedule()(dispatch, getState);
        })
        .catch((err) =>
            dispatch({ type: ActionTypes.UPDATE_INTERVIEW_STAGE_FAIL })
        );
};

// when user clicks on particular job card
export const getParticularJob = (id) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PANEL });
    Axios.get(
        `${URL}/company/particularJob?company_id=${
            getState().auth.auth.user._id
        }&job_id=${id}`,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: ActionTypes.GET_PARTICULAR_JOB_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.GET_PARTICULAR_JOB_FAIL });
        });
};

// get Monthly Schedule
export const getMonthlySchedule = (date) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PANEL });
    Axios.get(
        `${URL}/company/candidate_for_month?date=${date}`,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: ActionTypes.GET_MONTHLY_SCHEDULE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.GET_MONTHLY_SCHEDULE_FAIL });
        });
};

// MAKE interview stage as completed
export const completeInterviewStage = (data) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PANEL });
    Axios.put(`${URL}/company/stage_complete`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ActionTypes.COMPLETE_INTERVIEW_STAGE_SUCCESS,
            });
            getMonthlySchedule()(dispatch, getState);
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.COMPLETE_INTERVIEW_STAGE_FAIL });
        });
};

// get today's interview schedule for Client
export const getDailySchedule = (date) => (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLIENT_LOADING_PANEL });
    Axios.get(
        `${URL}/company/candidate_for_date?date=${date}`,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: ActionTypes.GET_DAILY_SCHEDULE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ActionTypes.GET_DAILY_SCHEDULE_FAIL });
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
