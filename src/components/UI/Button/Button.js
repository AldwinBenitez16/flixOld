// Dependencies
import React from 'react';

// CSS
import styles from './Button.module.css';

const button = (props) => (
    <button 
        className={[styles.Button, styles[props.type]].join(' ')}
        onClick={props.clicked}
        disabled={props.disabled}>{props.children}</button>
);

export default button;