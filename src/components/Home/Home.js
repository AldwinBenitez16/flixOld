// Dependencies
import React from 'react';
import { apiKey } from '../../shared/Axios/axios';

// HOC
import DataWrapper from '../../hoc/DataWrapper/DataWrapper';

// Components
import Banner from '../UI/Banner/Banner';
import Slider from '../UI/Slider/Slider';

// CSS
import styles from './Home.module.css';

const home = (props) => {
    return(
        <div className={styles.Home}>
            --- search 
        </div>
    );
}

export default home;