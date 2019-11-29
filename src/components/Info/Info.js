// Dependencies
import React from 'react';
import { apiKey } from '../../shared/Axios/axios';

// Components
import InfoDisplay from './InfoCard/InfoCard';
import WithData from '../../hoc/withDataWrapper/withDataWrapper';

// CSS
import styles from './Info.module.css';

const info = (props) => {
    const type = props.match.params.type;
    const query = props.history.location.search;
    const id = query.substring(query.indexOf('=')+1);
    return (
        <div className={styles.Info}>
            <WithData path={`/${type}/${id}?api_key=${apiKey}&language=en-US`}>
                <InfoDisplay />
            </WithData>
        </div>
    );
};

export default info;