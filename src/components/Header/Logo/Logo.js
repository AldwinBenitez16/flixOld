// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// CSS
import styles from './Logo.module.css';

// Assets
import logoSvg from '../../../assets/images/svgs/logo.svg'

const logo = () => (
    <div className={styles.Logo}>
        <Link to="/">
            <img src={logoSvg} alt='Flix app logo'/>
        </Link>
    </div>
);
 
export default logo;
