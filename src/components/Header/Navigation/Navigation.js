// Dependencies
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigation = (props) => (
    <nav className={props.navStyles}>
        <ul>
            <NavigationItem path="/home">Home</NavigationItem>
            <NavigationItem path="/movies">Movies</NavigationItem>
            <NavigationItem path="/tvshows">Tv-Shows</NavigationItem>
            <NavigationItem path="/explore">Explore</NavigationItem>
            <NavigationItem path="/login">Login</NavigationItem>
        </ul>
    </nav>
);
 
export default navigation;
