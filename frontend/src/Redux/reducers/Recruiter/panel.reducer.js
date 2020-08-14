import panelActionTypes from "../../actions/Recruiter/ActionTypes";

const INITIAL_STATE = {
    isLoading: false,
    liveJobs: null,
    acceptedJobs: null,
    rejectedJobs: null,
    candidates: [],
    recruiterCandidates: [],
    showModal: false,
    selectedJob: {},
    error: false,
};

const panelReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case panelActionTypes.TOGGEL_MODAL: {
            return {
                ...state,
                showModal: !state.showModal,
                selectedJob: action.payload || {},
            };
        }
        case panelActionTypes.USER_LOADING_JOBS:
            return {
                ...state,
                isLoading: true,
            };
        case panelActionTypes.GET_RECRUITER_CANDIDATE_SUCCESS:
            return {
                ...state,
                recruiterCandidates: action.payload,
                isLoading: false,
            };
        case panelActionTypes.GET_JOB_CANDIDATE_SUCCESS:
            return {
                ...state,
                candidates: action.payload,
                isLoading: false,
            };
        case panelActionTypes.GET_RECRUITER_CANDIDATE_FAIL:
            return {
                ...state,
                recruiterCandidates: [],
                isLoading: false,
            };
        case panelActionTypes.GET_JOB_CANDIDATE_FAIL:
            return {
                ...state,
                candidates: [],
                isLoading: false,
                error: true,
            };
        case panelActionTypes.GET_ACCEPTED_JOBS_SUCCESS:
            return {
                ...state,
                acceptedJobs: action.payload,
                isLoading: false,
            };
        case panelActionTypes.GET_LIVE_JOBS_SUCCESS:
            return {
                ...state,
                liveJobs: action.payload,
                isLoading: false,
            };
        case panelActionTypes.GET_REJECTED_JOBS_SUCCESS:
            return {
                ...state,
                rejectedJobs: action.payload,
                isLoading: false,
            };
        case panelActionTypes.GET_ACCEPTED_JOBS_FAIL:
            return {
                ...state,
                isLoading: false,
                acceptedJobs: [],
                error: true,
            };
        case panelActionTypes.GET_LIVE_JOBS_FAIL:
            return {
                ...state,
                isLoading: false,
                liveJobs: [],
                error: true,
            };
        case panelActionTypes.GET_REJECTED_JOBS_FAIL:
            return {
                ...state,
                isLoading: false,
                rejectedJobs: [],
                error: true,
            };
        case panelActionTypes.ACCEPT_JOB_SUCCESS:
        case panelActionTypes.REJECT_JOB_SUCCESS:
        case panelActionTypes.UNDO_REJECTED_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
            };
        case panelActionTypes.ADD_CANDIDATE_SUCCESS:
        case panelActionTypes.ADD_CANDIDATE_FAIL:
        case panelActionTypes.ADD_EXISTING_CANDIDATE_SUCCESS:
        case panelActionTypes.ADD_EXISTING_CANDIDATE_FAIL:
            return {
                ...state,
                isLoading: false,
                selectedJob: {},
                error: false,
            };
        case panelActionTypes.ACCEPT_JOB_FAIL:
        case panelActionTypes.REJECT_JOB_FAIL:
        case panelActionTypes.UNDO_REJECTED_JOB_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        default: {
            return state;
        }
    }
};

export default panelReducer;
