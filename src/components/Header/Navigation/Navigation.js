// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Components
import NavigationItem from './NavigationItem/NavigationItem';

// CSS
import styles from './Navigation.module.css';

const navigation = (props) => {
    // if(props.isAuth || props.isGuest) {
    //     loginNav = <NavigationItem path="/logout">Log out</NavigationItem>;
    // }
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
                <NavigationItem path="/home">Search</NavigationItem>
                <NavigationItem path="/movies">Movies</NavigationItem>
                <NavigationItem path="/tvshows">TV<span className={styles.TV_Extend}>-Shows</span></NavigationItem>
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
