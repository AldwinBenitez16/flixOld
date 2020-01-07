import React, { Fragment } from 'react';

import styles from './InfoData.module.css';

const infoData = (props) => {

    let genreList = props.data.genres.map(genre => {
        return <li key={genre.id} >{genre.name}</li>
    });

    return (
        <Fragment>
            <img src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
            alt={props.data.original_title}/>
            <div className={styles.InfoDataContainer}>
                <h2>{props.data.original_title ? props.data.original_title : props.data.original_name}</h2>
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
        </Fragment>
    );
};

export default infoData;