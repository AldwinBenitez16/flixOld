// Dependencies
import React from 'react';
import { apiKey } from '../../shared/Axios/axios';

// HOC
import DataWrapper from '../../hoc/DataWrapper/DataWrapper';

// Components
import Banner from '../UI/Banner/Banner';
import Slider from '../UI/Slider/Slider';

// CSS
import styles from './Home.module.css';

const home = (props) => {
    return(
        <div className={styles.Home}>
            <DataWrapper path={`/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`}>
                <Banner
                    viewInfo={props.viewInfo} 
                    show={props.show}
                    closeOverlay={props.closeOverlay}
                    showOverlay={props.showOverlay}/>
            </DataWrapper>
            <DataWrapper path={`/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`}>
                <Slider
                    viewInfo={props.viewInfo}  
                    title="Now Playing"/>
            </DataWrapper>
            <DataWrapper path={`/trending/movie/week?api_key=${apiKey}`}>
                <Slider
                    viewInfo={props.viewInfo}  
                    title="Trending Movies"/>
            </DataWrapper>
            <DataWrapper path={`/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`}>
                <Slider
                    viewInfo={props.viewInfo}  
                    title="Upcoming"/>
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
        </div>
    );
}

export default home;