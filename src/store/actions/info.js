import * as actionTypes from './actionTypes';
import axios, { apiKey } from '../../shared/Axios/axios'

const fetchAccountStateStart = () => {
    return {
        type: actionTypes.FETCH_ACCOUNT_DETAILS
    };
};
 
const fetchAccountStateSuccess = (mediaState) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_DETAILS_SUCCESS,
        mediaState
    };
};

const fetchAccountStateFail = (error) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_DETAILS_FAIL,
        error
    };
};

export const fetchAccountState = (id, sessionID) => {
    return dispatch => {
        dispatch(fetchAccountStateStart());
        axios.get(`/movie/${id}/account_states?api_key=${apiKey}&session_id=${sessionID}`)
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