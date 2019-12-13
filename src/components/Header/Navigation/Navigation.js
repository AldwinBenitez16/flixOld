// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Components
import NavigationItem from './NavigationItem/NavigationItem';

// CSS
import styles from './Navigation.module.css';

const navigation = (props) => {
    let loginNav = (
        <div className={styles.Mobile}>
            <NavigationItem path="/login">Login</NavigationItem>
        </div>
    );
    if(props.isAuth) {
        loginNav = <NavigationItem path="/user">{props.IdData.username}</NavigationItem>;
    }
    if(props.isGuest) {
        loginNav = <NavigationItem path="/home" active="Guest">Guest</NavigationItem>;
    }
    return(
        <nav className={props.navStyles}>
            <ul>
                <NavigationItem path="/home">Home</NavigationItem>
                <NavigationItem path="/movies">Movies</NavigationItem>
                <NavigationItem path="/tvshows">Tv-Shows</NavigationItem>
                <NavigationItem path="/explore">Explore</NavigationItem>
                {loginNav}
            </ul>
        </nav>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authenticated,
        isGuest: state.auth.guestAuth,
        IdData: state.auth.sessionIdData
    };
};

export default connect(mapStateToProps)(navigation);
