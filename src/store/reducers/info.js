import * as actionTypes from '../actions/actionTypes';

const initialState = {
    mediaState: null,
    mediaItems: {
        rated: [],
        favorite: [],
        watchlist: []
    }, 
    accountLists: null,
    loading: false,
    error: null
};

let id = null;
let stateType = null;
let updatedAccountLists = null;
let updatedListItems = null;
let updatedState = null;
const reducer = (state=initialState, action) => {   
    switch(action.type) {
        case actionTypes.START: 
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FAIL: 
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.FETCH_MEDIA_STATE_SUCCESS:
            return {
                ...state,
                mediaState: {
                    ...state.mediaState,
                    ...action.mediaState
                }
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                mediaState: null,
                accountLists: null,
                loading: false,
                error: null
            }
        case actionTypes.FETCH_ACCOUNT_LISTS_SUCCESS:
            return {
                ...state,
                loading: false,
                accountLists: {
                    ...state.accountLists,
                    ...action.data
                }
            };
        case actionTypes.CLEAR_LIST_SUCCESS:
            id = action.id;
            updatedAccountLists = state.accountLists;
            for(let key in updatedAccountLists) {
                if(key === id) {
                    updatedAccountLists[id].listItems = [];
                }
            }
            console.log(updatedAccountLists);
            return {
                ...state,
                loading: false,
                accountLists: updatedAccountLists
            };
        case actionTypes.DELETE_LIST_SUCCESS: 
            id = action.id;
            updatedAccountLists = state.accountLists;
            delete updatedAccountLists[id];
            return {
                ...state,
                accountLists: updatedAccountLists
            };
        case actionTypes.ADD_MEDIA:
            id = action.id;
            updatedListItems = state.accountLists[id].listItems;
            updatedListItems.push(action.data);
            return {
                ...state,
                accountLists: {
                    ...state.accountLists,
                    [id]: {
                        ...state.accountLists[id],
                        listItems: updatedListItems
                    }
                }
            };
        case actionTypes.REMOVE_MEDIA:
            id = action.id;
            updatedListItems = state.accountLists[id].listItems;
            updatedListItems = updatedListItems.filter(item => item.id !== parseInt(action.mediaID));
            return {
                ...state,
                accountLists: {
                    ...state.accountLists,
                    [id]: {
                        ...state.accountLists[id],
                        listItems: updatedListItems
                    }
                }
            };
        case actionTypes.CREATE_NEW_LIST_SUCCESS:
            id = action.id;
            updatedAccountLists = state.accountLists;
            updatedAccountLists[id] = action.data;
            return {
                ...state,
                accountLists: updatedAccountLists
            };
        case actionTypes.UPDATE_MEDIA_STATE_SUCCESS:
            return {
                ...state,
                mediaState: {
                    ...state.mediaState,
                    [action.mediaID]: {
                        ...state.mediaState[action.mediaID],
                        ...action.mediaState
                    }
                }
            };
        case actionTypes.ADD_RATING:
            return {
                ...state,
                mediaState: {
                    ...state.mediaState,
                    [action.mediaID]: {
                        ...state.mediaState[action.mediaID],
                        ['rated']: parseInt(action.value)
                    }
                }
            };
        case actionTypes.REMOVE_RATING:
            return {
                ...state,
                mediaState: {
                    ...state.mediaState,
                    [action.mediaID]: {
                        ...state.mediaState[action.mediaID],
                        ['rated']: false
                    }
                }
            };
        case actionTypes.FETCH_GUEST_SESSION_ID_SUCCESS:
            return {
                ...state,
                mediaState: {}
            };
        case actionTypes.SET_GUEST_MEDIA:
            return {
                ...state,
                mediaState: {
                    ...state.mediaState,
                    [action.mediaID]: {
                        rated: action.status
                    }
                }
            };
        case actionTypes.ADD_STATE_MEDIA:
            id = action.mediaID;
            stateType = action.stateType;
            updatedState = state.mediaItems[stateType];
            updatedState.push(action.data);
            return {
                ...state,
                mediaItems: {
                    ...state.mediaItems,
                    [stateType]: updatedState
                }
            };
        case actionTypes.REMOVE_STATE_MEDIA:
            id = action.mediaID;
            stateType = action.stateType;
            updatedState = state.mediaItems[stateType];
            updatedState = updatedState.filter(item => {
                return item.id !== parseInt(id);
            });
            return {
                ...state,
                mediaItems: {
                    ...state.mediaItems,
                    [stateType]: updatedState
                }
            };
        default:
            return state;
    };
};

export default reducer;