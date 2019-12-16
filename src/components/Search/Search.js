// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { capitalize } from '../../shared/Utillity/Utillity';
import * as actions from '../../store/actions/index';

// Components
import DataInfo from '../UI/DataInfo/DataInfo';
import Spinner from '../UI/Spinner/Spinner';
import SearchInput from '../Header/SearchInput/SearchInput';

// HOC
import DataWrapper from '../../hoc/DataWrapper/DataWrapper';

// CSS
import styles from './Search.module.css';
import searchStyles from '../../shared/Styles/Search.module.css';

class Search extends Component {   
    changePageHandler = (page, max) => {
        if(page > 0 && page <= max) {
            this.props.onChangeSearchPage(page);
        }
    }

    render() {
        const { 
            searchQuery,
            previousSearch,
            previousType,
            searched,
            path
        } = this.props;
        let searchContent = (
            <div className={styles.Invalid}>
                <Spinner />
            </div>
        );

        if(searchQuery.length <= 0 && previousSearch.length <= 0) {
            searchContent = (
                <div className={styles.Invalid}>
                    <p><strong>Invalid Search:</strong> Please Enter A Valid Search!</p>
                </div>
            );
        }
        if(!searched) {
            searchContent = (
                <div className={styles.Invalid}>
                    <p><strong>Search</strong> for your favorite <strong>movies</strong> and <strong>tv shows!!!</strong></p>
                </div>
            );
        }
        if(path.length > 0 && previousSearch.length > 0) {
            searchContent = (
                <Fragment key={path}>
                    <DataWrapper path={path}>
                        <DataInfo 
                            addClass={[styles.DataInfo]}
                            title={`[${capitalize(previousType)}] Search: ${previousSearch}`}
                            changePage={this.changePageHandler} />
                    </DataWrapper>
                </Fragment>
            );
        }

        return(
            <div className={styles.Search}>
                <div className={styles.SearchContainer} >
                    <SearchInput addClass={[searchStyles.SearchDesk, searchStyles.MainSearch, styles.HomeSearch]} />
                </div>
                {searchContent}
            </div>
        ); 
    };
};

const mapStateToProps = state => {
    return {
        searchQuery: state.search.searchQuery,
        previousSearch: state.search.previousSearch.search,
        previousType: state.search.previousSearch.type,
        searched: state.search.searched,
        path: state.search.path
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeSearchPage: (page) => dispatch(actions.changeSearchPage(page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);