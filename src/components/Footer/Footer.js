import React from 'react';

import styles from './Footer.module.css';

import { ReactComponent as SourceIcon } from '../../assets/images/svgs/source.svg';
import { ReactComponent as GitIcon } from '../../assets/images/svgs/git.svg';

const footer = () => {
    return ( 
        <div className={styles.Footer}>
            <a
                target="_blank"
                href="https://www.themoviedb.org/" 
                className={styles.TMDBLogo} >
                <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg"
                    alt="The Movie Database Logo" />    
            </a>
            <div className={styles.Icons}>
                <a 
                    title="View GitHub"
                    target="_blank" 
                    href="https://github.com/AldwinBenitez16"><GitIcon /></a>
                <a 
                    title="View Source"
                    target="_blank" 
                    href="https://github.com/AldwinBenitez16/flix"><SourceIcon /></a>
            </div>
        </div>
    );
};

export default footer;