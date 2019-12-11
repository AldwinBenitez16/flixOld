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

export const updateList = (id, mediaID, sessionID, type, status) => {
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
            })
            .catch(err => {
                console.log(err);
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
                console.log(res.data);
                dispatch(fetchListStatusSuccess({[res.data.id]: res.data.items}));
            })
            .catch(err => {
                dispatch(fetchListStatusFail(err));
            });
    };
};