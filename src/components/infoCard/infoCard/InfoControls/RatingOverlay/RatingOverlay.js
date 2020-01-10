import React, { Component } from 'react';

import styles from './RatingOverlay.module.css';

import { ReactComponent as StarIcon } from '../../../../../assets/images/svgs/star.svg';

class RatingOverlay extends Component {
    
    state={
        cursorPos: 0
    }
    
    getRatingAmountHandler = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        let ratingAmount = Math.round(x / 12) * 12;
        this.setState({ cursorPos: ratingAmount });
        console.log(ratingAmount/12);
    };
    
    render() {
        return ( 
            <div 
                title="Rate"
                className={styles.Rating}
                onMouseMove={(e) => this.getRatingAmountHandler(e)}>
                <div style={{
                    width: `calc(120px - ${this.state.cursorPos + "px"})`
                }} className={styles.RatingOverlay}>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                </div>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
            </div>
        );
    };
};

export default RatingOverlay;