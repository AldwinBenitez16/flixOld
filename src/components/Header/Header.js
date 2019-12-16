// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Components
import DropdownDrawer from './Sidedrawer/DropdownDrawer/DropdownDrawer';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import SearchInput from './SearchInput/SearchInput';
import DropdownSearch from './SearchInput/DropdownSearch/DropdownSearch';
import NavigationItem from './Navigation/NavigationItem/NavigationItem';

// CSS
import styles from './Header.module.css';
import navStyles from '../../shared/Styles/Navigation.module.css';
import searchStyles from '../../shared/Styles/Search.module.css';

const header = (props) => {
    let loginNav = <NavigationItem path="/login">Login</NavigationItem>;
    if(props.isAuth || props.isGuest) {
        loginNav = <NavigationItem path="/logout">Log out</NavigationItem>;
    }
    return (
        <div className={styles.Header}>
            <DropdownDrawer clicked={props.toggleMenu}/>
            <Logo />
            <Navigation navStyles={navStyles.NavigationDesk}/>
            <SearchInput 
                value={props.searchValue} 
                changed={props.onSearchChange}
                addClass={[searchStyles.SearchDesk, searchStyles.HeaderSearch]}/>
            <div className={styles.Desk}>
                {loginNav}
            </div>
            <DropdownSearch clicked={props.toggleSearch}/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authenticated,
        isGuest: state.auth.guestAuth,
        IdData: state.auth.sessionIdData
    };
};

export default connect(mapStateToProps)(header);

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