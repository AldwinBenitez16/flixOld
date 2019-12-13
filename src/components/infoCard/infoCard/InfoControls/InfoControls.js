// Dependencies
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

// Components
import Button from '../../../UI/Button/Button';

// CSS
import styles from './InfoControls.module.css';

// assets
import { ReactComponent as Listdrop } from '../../../../assets/images/svgs/listsdrop.svg';

import { ReactComponent as Heartadd } from '../../../../assets/images/svgs/heart+.svg';
import { ReactComponent as Heartrem } from '../../../../assets/images/svgs/heart-.svg';

import { ReactComponent as Watchadd } from '../../../../assets/images/svgs/watch+.svg';
import { ReactComponent as Watchrem } from '../../../../assets/images/svgs/watch-.svg';

import { ReactComponent as Rateadd } from '../../../../assets/images/svgs/rate+.svg';
import { ReactComponent as Raterem } from '../../../../assets/images/svgs/rate-.svg';

const userControls = (props) => {
    const { 
        mediaState, 
        id, 
        updateRating, 
        toggleRatingOverlay, 
        toggleMediaState, 
        toggleListsOverlay,
        isGuest 
    } = props;

    console.log(mediaState);
    let controlsContent = null;
    if(mediaState) {
        if(mediaState[`${id}`]) {
            const media = mediaState[`${id}`];
            controlsContent = (
                <Fragment>
                    <Button
                        addClass={[styles.UpdatedButton]}
                        type="Success"
                        action="Add To Lists"
                        clicked={toggleListsOverlay}><Listdrop /></Button>
                    <Button
                        addClass={[styles.UpdatedButton]}
                        type="Success"
                        action="Rate"
                        clicked={() => media.rated ? updateRating("delete") : toggleRatingOverlay() }>{media.rated ? <Raterem /> : <Rateadd />}</Button>
                    <Button
                        addClass={[styles.UpdatedButton]}
                        type="Success"
                        action="Favorite"
                        clicked={() => toggleMediaState('favorite')}>{media.favorite ? <Heartrem /> : <Heartadd />}</Button>
                    <Button
                        addClass={[styles.UpdatedButton]}
                        type="Success"
                        action="Watchlist"
                        clicked={() => toggleMediaState('watchlist')}>{media.watchlist ? <Watchrem /> : <Watchadd />}</Button>
                </Fragment>
            );
        if(isGuest) {
            controlsContent = (
                <Fragment>
                    <Button
                        addClass={[styles.UpdatedButton]}
                        type="Success"
                        action="Rate"
                        clicked={() => media.rated ? updateRating("delete") : toggleRatingOverlay() }>{media.rated ? <Raterem /> : <Rateadd />}</Button>
                </Fragment>
            );
        }
        }
    }
    return (
        <div className={styles.InfoControls}> 
            {controlsContent} 
        </div>
    );
};

const mapStateToProps = state => {
    return {
        mediaState: state.info.mediaState,
        isGuest: state.auth.guestAuth
    };
};

export default connect(mapStateToProps)(userControls);