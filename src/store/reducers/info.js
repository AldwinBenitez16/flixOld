import * as actionTypes from '../actions/actionTypes';

const initialState = {
    accountState: null,
    accountLists: null,
    listsItems: null,
    lists: null,
    loading: false,
    error: null
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_MEDIA_STATE: 
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_MEDIA_STATE_SUCCESS:
            return {
                ...state,
                accountState: {
                    ...state.accountState,
                    ...action.mediaState
                }
            };
        case actionTypes.FETCH_MEDIA_STATE_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                accountState: null,
                accountLists: null,
                loading: false,
                error: null
            }
        case actionTypes.UPDATE_MEDIA_STATE:
            return {
                ...state, 
                loading: true,
                error: null
            };
        case actionTypes.UPDATE_MEDIA_STATE_SUCCESS:
            return {
                ...state,
                loading: false,
                accountState: {
                    ...state.accountState,
                    [`${action.id}`]: {
                        ...state.accountState[`${action.id}`],
                        ...action.data
                    }
                }
            };
        case actionTypes.UPDATE_MEDIA_STATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.FETCH_ACCOUNT_LISTS: 
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_ACCOUNT_LISTS_SUCCESS:
            return {
                ...state,
                loading: false,
                accountLists: action.data
            };
        case actionTypes.FETCH_ACCOUNT_LISTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.FETCH_LIST_STATUS: 
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_LIST_STATUS_SUCCESS: 
        console.log(action.data);
            return {
                ...state,
                loading: false,
                lists: {
                    ...state.lists,
                    ...{[action.listID]: {
                        ...action.data
                    }}
                }
            };
        case actionTypes.FETCH_LIST_STATUS_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.FETCH_LIST_MEDIA:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_LIST_MEDIA_SUCCESS:
            return {
                ...state,
                loading: false,
                listsItems: {
                    ...state.listsItems,
                    ...action.data
                }
            };
        case actionTypes.FETCH_LIST_MEDIA_FAIL:
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