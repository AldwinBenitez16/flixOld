// Dependencies
import React from 'react';
import { apiKey } from '../../shared/Axios/axios';

// Components
import InfoDisplay from './InfoCard/InfoCard';
import DataWrapper from '../../hoc/DataWrapper/DataWrapper';

// CSS
import styles from './Info.module.css';

const info = (props) => {
    const type = props.match.params.type;
    const query = props.history.location.search;
    const id = query.substring(query.indexOf('=')+1);
    return (
        <div className={styles.Info}>
            <DataWrapper path={`/${type}/${id}?api_key=${apiKey}&language=en-US`}>
                <InfoDisplay />
            </DataWrapper>
        </div>
    );
};

export default info;