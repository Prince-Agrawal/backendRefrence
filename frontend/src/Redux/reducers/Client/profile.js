import ActionTypes from "../../actions/Client/ActionTypes";

const initialState = {
    isLoading: false,
    isCompanyInfoUpdated: false,
    isAboutCompanyUpdated: false,
    isBillingInfoUpdated: false,
    profileUpdated: false,
    passwordUpdated: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CLIENT_LOADING_PROFILE:
            return {
                ...state,
                isLoading: true,
                passwordUpdated: null,
            };
            break;
        case ActionTypes.COMPANY_INFO_SUCCESS:
            return {
                ...state,
                isCompanyInfoUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.ABOUT_COMPANY_SUCCESS:
            return {
                ...state,
                isAboutCompanyUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.BILLING_INFO_SUCCESS:
            return {
                ...state,
                isBillingInfoUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.GET_CLIENT_INFO_SUCCESS:
            return {
                ...state,
                profileUpdated: true,
                isLoading: false,
            };
            break;
        case ActionTypes.COMPANY_INFO_FAIL:
            return {
                ...state,
                isCompanyInfoUpdated: false,
                isLoading: false,
            };
            break;
        case ActionTypes.ABOUT_COMPANY_FAIL:
            return {
                ...state,
                isAboutCompanyUpdated: false,
                isLoading: false,
            };
            break;
        case ActionTypes.BILLING_INFO_FAIL:
            return {
                ...state,
                isBillingInfoUpdated: false,
                isLoading: false,
            };
            break;
        case ActionTypes.GET_CLIENT_INFO_FAIL:
            return {
                ...state,
                profileUpdated: false,
                isLoading: false,
            };
        case ActionTypes.CLIENT_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passwordUpdated: true,
            };
        case ActionTypes.CLIENT_CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                passwordUpdated: false,
            };
        default:
            return state;
            break;
    }
};

export default profileReducer;
