// Dependencies
import React from 'react';

// CSS
import styles from './Button.module.css';

const button = (props) => {
    let newClasses = null;
    if(props.addClass !== undefined && props.addClass !== null) {
        newClasses = props.addClass.join(' ');
    }
    return(
        <button 
            title={props.action}
            className={[styles.Button, styles[props.type], newClasses].join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}>{props.children}</button>
    );
};

export default button;