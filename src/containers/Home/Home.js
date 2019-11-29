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

    viewInfoHandler = (type, title, movieId) => {
        this.props.history.push(`/${type}/${title}?movieId=${movieId}`);
    }

    render() {
        return(
            <div className={styles.Home}>
                <WithData path={`/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`}>
                    <Banner
                        viewInfo={this.viewInfoHandler} 
                        show={this.state.showOverlay}
                        closeOverlay={this.closeOverlayHandler}
                        showOverlay={this.showOverlayHandwler}/>
                </WithData>
                <WithData path={`/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider
                        viewInfo={this.viewInfoHandler}  
                        title="Now Playing"/>
                </WithData>
                <WithData path={`/trending/movie/week?api_key=${apiKey}`}>
                    <Slider
                        viewInfo={this.viewInfoHandler}  
                        title="Trending Movies"/>
                </WithData>
                <WithData path={`/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider
                        viewInfo={this.viewInfoHandler}  
                        title="Upcoming"/>
                </WithData>
                <WithData path={`/trending/tv/week?api_key=${apiKey}`}>
                    <Slider
                        viewInfo={this.viewInfoHandler}  
                        title="Trending TV Shows"/>
                </WithData>
                <WithData path={`/tv/popular?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider
                        viewInfo={this.viewInfoHandler}  
                        title="Popular Tv Shows"/>
                </WithData>
            </div>
        );
    }
}

export default Home;