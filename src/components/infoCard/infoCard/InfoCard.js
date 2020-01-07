// Dependencies
import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// Components 
import NavigationItem from '../../Header/Navigation/NavigationItem/NavigationItem';
import Spinner from '../../UI/Spinner/Spinner';
import InfoControls from './InfoControls/InfoControls';
import RatingOverlay from './RatingOverlay/RatingOverlay';
import ListOverlay from './ListOverlay/ListOverlay';
import InfoData from './InfoData/InfoData';

// CSS
import styles from './InfoCard.module.css';

import { ReactComponent as HomeIcon } from '../../../assets/images/svgs/home.svg';

class InfoCard extends Component {
    
    state = {
        identifier: 'home'
    }

    IdentifierHandler = (value) => {
        this.setState({ identifier: value });
    };

    render() {
        let infoSummary = <Spinner />;
        if(!this.props.loading && this.props.data !== null) {
            let infoDataContent = null;
            if(this.state.identifier === 'home') {
                infoDataContent = <InfoData data={this.props.data} />;
            }
            infoSummary = (
                <Fragment>
                    <div className={styles.InfoControls}>
                        <ul>
                            <li>
                                <button 
                                    onClick={(e) => this.IdentifierHandler(e.target.id) } 
                                    id="home" >
                                    <HomeIcon />
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={(e) => this.IdentifierHandler(e.target.id) } 
                                    id="functions" >

                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.InfoCard}>
                        {infoDataContent}
                    </div>
                </Fragment>
            );
        }
    
        return infoSummary;
    }
};

export default InfoCard;