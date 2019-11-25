/* Layout Component That lays the different sections (nav, main, footer) */

// Dependencies
import React, { Component, Fragment } from 'react';

// CSS
import styles from './Layout.module.css';

class Layout extends Component {
    render() {
        return(
            <Fragment>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    };
};

export default Layout;