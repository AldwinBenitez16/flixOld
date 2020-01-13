import React from 'react';
import { connect } from 'react-redux';

import RatingOverlay from './RatingOverlay/RatingOverlay'
import NavigationItem from '../../../Header/Navigation/NavigationItem/NavigationItem';
import ListOverlay from '../ListOverlay/ListOverlay';

import styles from './InfoControls.module.css';

import { ReactComponent as AddFavoriteIcon } from '../../../../assets/images/svgs/heart+.svg';
import { ReactComponent as RemoveFavoriteIcon } from '../../../../assets/images/svgs/heart-.svg';

import { ReactComponent as AddWatchIcon } from '../../../../assets/images/svgs/watch+.svg';
import { ReactComponent as RemoveWatchIcon } from '../../../../assets/images/svgs/watch-.svg';

const infoControls = (props) => {

    let infoControlsContent = (
        <div className={styles.LoginCatch}>
            <h2>Please Login To Access</h2>
            <hr></hr>
            <NavigationItem path="/login" >Login</NavigationItem>
        </div>
    );
    if(props.auth.authenticated || props.auth.guestAuth) {
        let title='User';
        if(props.auth.authenticated) {
            title = props.auth.sessionIdData.username;
        }
        if(props.auth.guestAuth) {
            title = 'Guest';
        }
        
        if(props.mediaState !== null) {
            const media = props.mediaState[`${props.mediaID}`];
            if(media) {
                infoControlsContent = (
                    <div className={styles.InfoControls}>
                        <h2>{title}</h2>
                        <div className={styles.UserControlsContainer}>
                            <RatingOverlay 
                                changeRatingValue={props.changeRatingValue}
                                updateRating={props.updateRating} 
                                id={props.mediaID} />
                            <div className={styles.UserMediaControls}>
                                <button
                                    onClick={() => props.toggleMedia('favorite')}
                                    title="Add To Favorites" >{media.favorite ? <RemoveFavoriteIcon /> : <AddFavoriteIcon />}</button>
                                <button
                                    onClick={() => props.toggleMedia('watchlist')}
                                    title="Add To Watch Later" >{media.watchlist ? <RemoveWatchIcon /> : <AddWatchIcon />}</button>
                            </div>
                        </div>
                        <hr></hr>
                        <ListOverlay mediaID={props.mediaID} mediaType={props.type}/>
                    </div>
                );
            }
        }
    }

    return infoControlsContent;
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        mediaState: state.info.mediaState,
        isGuest: state.auth.guestAuth
    };
};

export default connect(mapStateToProps)(infoControls);