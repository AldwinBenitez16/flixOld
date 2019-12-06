// Dependencies
import React from 'react';

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

const userControls = (props) => {
    return (
        <div className={styles.InfoControls}> 
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Add To Lists"
                clicked={() => {}}><Listdrop /></Button>
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Rate"
                clicked={() => {}}><Rateadd /></Button>
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Favorite"
                clicked={props.addFavorite}><Heartadd /></Button>
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Watch Later"
                clicked={props.addWatchList}><Watchadd /></Button>
        </div>
    );
};

export default userControls;