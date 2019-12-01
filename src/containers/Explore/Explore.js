// Dependencies
import React, { Component } from 'react';
import { apiKey } from '../../shared/Axios/axios';

// HOC
import DataWrapper from '../../hoc/DataWrapper/DataWrapper';

// Components
import Button from '../../components/UI/Button/Button';
import GenreList from '../../components/Explore/GenreList/GenreList';

// CSS
import styles from './Explore.module.css';

class Explore extends Component {

    state = {
        exploreMovies: true,
        exploreTvShows: false
    }

    toggleShowGenres = () => {
        this.setState(prevState => {
            return {
                exploreMovies: !prevState.exploreMovies,
                exploreTvShows: !prevState.exploreTvShows
            };
        });
    }

    render() {
        return(
            <div className={styles.Explore}>
                <div className={styles.TypeButtons}>
                    <Button
                        action="Explore Movie Genres"
                        type="Success"
                        clicked={this.toggleShowGenres}>Movies</Button>
                    <Button
                        action="Explore Tv Shows Genres"
                        type="Success"
                        clicked={this.toggleShowGenres}>Tv Shows</Button>
                </div>
                <DataWrapper path={`/genre/movie/list?api_key=${apiKey}&language=en-US`}>
                    <GenreList show={this.state.exploreMovies}/>  
                </DataWrapper>
                <DataWrapper path={`/genre/tv/list?api_key=${apiKey}&language=en-US`}>
                    <GenreList show={this.state.exploreTvShows}/>  
                </DataWrapper>
            </div>
        );
    }
};

export default Explore;