/* Layout Component That lays the different sections (nav, main, footer) */

// Dependencies
import React, { Component, Fragment } from 'react';

// Components
import Header from '../../components/Header/Header';
import Sidedrawer from '../../components/Header/Sidedrawer/Sidedrawer';

// CSS
import styles from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    toggleMenuHandler = () => {
        this.setState( prev => {
            return {
                showSideDrawer: !prev.showSideDrawer
            };
        });
    }

    closeMenuHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    render() {
        return(
            <Fragment>
                <Sidedrawer
                    show={this.state.showSideDrawer}
                    close={this.closeMenuHandler}/>
                <Header toggleMenu={this.toggleMenuHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    };
};

export default Layout;