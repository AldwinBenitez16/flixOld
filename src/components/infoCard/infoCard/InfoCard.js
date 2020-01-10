// Dependencies
import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// Components 
import Spinner from '../../UI/Spinner/Spinner';
import InfoData from './InfoData/InfoData';
import InfoControls from './InfoControls/InfoControls';

// CSS
import styles from './InfoCard.module.css';

import { ReactComponent as HomeIcon } from '../../../assets/images/svgs/home.svg';
import { ReactComponent as UserIcon } from '../../../assets/images/svgs/user.svg';

class InfoCard extends Component {
    
    state = {
        identifier: 'user'
    }

    IdentifierHandler = (value) => {
        this.setState({ identifier: value });
    };

    render() {
        let infoSummary = <Spinner />;
        if(!this.props.loading && this.props.data !== null) {
            let infoDataContent = null;
            if(this.state.identifier === 'home') {
                infoDataContent = (
                    <div className={styles.InfoCard}>
                        <InfoData data={this.props.data} />
                    </div>
                );
            }
            if(this.state.identifier === 'user') {
                infoDataContent = (
                    <div className={[styles.InfoControlUpdate, styles.InfoCard].join(' ')}>
                        <InfoControls mediaID={this.props.data.id} type={this.props.data.original_title ? 'movie' : 'tv'} />
                    </div>
                );
            }
            infoSummary = (
                <Fragment>
                    <div className={styles.InfoControls}>
                        <ul>
                            <li>
                                <button 
                                    onClick={(e) => this.IdentifierHandler(e.currentTarget.id)} 
                                    id="home" >
                                    <HomeIcon />
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={(e) => this.IdentifierHandler(e.currentTarget.id) } 
                                    id="user" >
                                    <UserIcon />
                                </button>
                            </li>
                        </ul>
                    </div>
                    {infoDataContent}
                </Fragment>
            );
        }
    
        return infoSummary;
    }
};

export default InfoCard;