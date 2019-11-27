// Dependencies
import React from 'react';

// Components
import Button from '../../UI/Button/Button';

// CSS
import styles from './Search.module.css';

const search = (props) => (
    <div className={styles.Search}>
        <input type="text" value={props.value}/>
        <Button 
            type="Success"
            clicked={() => {}}>+</Button>
    </div>
);
 
export default search;
