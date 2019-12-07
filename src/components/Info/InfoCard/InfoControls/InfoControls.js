// Dependencies
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

// Components
import Button from '../../../UI/Button/Button';

// CSS
import styles from './InfoControls.module.css';

// assets
import { ReactComponent as Listdrop } from '../../../../assets/images/svgs/listsdrop.svg';
import { ReactComponent as Listadd } from '../../../../assets/images/svgs/list-.svg';
import { ReactComponent as Listrem } from '../../../../assets/images/svgs/list+.svg';

import { ReactComponent as Heartadd } from '../../../../assets/images/svgs/heart+.svg';
import { ReactComponent as Heartrem } from '../../../../assets/images/svgs/heart-.svg';

import { ReactComponent as Watchadd } from '../../../../assets/images/svgs/watch+.svg';
import { ReactComponent as Watchrem } from '../../../../assets/images/svgs/watch-.svg';

import { ReactComponent as Rateadd } from '../../../../assets/images/svgs/rate+.svg';
import { ReactComponent as Raterem } from '../../../../assets/images/svgs/rate-.svg';

const userControls = (props) => {
    let controlsContent = null;
    if (props.accountState) {
        if(props.accountState[`${props.id}`]) {
            const mediaState = props.accountState[`${props.id}`];
            controlsContent = (
                <Fragment>
                    <Button
                        addClass={[styles.UpdatedButton]}
                        type="Success"
                        action="Add To Lists"
                        clicked={() => {}}><Listdrop /></Button>
                    <Button
                        addClass={[styles.UpdatedButton]}
                        type="Success"
                        action="Rate"
                        clicked={() => mediaState.rated ? props.updateRating("delete") : props.toggleRatingOverlay() }>{mediaState.rated ? <Raterem /> : <Rateadd />}</Button>
                    <Button
                        addClass={[styles.UpdatedButton]}
                        type="Success"
                        action="Favorite"
                        clicked={() => props.toggleMediaState('favorite')}>{mediaState.favorite ? <Heartrem /> : <Heartadd />}</Button>
                    <Button
                        addClass={[styles.UpdatedButton]}
                        type="Success"
                        action="Watchlist"
                        clicked={() => props.toggleMediaState('watchlist')}>{mediaState.watchlist ? <Watchrem /> : <Watchadd />}</Button>
                </Fragment>
            );
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
        accountState: state.info.accountState
    };
};

export default connect(mapStateToProps)(userControls);