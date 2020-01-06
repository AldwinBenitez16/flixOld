// Dependencies
import React from 'react';

// CSS
import styles from './DropdownDrawer.module.css';

const dropdown = (props) => (
    <div className={styles.Container}>
        <div 
            className={styles.DropdownDrawer}
            onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
    </div>
);
 
export default dropdown;
