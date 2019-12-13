// Dependencies
import React, { Component } from 'react';
import axios, { apiKey } from '../../shared/Axios/axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import InfoCard from '../../components/Info/InfoCard/InfoCard';
import Spinner from '../../components/UI/Spinner/Spinner';

// HOC
import DataWrapper from '../../hoc/DataWrapper/DataWrapper';

// CSS
import styles from './Info.module.css';

class Info extends Component {

    state = {
        type: null,
        id: null,
        loading: false,
        error: null,
        showRatingOverlay: false,
        showListsOverlay: false,
        rateValue: 1
    };

    componentDidMount() {
        const type = this.props.match.params.type;
        const query = this.props.history.location.search;
        const id = query.substring(query.indexOf('=')+1);
        this.setState({ type, id });
        if(this.props.isAuth) {
            if(!this.props.mediaState || !this.props.mediaState[`${id}`]) {
                this.props.onFetchMediaState(id, this.props.sessionData.session_id, type); 
            }
        }
    }

    toggleMediaStateHandler = (mediaType) => {
        const { accountID, sessionData, mediaState, onUpdateMediaState } = this.props;
        console.log(this.state.id);
        onUpdateMediaState(
            accountID,
            sessionData.session_id,
            this.state.type,
            this.state.id,
            mediaType,
            mediaState[`${this.state.id}`][`${mediaType}`]
        );
    };

    toggleRatingOverlayHandler = () => {
        this.setState(prevState => {
            return {
                showRatingOverlay: !prevState.showRatingOverlay
            };
        });
    };

    toggleListsOverlayHandler = () => {
        this.setState(prevState => {
            return {
                showListsOverlay: !prevState.showListsOverlay
            };
        });
    };

    changeRatingValueHandler = (e) => {
        let value = e.target.value;
        if(value > 10) {
            value = 10;
        } else if(value <= 0) {
            value = 1;
        }
        this.setState({rateValue: value});
    };

    updateRatingHandler = (type) => {
        const { onUpdateRating, sessionData } = this.props;
        let value = this.state.rateValue;
        if(type !== 'delete') {
            type="post";
        }
        onUpdateRating(this.state.type, this.state.id, value, sessionData.session_id, type);
        this.setState({ showRatingOverlay: false });
    };

    render() {
        let infoContent = <Spinner />;
        if(this.state.type && this.state.id) {
            infoContent = (
                <DataWrapper path={`/${this.state.type}/${this.state.id}?api_key=${apiKey}&language=en-US`}>
                    <InfoCard
                        mediaID={this.state.id} 
                        isAuth={this.props.isAuth}
                        toggleMediaState={this.toggleMediaStateHandler}
                        toggleRatingOverlay={this.toggleRatingOverlayHandler}
                        showRatingOverlay={this.state.showRatingOverlay}
                        ratingValue={this.state.rateValue}
                        changeRatingValue={this.changeRatingValueHandler}
                        updateRating={this.updateRatingHandler}
                        showListsOverlay={this.state.showListsOverlay}
                        toggleListsOverlay={this.toggleListsOverlayHandler}/>
                </DataWrapper>
            );
        }
        return (
            <div className={styles.Info}>
                {infoContent}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authenticated,
        sessionData: state.auth.sessionIdData,
        accountID: state.user.accountID,
        mediaState: state.info.mediaState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMediaState: (id, sessionID, type) => dispatch(actions.fetchAccountState(id, sessionID, type)),
        onUpdateMediaState: (accountID, sessionID, mediaType, mediaID, stateType, stateValue) => dispatch(actions.updateMediaState(accountID, sessionID, mediaType, mediaID, stateType, stateValue)),
        onUpdateRating: (type, id, value, sessionID, requestType) => dispatch(actions.updateRating(type, id, value, sessionID, requestType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);