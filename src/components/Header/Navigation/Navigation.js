// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Components
import NavigationItem from './NavigationItem/NavigationItem';

const navigation = (props) => {
    let loginNav = <NavigationItem path="/login">Login</NavigationItem>;
    let userNav = null;
    if(props.isAuth || props.isGuest) {
        loginNav = <NavigationItem path="/logout">Logout</NavigationItem>;
    }
    if(props.isAuth) {
        userNav = <NavigationItem path="/user">{props.IdData.username}</NavigationItem>;
    }                                                                                   
    if(props.isGuest) {
        userNav = <NavigationItem path="/home" active="Guest">Guest</NavigationItem>;
    }
    return(
        <nav className={props.navStyles}>
            <ul>
                <NavigationItem path="/home">Search</NavigationItem>
                <NavigationItem path="/movies">Movies</NavigationItem>
                <NavigationItem path="/tvshows">TV</NavigationItem>
                <NavigationItem path="/explore">Explore</NavigationItem>
                {userNav}
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
