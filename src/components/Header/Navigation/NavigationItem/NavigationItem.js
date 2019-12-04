// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';

// CSS
import styles from './NavigationItem.module.css';

const navigationItem = (props) => {
    return(
        <li className={styles.NavigationItem}>
            <NavLink to={props.path} activeClassName={styles.active}>{props.children}</NavLink>
        </li>
    );
};

export default navigationItem;