import React, { Component } from 'react';
import axios, { apiKey } from '../../shared/Axios/axios'; 

import SearchInput from '../../components/Header/SearchInput/SearchInput';
import Spinner from '../../components/UI/Spinner/Spinner';

import styles from './Home.module.css';
import searchStyles from '../../shared/Styles/Search.module.css';

class Home extends Component {

    state={
        searchQuery: '',
        backdropPath: '',
        typeQuery: 'movie'
    }

    componentDidMount() {
        axios.get(`/movie/now_playing?api_key=${apiKey}&language=en-US`)
            .then(res => {
                console.log(res.data);
                let counter = 0;
                let backdrop = res.data.results[counter].backdrop_path;
                while(!backdrop) {
                    counter++;
                    backdrop = res.data.results[counter].backdrop_path;
                }
                this.setState({ backdropPath: `https://image.tmdb.org/t/p/w1280/${backdrop}` });
            })
            .catch(err => {
                console.log(err);
            });
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
        let backgroundStyles = {
            backgroundImage: `url('${this.state.backdropPath}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        };
        let homeContent = (
            <div className={styles.Loading}>
                <Spinner />
            </div>
        );
        if(this.state.backdropPath.length > 0) {
            homeContent = (
                <div style={backgroundStyles} className={styles.SearchContainer} >
                    <SearchInput 
                        addClass={[searchStyles.SearchDesk, searchStyles.MainSearch, styles.HomeSearch]}
                        viewSearchPage={this.viewSearchPageHandler}
                        ChangeSearchTypeQuery={this.ChangeSearchTypeQueryHandler}
                        ChangeSearchQuery={this.ChangeSearchQueryHandler} />
                    
                </div>
            );
        }
        return homeContent;
    };
};

export default Home;