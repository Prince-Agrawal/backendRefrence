import panelActionTypes from "./ActionTypes";
import Axios from "axios";

const URL = "http://localhost:3000";

// Get the live jobs
export const getLiveJobs = () => (dispatch, getState) => {
    dispatch({ type: panelActionTypes.USER_LOADING_JOBS });

    Axios.get(
        `${URL}/job/livejobs?recruiter_id=${getState().auth.auth.user._id}`,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: panelActionTypes.GET_LIVE_JOBS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: panelActionTypes.GET_LIVE_JOBS_FAIL });
        });
};

// get accepted jobs
export const getAcceptedJobs = () => (dispatch, getState) => {
    dispatch({ type: panelActionTypes.USER_LOADING_JOBS });

    Axios.get(
        `${URL}/job/acceptedJobs?recruiter_id=${getState().auth.auth.user._id}`,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: panelActionTypes.GET_ACCEPTED_JOBS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: panelActionTypes.GET_ACCEPTED_JOBS_FAIL });
        });
};

// get rejected jobs
export const getRejectedJobs = () => (dispatch, getState) => {
    dispatch({ type: panelActionTypes.USER_LOADING_JOBS });
    Axios.get(
        `${URL}/job/rejectedJobs?recruiter_id=${getState().auth.auth.user._id}`,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: panelActionTypes.GET_REJECTED_JOBS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: panelActionTypes.GET_REJECTED_JOBS_FAIL });
        });
};

// change live => accept
export const acceptJob = (jobID) => (dispatch, getState) => {
    dispatch({ type: panelActionTypes.USER_LOADING_JOBS });
    Axios.put(
        `${URL}/job/accept`,
        { job_id: jobID, recruiter_id: getState().auth.auth.user._id },
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: panelActionTypes.ACCEPT_JOB_SUCCESS,
            });
            getLiveJobs()(dispatch, getState);
        })
        .catch((err) => {
            dispatch({ type: panelActionTypes.ACCEPT_JOB_FAIL });
        });
};

// change live => reject
export const rejectJob = (jobID) => (dispatch, getState) => {
    dispatch({ type: panelActionTypes.USER_LOADING_JOBS });
    Axios.put(
        `${URL}/job/reject`,
        { job_id: jobID, recruiter_id: getState().auth.auth.user._id },
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: panelActionTypes.REJECT_JOB_SUCCESS,
            });
            getLiveJobs()(dispatch, getState);
        })
        .catch((err) => {
            dispatch({ type: panelActionTypes.REJECT_JOB_FAIL });
        });
};

// change reject => live
export const undoRejectedJob = (data) => (dispatch, getState) => {
    dispatch({ type: panelActionTypes.USER_LOADING_JOBS });
    Axios.put(
        `${URL}/job/undo`,
        { job_id: data, recruiter_id: getState().auth.auth.user._id },
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: panelActionTypes.UNDO_REJECTED_JOB_SUCCESS,
            });
            getRejectedJobs()(dispatch, getState);
        })
        .catch((err) => {
            dispatch({ type: panelActionTypes.UNDO_REJECTED_JOB_FAIL });
        });
};

// add candidate to respective job and respective user
export const addCandidate = (data) => (dispatch, getState) => {
    dispatch({ type: panelActionTypes.USER_LOADING_JOBS });
    const userID = getState().auth.auth.user._id;

    // original addCandidate
    data.append("recruiter_id", userID);
    // Axios.post(`${URL}/job/addCandidate`, data, tokenConfig(getState))
    // testing addCandidate with dynamic resume values
    // data["recruiter_id"] = userID;
    Axios.post(`${URL}/job/addCandidate`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: panelActionTypes.ADD_CANDIDATE_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch({ type: panelActionTypes.ADD_CANDIDATE_FAIL });
        });
};

export const addExistingCandidate = (data) => (dispatch, getState) => {
    dispatch({ type: panelActionTypes.USER_LOADING_JOBS });
    data["recruiter_id"] = getState().auth.auth.user._id;
    Axios.put(`${URL}/job/addExistingCandidate`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: panelActionTypes.ADD_EXISTING_CANDIDATE_SUCCESS });
        })
        .catch((err) => {
            dispatch({ type: panelActionTypes.ADD_EXISTING_CANDIDATE_FAIL });
        });
};

// get candidates for respective job
export const getJobCandidate = (jobID) => (dispatch, getState) => {
    dispatch({ type: panelActionTypes.USER_LOADING_JOBS });
    Axios.get(
        `${URL}/job/jobCandidates?job_id=${jobID}&recruiter_id=${
            getState().auth.auth.user._id
        }`,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: panelActionTypes.GET_JOB_CANDIDATE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: panelActionTypes.GET_JOB_CANDIDATE_FAIL });
        });
};

// get candidates for respective user
export const getRecruiterCandidate = () => (dispatch, getState) => {
    dispatch({ type: panelActionTypes.USER_LOADING_JOBS });
    const userID = getState().auth.auth.user._id;
    Axios.get(
        `${URL}/job/recruiterCandidates?recruiter_id=${userID}`,
        tokenConfig(getState)
    )
        .then((res) => {
            dispatch({
                type: panelActionTypes.GET_RECRUITER_CANDIDATE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: panelActionTypes.GET_RECRUITER_CANDIDATE_FAIL });
        });
};

// toggels the Modal used for selecting the candidate
export const toggel = (job) => (dispatch) => {
    dispatch({
        type: panelActionTypes.TOGGEL_MODAL,
        payload: job,
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
