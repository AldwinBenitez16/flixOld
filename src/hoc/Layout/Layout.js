/* Layout Component That lays the different sections (nav, main, footer) */

// Dependencies
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Header from '../../components/Header/Header';
import Sidedrawer from '../../components/Header/Sidedrawer/Sidedrawer';
import SearchInput from '../../components/Header/SearchInput/SearchInput';
import Footer from '../../components/Footer/Footer';

// CSS
import styles from './Layout.module.css';
import searchStyles from '../../shared/Styles/Search.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showSearch: false,
        search: '',
        queryType: 'movie'
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

    viewSearchPageHandler = (e) => {
        e.preventDefault();
        this.props.history.push(`/search/${this.state.queryType}/${this.state.search}-1`);
    };

    searchQueryHandler = (value) => {
        this.setState({ search: value });
    };

    seachTypeQueryHandler = (value) => {
        this.setState({ typeQuery: value });
    };

    closeMenuHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    render() {
        let search = null;
        if(this.state.showSearch && this.props.history.location.pathname !== '/home') {
            search = (
                <SearchInput 
                    value={this.state.search} 
                    addClass={[searchStyles.SearchMob]}
                    viewSearchPage={this.viewSearchPageHandler}
                    ChangeSearchQuery={this.searchQueryHandler}
                    ChangeSearchTypeQuery={this.ChangeSearchTypeQuery} />
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
                <main className={styles.Content}>
                    {search}
                    {this.props.children}
                </main>
                <Footer />
            </Fragment>
        );
    };
};

export default withRouter(Layout);