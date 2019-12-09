// Dependencies
import React, { Fragment } from 'react';

// Components 
import Spinner from '../../UI/Spinner/Spinner';
import InfoControls from './InfoControls/InfoControls';
import RatingOverlay from './RatingOverlay/RatingOverlay';
import ListOverlay from './ListOverlay/ListOverlay';

// CSS
import styles from './InfoCard.module.css';

const InfoCard = (props) => {
    let infoSummary = <Spinner />;
    if(!props.loading && props.data !== null) {
        let genreList = props.data.genres.map(genre => {
            return <li key={genre.id} >{genre.name}</li>
        });

        let controls = null;
        let ratingContent = null;
        let listsContent = null;
        if(props.isAuth) {
            if (props.showRatingOverlay) {
                ratingContent = <RatingOverlay 
                                    changed={props.changeRatingValue}
                                    rateValue={props.ratingValue}
                                    updateRating={props.updateRating}/>;
            }
            if(props.showListsOverlay) {
                listsContent = <ListOverlay mediaID={props.mediaID}/>
            }
            controls = (
                <Fragment>
                    <InfoControls
                        id={props.mediaID}
                        toggleMediaState={props.toggleMediaState}
                        toggleRatingOverlay={props.toggleRatingOverlay}
                        toggleListsOverlay={props.toggleListsOverlay}
                        updateRating={props.updateRating} />
                    {ratingContent}
                    {listsContent}
                </Fragment>
            );
        }
        infoSummary = (
            <Fragment>
                <img src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
                alt={props.data.original_title}/>
                <div className={styles.InfoData}>
                    <h2>{props.data.original_title}</h2>
                    <h3>Overview</h3>
                    <p className={styles.Overview}>{props.data.overview}</p>
                    <div className={styles.Genres}>
                        <h4>Genres: </h4>
                        <ul>
                            {genreList}
                        </ul>
                    </div>
                    <div className={styles.InfoBox}>
                        <p>Popularity: {props.data.popularity}</p>
                        <p>Release: {props.data.release_date}</p>
                        <p>Vote Average: {props.data.vote_average}</p>
                        <p>Runtime: {props.data.runtime} mins</p>
                    </div>
                </div>
                {controls}
            </Fragment>
        );
    }
    return (
        <div className={styles.InfoCard}>
            {infoSummary}
        </div>
    );
};

export default InfoCard;