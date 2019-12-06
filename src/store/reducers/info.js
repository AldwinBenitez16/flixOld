import * as actionTypes from '../actions/actionTypes';

const initialState = {
    accountState: [],
    loading: false,
    error: null
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ACCOUNT_DETAILS: 
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_ACCOUNT_DETAILS_SUCCESS: 
            return {
                ...state,
                accountState: [
                    ...state.accountState,
                    ...action.mediaState
                ]
            };
        case actionTypes.FETCH_ACCOUNT_DETAILS_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                accountState: null,
                loading: false,
                error: null
            }
        default:
            return state;
    };
};

export default reducer;