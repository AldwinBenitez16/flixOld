import React, { Component } from 'react';
import axios, { apiKey } from '../../shared/Axios/axios';

import Overlay from '../../components/UI/Overlay/Overlay';
import Spinner from '../../components/UI/Spinner/Spinner';

import styles from './WallpaperWrapper.module.css';

class WallpaperWrapper extends Component {

    state={
        backdropPath: ''
    }

    componentDidMount() {
        axios.get(this.props.path)
        .then(res => {
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

    render() {
        let backgroundStyles = {
            backgroundImage: `url('${this.state.backdropPath}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            height: 'calc(100vh - 150px)',
            margin: '25px'
        };
        let WallpaperContent = (
            <div className={styles.Loading}>
                <Spinner />
            </div>
        );
        if(this.state.backdropPath.length > 0) {
            WallpaperContent = (
                <div style={backgroundStyles}>
                    <Overlay />
                    {this.props.children}
                </div>
            );
        }
        return WallpaperContent;
    };
};

export default WallpaperWrapper;