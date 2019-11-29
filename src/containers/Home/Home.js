// Dependencies
import React, { Component } from 'react';
import { apiKey } from '../../shared/Axios/axios';

// HOC
import WithData from '../../hoc/withDataWrapper/withDataWrapper';

// Components
import Slider from '../../components/Home/Slider/Slider';
import Banner from '../../components/Home/Banner/Banner';

// CSS
import styles from './Home.module.css';

class Home extends Component {
    state = {
        showOverlay: true
    }

    closeOverlayHandler = () => {
        this.setState({ showOverlay: false });
    }

    showOverlayHandler = () => {
        this.setState({ showOverlay: true });
    }

    render() {
        return(
            <div className={styles.Home}>
                <WithData path={`/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`}>
                    <Banner 
                        show={this.state.showOverlay}
                        closeOverlay={this.closeOverlayHandler}
                        showOverlay={this.showOverlayHandler}/>
                </WithData>
                <WithData path={`/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider title="Now Playing"/>
                </WithData>
                <WithData path={`/trending/movie/week?api_key=${apiKey}`}>
                    <Slider title="Trending Movies"/>
                </WithData>
                <WithData path={`/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider title="Upcoming"/>
                </WithData>
                <WithData path={`/trending/tv/week?api_key=${apiKey}`}>
                    <Slider title="Trending TV Shows"/>
                </WithData>
                <WithData path={`/tv/popular?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider title="Popular Tv Shows"/>
                </WithData>
            </div>
        );
    }
}

export default Home;