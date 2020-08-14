import ActionTypes from "../../actions/lineupx/ActionTypes";

const initialState = {
    isLoading: false,
    FAQ: null,
    top_clients: null,
};

const lineupxReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_LINEUPX_LOADING:
            return {
                ...state,
                isLoading: true,
            };
            break;
        case ActionTypes.GET_LINEUPX_FAQ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                FAQ: action.payload.link,
            };
        case ActionTypes.GET_LINEUPX_CLIENTS_SUCCESS:
            return {
                ...state,
                top_clients: action.payload.company_name,
            };
        case ActionTypes.GET_LINEUPX_CLIENTS_FAIL:
        case ActionTypes.GET_LINEUPX_FAQ_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
            break;
    }
};

export default lineupxReducer;
