/* Layout Component That lays the different sections (nav, main, footer) */

// Dependencies
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Header from '../../components/Header/Header';
import Sidedrawer from '../../components/Header/Sidedrawer/Sidedrawer';
import SearchInput from '../../components/Header/SearchInput/SearchInput';

// CSS
import styles from './Layout.module.css';
import searchStyles from '../../shared/Styles/Search.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showSearch: false,
        search: ''
    }

    toggleMenuHandler = () => {
        this.setState( prev => {
            return {
                showSideDrawer: !prev.showSideDrawer
            };
        });
    }

    toggleSearchHandler = () => {
        this.setState( prev => {
            return {
                showSearch: !prev.showSearch
            };
        });
    }

    closeMenuHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    searchQueryHandler = (e) => {
        this.setState({ search: e.target.value });
    }

    render() {
        let search = null;
        if(this.state.showSearch && this.props.history.location.pathname !== '/home') {
            search = (
                <SearchInput 
                    value={this.state.search} 
                    addClass={[searchStyles.SearchMob]}
                    changed={this.searchQueryHandler}/>
            );
        }

        return(
            <Fragment>
                <Sidedrawer
                    show={this.state.showSideDrawer}
                    close={this.closeMenuHandler}/>
                <Header 
                    toggleMenu={this.toggleMenuHandler}
                    toggleSearch={this.toggleSearchHandler}
                    searchValue={this.state.search}
                    onSearchChange={this.searchQueryHandler} />
                {search}
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    };
};

export default withRouter(Layout);