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
                clicked={props.showFavorites}>Favorites</Button>
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Show Favorites"
                clicked={props.showRated}>Rated</Button>
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Show Favorites"
                clicked={props.showWatchlist}>WatchList</Button>
            <Button
                addClass={[styles.UpdatedButton]}
                type="Success"
                action="Show Favorites"
                clicked={props.showLists}>Lists</Button>
        </div>
    );
};

export default userControls;