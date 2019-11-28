// Dependencies
import React from 'react';

// Components
import Button from '../../../UI/Button/Button';

// CSS
import styles from './DropdownSearch.module.css';

const dropdown = (props) => (
    <div className={styles.DropdownSearch}>
        <Button clicked={props.clicked}>+</Button>
    </div>
);

export default dropdown;