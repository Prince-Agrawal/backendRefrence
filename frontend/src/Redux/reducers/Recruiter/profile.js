import ActionTypes from "../../actions/Recruiter/ActionTypes";

const initialState = {
    isLoading: false,
    isPersonalInfoUpdated: false,
    isDomainExpertiseUpdated: false,
    isAdditionalInfoUpdated: false,
    profileUpdated: false,
    passwordUpdated: null,
    notifications: [],
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.USER_LOADING_PROFILE:
            return {
                ...state,
                isLoading: true,
                passwordUpdated: null,
            };
            break;
        case ActionTypes.PERSONAL_INFO_SUCCESS:
            return {
                ...state,
                isPersonalInfoUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.DOMAIN_SUCCESS:
            return {
                ...state,
                isDomainExpertiseUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.ADDITIONAL_INFO_SUCCESS:
            return {
                ...state,
                isAdditionalInfoUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                profileUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.PERSONAL_INFO_FAIL:
            return {
                ...state,
                isPersonalInfoUpdated: false,
                isLoading: false,
            };
            break;
        case ActionTypes.DOMAIN_FAIL:
            return {
                ...state,
                isDomainExpertiseUpdated: false,
                isLoading: false,
            };
            break;
        case ActionTypes.ADDITIONAL_INFO_FAIL:
            return {
                ...state,
                isAdditionalInfoUpdated: false,
                isLoading: false,
            };
            break;
        case ActionTypes.GET_USER_INFO_FAIL:
            return {
                ...state,
                profileUpdated: false,
                isLoading: false,
            };
        case ActionTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passwordUpdated: true,
            };
        case ActionTypes.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                passwordUpdated: false,
            };
        case ActionTypes.GET_NOTIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                notifications: action.payload,
            };
        case ActionTypes.GET_NOTIFICATION_FAIL:
            return {
                ...state,
                isLoading: false,
                notifications: [],
            };
        case ActionTypes.UPDATE_NOTIFICATION_SUCCESS:
        case ActionTypes.UPDATE_NOTIFICATION_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default profileReducer;
