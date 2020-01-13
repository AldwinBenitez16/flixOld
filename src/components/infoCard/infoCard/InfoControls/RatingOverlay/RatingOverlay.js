import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './RatingOverlay.module.css';

import { ReactComponent as StarIcon } from '../../../../../assets/images/svgs/star.svg';

class RatingOverlay extends Component {
    
    state={
        cursorPos: 0,
        addClass: ''
    }
    
    getRatingAmountHandler = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        let ratingAmount = Math.round(x / 12) * 12;
        this.setState({ cursorPos: ratingAmount });
        if(ratingAmount >= 108) {
            this.setState({ addClass: styles.Hide });
        } else {
            this.setState({ addClass: '' }); 
        }
        this.props.changeRatingValue( ratingAmount/12 );
    };

    componentDidMount() {
        this.setDefaultRating();
    }

    setDefaultRating = () => {
        const rated = this.props.mediaState[`${this.props.id}`].rated;
        if(!rated) {
            this.setState({ cursorPos: 0, addClass: '' });
        } else {
            this.setState({ cursorPos: rated.value * 12 });
        }
    }
    
    render() {
        const key = this.props.mediaState[`${this.props.id}`].rated;
        return ( 
            <div 
                key={key}
                title="Rate"
                className={styles.Rating}
                onClick={() => {
                    if(this.state.cursorPos/12 <= 0) {
                        this.props.updateRating("delete");
                    } else {
                        this.props.updateRating("post");
                    }
                }}
                onMouseMove={(e) => this.getRatingAmountHandler(e)}
                onMouseLeave={this.setDefaultRating} >
                <div style={{
                    width: `calc(120px - ${this.state.cursorPos + "px"})`
                }} className={styles.RatingOverlay}>
                    <StarIcon className={this.state.addClass}/>
                    <StarIcon className={this.state.addClass}/>
                    <StarIcon className={this.state.addClass}/>
                    <StarIcon className={this.state.addClass}/>
                    <StarIcon className={this.state.addClass}/>
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

const mapStateToProps = state => {
    return {
        mediaState: state.info.mediaState
    };
};

export default connect(mapStateToProps)(RatingOverlay);