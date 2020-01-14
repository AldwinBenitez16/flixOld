import React, { Component, Fragment } from 'react';
import { apiKey } from '../../shared/Axios/axios'; 

import SearchInput from '../../components/Header/SearchInput/SearchInput';

import styles from './Home.module.css';
import searchStyles from '../../shared/Styles/Search.module.css';
import WallpaperWrapper from '../../hoc/WallpaperWrapper/WallpaperWrapper';

class Home extends Component {

    state={
        searchQuery: '',
        typeQuery: 'movie'
    }

    viewSearchPageHandler = (e) => {
        e.preventDefault();
        this.props.history.push(`/search/${this.state.typeQuery}/${this.state.searchQuery}-1`);
    };

    ChangeSearchTypeQueryHandler = (value) => {
        this.setState({ typeQuery: value });
    };

    ChangeSearchQueryHandler = (value) => {
        this.setState({ searchQuery: value});
    };

    render() {
        return(
            <WallpaperWrapper path={`/movie/now_playing?api_key=${apiKey}&language=en-US`} >
                <div className={styles.SearchContainer} >
                    <SearchInput 
                        placeholder="Search"
                        addClass={[styles.HomeSearch, searchStyles.SearchMob, searchStyles.MainSearch]}
                        viewSearchPage={this.viewSearchPageHandler}
                        ChangeSearchTypeQuery={this.ChangeSearchTypeQueryHandler}
                        ChangeSearchQuery={this.ChangeSearchQueryHandler} />
                </div>
            </WallpaperWrapper>
        );
    };
};

export default Home;