import * as actionTypes from '../actions/actionTypes';
import { apiKey } from '../../shared/Axios/axios';

const initialState = {
    searchQuery: '',
    typeQuery: 'movie',
    path: '',
    page: 1,
    previousSearch: {
        search: '',
        type: ''
    },
    searched: false 
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_SEARCH_QUERY: 
            return {
                ...state,
                searchQuery: action.search
            };
        case actionTypes.CHANGE_SEARCH_TYPE_QUERY:
            return {
                ...state,
                typeQuery: action.mediaType
            };
        case actionTypes.SET_SEARCH_PATH:
            return {
                ...state,
                path: `/search/${state.typeQuery}?api_key=${apiKey}&language=en-US&query=${state.searchQuery}&page=1&include_adult=false`,
                previousSearch: {
                    search: state.searchQuery,
                    type: state.typeQuery
                },
                searched: true    
            };
        case actionTypes.CHANGE_SEARCH_PAGE:
            return {
                ...state,
                path: `/search/${state.typeQuery}?api_key=${apiKey}&language=en-US&query=${state.searchQuery}&page=${action.page}&include_adult=false` 
            };
        default: 
            return state;
    };
};

export default reducer;