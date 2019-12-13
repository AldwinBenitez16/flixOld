// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';

// CSS
import styles from './NavigationItem.module.css';

const navigationItem = (props) => {
    let active = styles.active;
    if(props.active) {
        active = "Guest";
    }
    return(
        <li className={styles.NavigationItem}>
            <NavLink to={props.path} activeClassName={active}>{props.children}</NavLink>
        </li>
    );
};

export default navigationItem;