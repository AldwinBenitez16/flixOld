// Dependencies
import React from 'react';
import { apiKey } from '../../../shared/Axios/axios';
import queryString from 'query-string';

// HOC
import DataWrapper from '../../../hoc/DataWrapper/DataWrapper';

// Components
import GenreInfo from './GenreInfo/GenreInfo';

// CSS
import styles from './GenrePage.module.css';

const genrePage = (props) => {
    const queries = queryString.parse(props.location.search);
    const id = queries.id;
    const type = queries.type;
return(
        <div className={styles.GenrePage}>
            <DataWrapper path={`/discover/${type}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`}>
                <GenreInfo />
            </DataWrapper>
        </div>
    );
};

export default genrePage;