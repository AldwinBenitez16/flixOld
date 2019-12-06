// Dependencies
import React from 'react';

// Components
import Button from '../../UI/Button/Button';

// CSS
import styles from './UserControls.module.css';

const userControls = (props) => {
    return (
        <div className={styles.UserControls}>
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Show Favorites"
                clicked={() => props.showHandler('Favorites')}>Favorites</Button>
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Show Rated"
                clicked={() => props.showHandler('Rated')}>Rated</Button>
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Show WatchList"
                clicked={() => props.showHandler('WatchList')}>WatchList</Button>
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Show Lists"
                clicked={() => props.showHandler('Lists')}>Lists</Button>
        </div>
    );
};

export default userControls;