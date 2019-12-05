import * as actionTypes from './actionTypes';
import axios, { apiKey } from '../../shared/Axios/axios';

const fetchAccountDetailsStart = () => {
    return {
        type: actionTypes.FETCH_ACCOUNT_DETAILS
    };
};

const fetchAccountDetailsSuccess = (accountID) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_DETAILS_SUCCESS,
        accountID
    };
};

const fetchAccountDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_DETAILS_FAIL,
        error
    };
};

export const fetchAccountDetails = (sessionID) => {
    return dispatch => {
        dispatch(fetchAccountDetailsStart());
        axios.get(`/account?api_key=${apiKey}&session_id=${sessionID}`) 
            .then(res => {
                dispatch(fetchAccountDetailsSuccess(res.data.id))
            })
            .catch(err => {
                dispatch(fetchAccountDetailsFail(err));
            });
    };
};