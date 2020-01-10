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
                <hr></hr>
                <h3>Overview</h3>
                <p className={styles.Overview}>{props.data.overview}</p>
                <div className={styles.Genres}>
                    <h3>Genres: </h3>
                    <ul>
                        {genreList}
                    </ul>
                </div>
                <div className={styles.InfoBox}>
                    <p><span className={styles.Label}>Popularity:</span> <span>{props.data.popularity}</span></p>
                    <p><span className={styles.Label}>Release:</span> <span>{props.data.release_date}</span></p>
                    <p><span className={styles.Label}>Vote Average:</span> <span>{props.data.vote_average}</span></p>
                    <p><span className={styles.Label}>Runtime:</span> <span>{props.data.runtime} mins</span></p>
                </div>
            </div>
        </Fragment>
    );
};

export default infoData;