// Dependencies
import React from 'react';

// CSS
import styles from './Dropdown.module.css';

const dropdown = (props) => (
    <div 
        className={styles.Dropdown}
        onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
 
export default dropdown;
