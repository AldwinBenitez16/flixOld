import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Overlay from '../../../components/Home/Overlay/Overlay';
import Spinner from '../../../components/UI/Spinner/Spinner';

import styles from './InfoLayout.module.css';

class InfoLayout extends Component {

    render() {
        let InfoLayoutContent = (
            <div className={styles.Loading}>
                <Spinner />
            </div>
        );
        if(this.props.data !== null) {
            let backgroundStyles = {
                backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${this.props.data.backdrop_path}')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: 'calc(100vh - 100px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            };
            let newProps = {
                ...this.props
            };
            
            let updatedComponent = React.cloneElement(this.props.children, newProps);
        
            if(this.props.data.backdrop_path.length > 0) {
                InfoLayoutContent = (
                    <Fragment>
                        <Overlay />
                        <div style={backgroundStyles} >
                            {updatedComponent}
                        </div>
                    </Fragment>
                );
            }
        }
        return InfoLayoutContent;
    };
};

export default withRouter(InfoLayout);