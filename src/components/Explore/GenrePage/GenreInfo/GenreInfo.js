// Dependencies
import React from 'react';

// Components
import Pagination from './Pagination/Pagination';

// CSS
import styles from './GenreInfo.module.css';

const genreInfo = (props) => {
    let genreItems = null;
    let pagination= null;

    if(!props.loading && props.data !== null) {
        genreItems = props.data.results.map(curr => {
            return (
                <div key={curr.id}>
                    <img 
                        src={`https://image.tmdb.org/t/p/w500/${curr.poster_path}`} 
                        onError={(e) => {e.target.src='https://i.imgur.com/zwpr2vD.jpg'}}  
                        alt={curr.title}/>
                </div>
            );
        });
        pagination = <Pagination
            max={props.data.total_pages}
            changePage={props.changePage}
            page={props.page} />;
    }
    return (
        <div className={styles.GenreInfo}>
            <div className={styles.GenreTitle}>
                <h2>{props.title}</h2>
            </div>
            {genreItems}
            {pagination}
        </div>
    );
};

export default genreInfo;