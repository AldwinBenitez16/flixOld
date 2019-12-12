import * as actionTypes from './actionTypes';
import axios, { apiKey } from '../../shared/Axios/axios'

const fetchAccountStateStart = () => {
    return {
        type: actionTypes.FETCH_MEDIA_STATE
    };
};
 
const fetchAccountStateSuccess = (mediaState) => {
    return {
        type: actionTypes.FETCH_MEDIA_STATE_SUCCESS,
        mediaState
    };
};

const fetchAccountStateFail = (error) => {
    return {
        type: actionTypes.FETCH_MEDIA_STATE_FAIL,
        error
    };
};

export const fetchAccountState = (id, sessionID, type) => {
    return dispatch => {
        dispatch(fetchAccountStateStart());
        axios.get(`/${type}/${id}/account_states?api_key=${apiKey}&session_id=${sessionID}`)
        .then(res => {
            dispatch(fetchAccountStateSuccess({[res.data.id]: {
                favorite: res.data.favorite,
                rated: res.data.rated,
                watchlist: res.data.watchlist 
            }}));
        })
        .catch(err => {
            dispatch(fetchAccountStateFail(err));
        });
    };
};

const updateMediaStateStart = () => {
    return {
        type: actionTypes.UPDATE_MEDIA_STATE
    };
};

export const updateMediaStateSuccess = (id, data) => {
    return {
        type: actionTypes.UPDATE_MEDIA_STATE_SUCCESS,
        id,
        data
    };
};

const updateMediaStateFail = (error) => {
    return {
        type: actionTypes.UPDATE_MEDIA_STATE_FAIL,
        error
    };
};

// 234242, 3414141, movie/tv, 123131, favorites/watchlist/rated, true/false
export const updateMediaState = (accountID, sessionID, mediaType, mediaID, stateType, stateValue) => {
    return dispatch => {
        dispatch(updateMediaStateStart());
        axios({
            url: `/account/${accountID}/${stateType}?api_key=${apiKey}&session_id=${sessionID}`,
            data: {
                media_type: mediaType,
                media_id: mediaID,
                [`${stateType}`]: !stateValue
            },
            method: 'post'
        })
            .then(res => {
                const mediaState = {
                    [`${stateType}`]: !stateValue
                };
                dispatch(updateMediaStateSuccess(mediaID, mediaState));
            })
            .catch(err => {
                dispatch(updateMediaStateFail(err));
            });
    };
};

const updateRatingStart = () => {
    return {
        type: actionTypes.RATE_MEDIA
    };
};

const updateRatingSuccess = () => {
    return {
        type: actionTypes.RATE_MEDIA_SUCCESS
    };
};

const updateRatingFail = () => {
    return {
        type: actionTypes.RATE_MEDIA_FAIL
    };
};

export const updateRating = (type, id, value, sessionID, requestType="post") => {
    return dispatch => {
        dispatch(updateRatingStart());
        let config = {
            url: `/${type}/${id}/rating?api_key=${apiKey}&session_id=${sessionID}`,
            method: 'post',
            data: {
                value
            }
        };
        if(requestType === "delete") {
            config = {
                url: `/${type}/${id}/rating?api_key=${apiKey}&session_id=${sessionID}`,
                method: 'delete',
            };
        }
        axios(config)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };
};

const fetchAccountListsStart = () => {
    return {
        type: actionTypes.FETCH_ACCOUNT_LISTS
    };
};

const fetchAccountListsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_LISTS_SUCCESS,
        data
    };
};

const fetchAccountListsFail = (error) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_LISTS_FAIL,
        error
    };
};

export const fetchAccountLists = (accountID, sessionID) => {
    return dispatch => {
        dispatch(fetchAccountListsStart);
        axios.get(`/account/${accountID}/lists?api_key=${apiKey}&language=en-US&session_id=${sessionID}&page=1`)
            .then(res => {
                dispatch(fetchAccountListsSuccess(res.data.results));
            })
            .catch(err => {
                dispatch(fetchAccountListsFail(err));
            });
    };
};

const fetchMediaStatusStart = () => {
    return {
        type: actionTypes.FETCH_LIST_STATUS
    };
};

const updateListMedia = (listID, data) => {
    return {
        type: actionTypes.FETCH_LIST_STATUS_SUCCESS,
        listID,
        data
    };
};

const fetchMediaStatusFail = (error) => {
    return {
        type: actionTypes.FETCH_LIST_STATUS_FAIL,
        error
    };
};

export const fetchMediaStatus = (mediaID, id) => {
    return dispatch => {
        dispatch(fetchMediaStatusStart());
        axios.get(`/list/${id}/item_status?api_key=${apiKey}&movie_id=${mediaID}`)
            .then(res => {
                console.log(mediaID);
                dispatch(updateListMedia(id , {[mediaID]: res.data.item_present}));
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchMediaStatusFail());
            });
    };
};

const fetchListStatusStart = () => {
    return {
        type: actionTypes.FETCH_LIST_MEDIA
    }
};

const fetchListStatusSuccess = (data) => {
    return {
        type: actionTypes.FETCH_LIST_MEDIA_SUCCESS,
        data
    }
};

const fetchListStatusFail = (error) => {
    return {
        type: actionTypes.FETCH_LIST_MEDIA_FAIL,
        error
    }
};

export const fetchListStatus = (id) => {
    return dispatch => {
        dispatch(fetchListStatusStart());
        axios.get(`/list/${id}?api_key=${apiKey}&language=en-US`)
            .then(res => {
                dispatch(fetchListStatusSuccess({[res.data.id]: res.data.items}));
            })
            .catch(err => {
                dispatch(fetchListStatusFail(err));
            });
    };
};

const clearListStart = () => {
    return {
        type: actionTypes.CLEAR_LIST
    };
};

const clearListSuccess = () => {
    return {
        type: actionTypes.CLEAR_LIST_SUCCESS
    };
};

const clearListFail = () => {
    return {
        type: actionTypes.CLEAR_LIST_FAIL
    };
};

export const clearList = (id, sessionID) => {
    return dispatch => {
        dispatch(clearListStart());
        axios.post(`/list/${id}/clear?api_key=${apiKey}&session_id=${sessionID}&confirm=true`)
            .then(res => {
                console.log(res.data);
                dispatch(fetchListStatusSuccess({[id]: []}));
            })
            .catch(err => {
                console.log(err);
            });
    };
};

const deleteListStart = () => {
    return {
        type: actionTypes.DELETE_LIST
    };
};

const deleteListSuccess = (id) => {
    return {
        type: actionTypes.DELETE_LIST_SUCCESS,
        id
    };
};

const deleteListFail = () => {
    return {
        type: actionTypes.DELETE_LIST_FAIL
    };
};

export const deleteList = (id, sessionID) => {
    return dispatch => {
        axios({
            url: `/list/${id}?api_key=${apiKey}&session_id=${sessionID}`,
            method: 'delete'
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                if(err.response.status === 500) {
                    dispatch(deleteListSuccess(id));
                }
            });
    };
};

const createNewListStart = () => {
    return {
        type: actionTypes.CREATE_NEW_LIST 
    };
};

const createNewListSuccess = (id, data) => {
    return {
        type: actionTypes.CREATE_NEW_LIST_SUCCESS,
        id,
        data 
    };
};

const createNewListFail = () => {
    return {
        type: actionTypes.CREATE_NEW_LIST_FAIL 
    };
};

export const createNewList = (sessionID, name, description) => {
    return dispatch => {
        dispatch(createNewListStart());
        axios({
            url: `/list?api_key=${apiKey}&session_id=${sessionID}`,
            method: 'post',
            data: {
                name,
                description,
                language: 'en'
            }
        })
            .then(res => {
                let data = {
                    description,
                    name,
                    id: res.data.list_id
                }
                dispatch(createNewListSuccess(res.data.list_id, data));
            })
            .catch(err => {
                console.log(err);
            });
    };
};

const fetchMediaStart = () => {
    return {
        type: actionTypes.FETCH_MEDIA
    };
};

const fetchMediaSuccess = (id, data) => {
    return {
        type: actionTypes.FETCH_MEDIA_SUCCESS,
        data,
        id
    };
};

const fetchMediaFail = () => {
    return {
        type: actionTypes.FETCH_MEDIA_FAIL
    };
};

const fetchMedia = (id, mediaID, mediaType) => {
    return dispatch => {
        dispatch(fetchMediaStart());
        axios.get(`/${mediaType}/${mediaID}?api_key=${apiKey}&language=en-US`)
            .then(res => {
                console.log(res.data);
                dispatch(fetchMediaSuccess(id, res.data));
            })
            .catch(err => {
                dispatch(fetchMediaFail(err));
            });
    };
};

export const removeMedia = (id, mediaID) => {
    return {
        type: actionTypes.REMOVE_MEDIA,
        id,
        mediaID
    };
};

export const updateList = (id, mediaID, mediaType, sessionID, type, status) => {
    return dispatch => {
        axios({
            url: `/list/${id}/${type}?api_key=${apiKey}&session_id=${sessionID}`,
            method: "post",
            data: {
                media_id: mediaID
            }
        })
            .then(res => {
                dispatch(updateListMedia(id , {[mediaID]: status}));
                console.log(status, mediaType);
                if(status) {
                    dispatch(fetchMedia(id, mediaID, mediaType));
                } else {
                    dispatch(removeMedia(id, mediaID))
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
};