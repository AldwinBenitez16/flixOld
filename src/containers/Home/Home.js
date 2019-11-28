// Dependencies
import React, { Component } from 'react';
import { apiKey } from '../../shared/Axios/axios';

// HOC
import WithData from '../../hoc/withDataWrapper/withDataWrapper';

// Components
import Slider from '../../components/Home/Slider/Slider';

class Home extends Component {
    render() {
        return(
            <div>
                --Banner
                <WithData path={`/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider />
                </WithData>
                <WithData path={`/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider />
                </WithData>
                <WithData path={`/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider />
                </WithData>
                <WithData path={`/trending/movie/week?api_key=${apiKey}`}>
                    <Slider />
                </WithData>
                <WithData path={`/trending/tv/week?api_key=${apiKey}`}>
                    <Slider />
                </WithData>
                <WithData path={`/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider />
                </WithData>
                <WithData path={`/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider />
                </WithData>
                <WithData path={`/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider />
                </WithData>
                <WithData path={`/tv/airing_today?api_key=${apiKey}&language=en-US&page=1`}>
                    <Slider />
                </WithData>
            </div>
        );
    }
}

export default Home;