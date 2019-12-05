import * as actionTypes from '../actions/actionTypes';

const initialState = {
    accountID: null,
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
                loading: false,
                accountID: action.accountID
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
                accountID: null
            };
        default:
            return state;
    };
};

export default reducer;