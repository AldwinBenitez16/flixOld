import * as actionTypes from './actionTypes';

export const changeSearchQuery = (search) => {
    return {
        type: actionTypes.CHANGE_SEARCH_QUERY,
        search
    };
};

export const changeSearchTypeQuery = (mediaType) => {
    return {
        type: actionTypes.CHANGE_SEARCH_TYPE_QUERY,
        mediaType
    };
};

export const setSearchPath = () => {
    return {
        type: actionTypes.SET_SEARCH_PATH
    };
};

export const changeSearchPage = (page) => {
    return {
        type: actionTypes.CHANGE_SEARCH_PAGE,
        page
    };
};