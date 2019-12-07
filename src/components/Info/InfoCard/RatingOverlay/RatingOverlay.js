// Dependencies 
import React, { Fragment } from 'react';

// Components 
import Button from '../../../UI/Button/Button';

// CSS
import styles from './RatingOverlay.module.css';

const ratingOverlay = (props) => {
    return (
        <div className={styles.RatingOverlay}>
            <input 
                onChange={(e) => props.changed(e)} 
                type="number" 
                value={props.rateValue} 
                min="1" 
                max="10"/>

            <Button 
                addClass={[styles.UpdatedButton]}
                action="Rate"
                type="Success"
                clicked={props.updateRating}
                >Rate</Button>
        </div>
    );
};

export default ratingOverlay;