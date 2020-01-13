import * as actionTypes from './actionTypes';
import axios, { apiKey } from '../../shared/Axios/axios'

// Sets Loading To True/False
const Start = () => {
    return {
        type: actionTypes.START
    };
};

const Fail = () => {
    return {
        type: actionTypes.FAIL
    };
};


// Fetchs the Account Favorites, Rated, and Wathlist
const fetchAccountStateSuccess = (mediaState) => {
    return {
        type: actionTypes.FETCH_MEDIA_STATE_SUCCESS,
        mediaState
    };
};

export const fetchAccountState = (id, sessionID, type) => {
    return dispatch => {
        dispatch(Start());
        axios.get(`/${type}/${id}/account_states?api_key=${apiKey}&session_id=${sessionID}`)
        .then(res => {
            dispatch(fetchAccountStateSuccess({[res.data.id]: {
                favorite: res.data.favorite,
                rated: res.data.rated,
                watchlist: res.data.watchlist 
            }}));
        })
        .catch(err => {
            dispatch(Fail(err));
        });
    };
};

// Fetches the account lists details
const fetchAccountListsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_LISTS_SUCCESS,
        data
    };
};

export const fetchAccountLists = (accountID, sessionID) => {
    return dispatch => {
        dispatch(Start());
        axios.get(`/account/${accountID}/lists?api_key=${apiKey}&language=en-US&session_id=${sessionID}&page=1`)
            .then(res => {
                res.data.results.map(list => {
                    axios.get(`/list/${list.id}?api_key=${apiKey}&language=en-US`)
                        .then(res => {      
                            let accountList = {
                                description: list.description,
                                name: list.name,
                                listItems: res.data.items
                            };
                            dispatch(fetchAccountListsSuccess({[list.id]: accountList}));
                        })
                        .catch(err => {
                            dispatch(Fail(err));
                        });
                });
            })
            .catch(err => {
                dispatch(Fail(err));
            });
    };
    
};

// Clears a list
const clearListSuccess = (id) => {
    return {
        type: actionTypes.CLEAR_LIST_SUCCESS,id
    };
};

export const clearList = (listID, sessionID) => {
    return dispatch => {
        dispatch(Start());
        axios.post(`/list/${listID}/clear?api_key=${apiKey}&session_id=${sessionID}&confirm=true`)
            .then(res => {
                dispatch(clearListSuccess(listID));
            })
            .catch(err => {
                dispatch(Fail(err));
            });
    };
};

// Delete List
const deleteListSuccess = (id) => {
    return {
        type: actionTypes.DELETE_LIST_SUCCESS,
        id
    };
};

export const deleteList = (id, sessionID) => {
    return dispatch => {
        dispatch(Start());
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
                } else {
                    dispatch(Fail(err));
                }
            });
    };
};

// Add Media To List
const addMediaSuccess = (id, data) => {
    return {
        type: actionTypes.ADD_MEDIA,
        id,
        data
    };
};

export const addMedia = (mediaType, mediaID, listID, sessionID) => {
    return dispatch => {
        axios({
            url: `/list/${listID}/add_item?api_key=${apiKey}&session_id=${sessionID}`,
            method: 'post',
            data: {
                media_id: mediaID
            }
        })
            .then(res => {
                console.log(res.data);
                axios.get(`/${mediaType}/${mediaID}?api_key=${apiKey}&language=en-US`)
                .then(res => {
                    dispatch(addMediaSuccess(listID, res.data));
                })
                .catch(err => {
                    dispatch(Fail(err));
                });
            })
            .catch(err => {
                dispatch(Fail(err));
            });
    };
};

// Remove Media From List
export const removeMediaSuccess = (id, mediaID) => {
    return {
        type: actionTypes.REMOVE_MEDIA,
        id,
        mediaID
    };
};

export const removeMedia = (mediaID, listID, sessionID) => {
    return dispatch => {
        axios({
            url: `/list/${listID}/remove_item?api_key=${apiKey}&session_id=${sessionID}`,
            method: 'post',
            data: {
                media_id: mediaID
            }
        })
        .then(res => {
            console.log(res.data);
            dispatch(removeMediaSuccess(listID, mediaID));
        })
        .catch(err => {
            dispatch(Fail(err));
        });
    };
};

const createNewListSuccess = (id, data) => {
    return {
        type: actionTypes.CREATE_NEW_LIST_SUCCESS,
        id,
        data 
    };
};

export const createNewList = (sessionID, name, description) => {
    return dispatch => {
        dispatch(Start());
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
                let id = res.data.list_id;
                let data = {
                    description,
                    name,
                    listItemS: [],
                    id
                }
                console.log();
                dispatch(createNewListSuccess(res.data.list_id, {[id]: data}));
            })
            .catch(err => {
                dispatch(Fail(err));
            });
    };
};

// Removes the media from the redux State
const removeStateMediaSuccess = (stateType, mediaID, mediaType) => {
    return {
        type: actionTypes.REMOVE_STATE_MEDIA,
        stateType,
        mediaID,
        mediaType
    };
};

// Updates Rating
const addRating = (mediaID, value) => {
    return {
        type: actionTypes.ADD_RATING,
        mediaID,
        value
    };
};

const removeRating = (mediaID) => {
    return {
        type: actionTypes.REMOVE_RATING,
        mediaID
    };
};


export const updateRating = (type, id, value, sessionID, requestType, isGuest) => {
    return dispatch => {
        dispatch(Start());
        let sessionQuery = `session_id=${sessionID}`;
        if(isGuest) {
            sessionQuery = `guest_session_id=${sessionID}`;
        }
        let config = {
            url: `/${type}/${id}/rating?api_key=${apiKey}&${sessionQuery}`,
            method: 'post',
            data: {
                value
            }
        };
        if(requestType === "delete") {
            config = {
                url: `/${type}/${id}/rating?api_key=${apiKey}&${sessionQuery}`,
                method: 'delete',
            };
        }
        axios(config)
            .then(res => {
                console.log(res.data.status_message);
                if(requestType === 'post') {
                    dispatch(addRating(id, value));
                } else if(requestType === 'delete'){
                    dispatch(removeRating(id));
                    dispatch(removeStateMediaSuccess('rated', id, type+'s'));
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(Fail(err));
            });
    };
};

// Updates Media State
const updateMediaStateSuccess = (mediaID, mediaState) => {
    return {
        type: actionTypes.UPDATE_MEDIA_STATE_SUCCESS,
        mediaID,
        mediaState
    };
};

// 234242, 3414141, movie/tv, 123131, favorites/watchlist/rated, true/false
export const updateMediaState = (accountID, sessionID, mediaType, mediaID, stateType, stateValue) => {
    return dispatch => {
        dispatch(Start());
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
                if(stateValue) {
                    dispatch(removeStateMediaSuccess(stateType, mediaID, mediaType+'s'));
                }
            })
            .catch(err => {
                dispatch(Fail(err));
            });
    };
};

export const setGuestMedia = (mediaID, status) => {
    return {
        type: actionTypes.SET_GUEST_MEDIA,
        mediaID,
        status
    };
};

const addStateMediaSuccess = (mediaID, mediaType, data, stateType) => {
    return {
        type: actionTypes.ADD_STATE_MEDIA,
        mediaID,
        data,
        stateType,
        mediaType
    };
};

export const addStateMedia = (mediaType, mediaID, stateType) => {
    return dispatch => {
        axios.get(`/${mediaType}/${mediaID}?api_key=${apiKey}&language=en-US`)
        .then(res => {
            dispatch(addStateMediaSuccess(mediaID, mediaType, res.data, stateType));
        })
        .catch(err => {
            dispatch(Fail(err));
        });
    };
};

const fetchAccountMediaStateSuccess = (data, stateType, mediaType) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_MEDIA_STATE,
        data, 
        stateType, 
        mediaType
    };
};

export const fetchAccountMediaState = (accountID, stateType, mediaType, sessionID) => {
    return dispatch => {
        dispatch(Start());
        axios.get(`/account/${accountID}/${stateType}/${mediaType}?api_key=${apiKey}&session_id=${sessionID}&language=en-US&sort_by=created_at.asc&page=1`)
            .then(res => {
                dispatch(fetchAccountMediaStateSuccess(res.data.results, stateType, mediaType));
            })
            .catch(err => {
                dispatch(Fail(err));
            });
    };
};