// Dependencies
import React from 'react';
import { apiKey } from '../../shared/Axios/axios';

// HOC
import DataWrapper from '../../hoc/DataWrapper/DataWrapper';

// Components
import Banner from '../UI/Banner/Banner';
import Slider from '../UI/Slider/Slider';

// CSS
import styles from './TvShows.module.css';

const tvShows = (props) => {
    return(
        <div style={{ paddingTop: '10px' }} className={styles.TvShows}>
            <DataWrapper path={`/trending/tv/week?api_key=${apiKey}`}>
                <Banner
                    viewInfo={props.viewInfo} 
                    show={props.show}
                    closeOverlay={props.closeOverlay}
                    showOverlay={props.showOverlay}/>
            </DataWrapper>
            <DataWrapper path={`/trending/tv/week?api_key=${apiKey}`}>
                <Slider
                    viewInfo={props.viewInfo}  
                    title="Trending TV Shows"/>
            </DataWrapper>
            <DataWrapper path={`/tv/popular?api_key=${apiKey}&language=en-US&page=1`}>
                <Slider
                    viewInfo={props.viewInfo}  
                    title="Popular Tv Shows"/>
            </DataWrapper>
            <DataWrapper path={`/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`}>
                <Slider
                    viewInfo={props.viewInfo}  
                    title="On The Air"/>
            </DataWrapper>
            <DataWrapper path={`/tv/airing_today?api_key=${apiKey}&language=en-US&page=1`}>
                <Slider
                    viewInfo={props.viewInfo}  
                    title="Airing Today"/>
            </DataWrapper>
        </div>
    );
};

export default tvShows;