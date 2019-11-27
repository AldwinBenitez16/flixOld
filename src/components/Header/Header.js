// Dependencies
import React from 'react';

// Components
import Dropdown from './Sidedrawer/Dropdown/Dropdown';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import Search from './Search/Search';

// CSS
import styles from './Header.module.css';

const navigation = (props) => {
    return (
        <div className={styles.Header}>
            <Dropdown clicked={props.toggleMenu}/>
            <Logo />
            <Navigation navStyles={styles.NavigationDesk}/>
            <Search />
        </div>
    );
};

export default navigation;

/** -- Destop
 * -- Logo
 * -- Nav Items
 * -- Search
 */

 /** -- Mobile
 * -- Nav Items (A Drawer)
 * -- Logo
 * -- Search
 */