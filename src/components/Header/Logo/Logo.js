// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// CSS
import styles from './Logo.module.css';

// Assets
import logoSvg from '../../../assets/images/svgs/logo.svg';

const logo = () => (
    <div className={styles.Logo}>
        <Link to="/home">
            <p className={styles.LogoLetters}>
                <span className={styles.First} >R<span className={styles.R_Extend}>eact</span></span>
                <span className={styles.Second}>M<span className={styles.M_Extend}>edia</span><span className={styles.D_Mob}>D</span></span>
            </p>
        </Link>
    </div>
);
 
export default logo;
