// Dependencies
import React from 'react';

// Components
import Spinner from '../../UI/Spinner/Spinner';

// CSS
import styles from './GenreList.module.css';

const genreList = (props) => {
    let genres = null;
    if(props.show) {
        genres = <Spinner />;
        if(!props.loading && props.data !== null) {
            genres = (
                props.data.genres.map(genre => {
                    return (
                        <div 
                            onClick={() => props.viewGenre(genre.name, genre.id, props.type)} 
                            key={genre.id}>
                        <h3>{genre.name}</h3>
                        </div>
                    );
                })
            );
        }
    }
    return (
        <div className={props.show ? styles.GenreList : styles.Hidden}>
            {genres}
        </div>
    );
};

export default genreList;