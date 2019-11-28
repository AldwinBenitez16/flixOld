// Dependencies
import React from 'react';

// Components
import DropdownDrawer from './Sidedrawer/DropdownDrawer/DropdownDrawer';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import Search from './Search/Search';
import DropdownSearch from './Search/DropdownSearch/DropdownSearch';

// CSS
import styles from './Header.module.css';
import navStyles from '../../shared/Styles/Navigation.module.css';
import searchStyles from '../../shared/Styles/Search.module.css';

const header = (props) => {
    return (
        <div className={styles.Header}>
            <DropdownDrawer clicked={props.toggleMenu}/>
            <Logo />
            <Navigation navStyles={navStyles.NavigationDesk}/>
            <Search 
                value={props.searchValue} 
                changed={props.onSearchChange}
                searchStyles={searchStyles.SearchDesk}/>
            <DropdownSearch clicked={props.toggleSearch}/>
        </div>
    );
};

export default header;

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