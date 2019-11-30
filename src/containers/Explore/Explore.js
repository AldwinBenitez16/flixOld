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
    render() {
        return(
            <div className={styles.Explore}>
                <Button
                    action="Show Movies"
                    type="Success"
                    clicked={() => {console.log('Explore Movies')}}>Movies</Button>
                <Button
                    action="Show Movies"
                    type="Success"
                    clicked={() => {console.log('Explore Tv Shows')}}>Tv Shows</Button>
                <DataWrapper path={`/genre/movie/list?api_key=${apiKey}&language=en-US`}>
                    <GenreList />  
                </DataWrapper>
                <DataWrapper path={`/genre/tv/list?api_key=${apiKey}&language=en-US`}>
                    <GenreList />  
                </DataWrapper>
            </div>
        );
    }
};

export default Explore;