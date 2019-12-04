import * as actionTypes from './actionTypes';
import axios, { apiKey } from '../../shared/Axios/axios';

const fetchTokenStart = () => {
    return {
        type: actionTypes.FETCH_TOKEN
    };
}; 

const fetchTokenSuccess = (data) => {
    return {
        type: actionTypes.FETCH_TOKEN_SUCCESS,
        data
    };
}; 

const fetchTokenFail = (error) => {
    return {
        type: actionTypes.FETCH_TOKEN_FAIL,
        error
    };
}; 

export const fetchToken = () => {
    return dispatch => {
        dispatch(fetchTokenStart());
        axios.get(`/authentication/token/new?api_key=${apiKey}`)
            .then(res => {
                dispatch(fetchTokenSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchTokenFail(err));
            });
    }
};

const fetchSessionIdStart = () => {
    return {
        type: actionTypes.FETCH_SESSION_ID
    };
};

const fetchSessionIdSuccess = (data) => {
    return {
        type: actionTypes.FETCH_SESSION_ID_SUCCESS,
        data
    };
};

const fetchSessionIdFail = (error) => {
    return {
        type: actionTypes.FETCH_SESSION_ID_FAIL,
        error
    };
};

const fetchSessionIdFinal = (token, username) => {
    return dispatch => {
        dispatch(fetchSessionIdStart)
        axios({
            url: `/authentication/session/new?api_key=${apiKey}`, 
            method: 'post',
            data: {
                request_token: token
            }
        })
            .then(res => {
                dispatch(fetchSessionIdSuccess({...res.data, username}));
            })
            .catch(error => {
                dispatch(fetchSessionIdFail(error));
            });
    };
};

export const fetchSessionId = (token, username, password) => {
    return dispatch => {
        const loginData = {
            username: "Snaimmail",
            password: "itsokay",
            request_token: token
        };
        axios({
            url: `/authentication/token/validate_with_login?api_key=${apiKey}`, 
            method: 'post',
            data: loginData
        })
            .then(res => {
                dispatch(fetchSessionIdFinal(token, "Snaimmail"));
            })
            .catch(error => {
                dispatch(fetchSessionIdFail(error));
            });
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    };
};