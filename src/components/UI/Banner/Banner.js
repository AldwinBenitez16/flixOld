// Dependencies
import React, { Fragment } from 'react';
import { ternary } from '../../../shared/Utillity/Utillity';

// Components
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';

// CSS
import styles from './Banner.module.css';

const banner = (props) => {
    let bannerContainer = (
        <div className={styles.Spinner}>
            <Spinner />
        </div>
    );
    let backup = "N/A";
    if(!props.loading && props.data !== null) {

        let counter = 0;
        while(!props.data.results[counter].backdrop_path) {
            counter++;
        }

        const latest = props.data.results[counter];
        let overlay = null;
        if(props.show) {
            overlay = (
                <div className={styles.Overlay}>
                    <h2>{ternary(latest.original_title, latest.original_name)}</h2>
                    <p>{latest.overview}</p>
                    <div className={styles.Info}>
                        <p>Popularity: {ternary(latest.popularity, backup)}</p>
                        <p>Release: {latest.release_date ? latest.release_date : latest.first_air_date}</p>
                        <p>IMDb: {ternary(latest.vote_average, backup)}</p>
                    </div>
                    <Button
                        addClass={[styles.UpdatedMini]}
                        action="Exit"
                        type="Mini"
                        clicked={props.closeOverlay}>X</Button>
                    <Button
                        addClass={[styles.UpdatedMini, styles.MiniInfo]}
                        action="View More"
                        type="Mini" 
                        clicked={() => props.viewInfo(
                            ternary(latest.original_title, "tv", "movie"), 
                            ternary(latest.original_title, latest.original_name),
                            latest.id)}>i</Button>
                </div>
            );
        }
        bannerContainer = (
            <Fragment>
                <img 
                    src={`https://image.tmdb.org/t/p/w1280/${latest.backdrop_path}`}
                    alt={latest.original_title}/>;
                {!props.show ? 
                <Button
                    addClass={[styles.UpdatedMini, styles.MiniOpenOverlay]}
                    action="Open Info Overlay"
                    type="Mini"
                    clicked={props.showOverlay}>+</Button> : null}
                {overlay}
            </Fragment>
        );
    } 

    return(
        <div className={styles.Banner}>
            {bannerContainer}
        </div>
    );
};

export default banner;