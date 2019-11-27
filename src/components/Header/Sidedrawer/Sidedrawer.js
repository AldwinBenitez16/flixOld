// Dependencies
import React from 'react';

// Component
import Backdrop from '../../UI/Backdrop/Backdrop';
import Navigation from '../Navigation/Navigation';
import Button from '../../UI/Button/Button';

// CSS
import styles from './Sidedrawer.module.css';

const sidedrawer = (props) => (
    <div>
        <Backdrop show={props.show} clicked={props.close}/>
        <div className={[styles.Sidedrawer, ( props.show ? styles.Open : styles.Close)].join(' ')}>
            <Button
                type="Danger"
                clicked={props.close}>X</Button>
            <Navigation navStyles={styles.NavigationMob}/>
        </div>  
    </div>
);

export default sidedrawer;
