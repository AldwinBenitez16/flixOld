// ActionTypes
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    guestAuth: false,
    loading: false,
    tokenData: null,
    sessionIdData: null,
    guestSessionData: null,
    error: null
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_TOKEN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_TOKEN_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    tokenData: action.data
                };
        case actionTypes.FETCH_TOKEN_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };
        case actionTypes.FETCH_SESSION_ID:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_SESSION_ID_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    authenticated: true,
                    sessionIdData: action.data
                };
        case actionTypes.FETCH_SESSION_ID_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };
        case actionTypes.LOGOUT:
                return {
                    ...state,
                    authenticated: false,
                    guestAuth: false,
                    tokenData: null,
                    sessionIdData: null,
                    guestSessionData: null
                };
        case actionTypes.FETCH_GUEST_SESSION_ID:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_GUEST_SESSION_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                guestSessionData: {
                    ...action.data
                },
                guestAuth: true
            };
        case actionTypes.FETCH_GUEST_SESSION_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default: 
            return state;
    };
};

export default reducer;