// Dependencies
import React, { Component } from 'react';
import axios, { apiKey } from '../../shared/Axios/axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import InfoLayout from './InfoLayout/InfoLayout';
import InfoCard from '../../components/infoCard/infoCard/InfoCard';
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
        rateValue: 1,
        backdropPath: ''
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
        if(this.props.isGuest) {
            if(!this.props.mediaState[`${id}`]) {
                this.props.onSetGuestMedia(id, false);
            }
        }
    }

    toggleMediaStateHandler = (stateType) => {
        const { accountID, sessionData, mediaState, onUpdateMediaState, onAddStateMedia } = this.props;
        onUpdateMediaState(
            accountID,
            sessionData.session_id,
            this.state.type,
            this.state.id,
            stateType,
            mediaState[`${this.state.id}`][`${stateType}`]
        );
        if(!mediaState[`${this.state.id}`][`${stateType}`]) {
            onAddStateMedia(this.state.type, this.state.id, stateType);
        }
    };

    toggleListsOverlayHandler = () => {
        this.setState(prevState => {
            return {
                showListsOverlay: !prevState.showListsOverlay,
                showRatingOverlay: false
            };
        });
    };

    changeRatingValueHandler = (value) => {
        this.setState({ rateValue: value });
    };

    updateRatingHandler = (type) => {
        const { onUpdateRating, onSetGuestMedia, sessionData, guestSessionData, isAuth, isGuest, onAddStateMedia} = this.props;
        let value = this.state.rateValue;
        if(type !== 'delete') {
            type="post";
        }
        if(isAuth) {
            onUpdateRating(this.state.type, this.state.id, value, sessionData.session_id, type);
            if(type === 'post') {
                onAddStateMedia(this.state.type, this.state.id, 'rated');
            }
        }
        if(isGuest) {
            onUpdateRating(this.state.type, this.state.id, value, guestSessionData.guest_session_id, type, true);
            onSetGuestMedia(this.state.id, value);
        }
        this.setState({ showRatingOverlay: false });
    };

    render() {
        let infoContent = (
            <div className={styles.Loading}>
                <Spinner />
            </div>
        );
        if(this.state.type && this.state.id) {
            infoContent = (
                <DataWrapper path={`/${this.state.type}/${this.state.id}?api_key=${apiKey}&language=en-US`}>
                    <InfoLayout>
                        <InfoCard
                            mediaID={this.state.id} 
                            isAuth={this.props.isAuth}
                            isGuest={this.props.isGuest}
                            toggleMediaState={this.toggleMediaStateHandler}
                            showRatingOverlay={this.state.showRatingOverlay}
                            changeRatingValue={this.changeRatingValueHandler}
                            updateRating={this.updateRatingHandler}
                            showListsOverlay={this.state.showListsOverlay}
                            toggleListsOverlay={this.toggleListsOverlayHandler}/>
                    </InfoLayout>
                </DataWrapper>
            );
        }
        return (
            <div style={{ position: 'relative' }} className={styles.Info}>
                {infoContent}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authenticated,
        isGuest: state.auth.guestAuth,
        sessionData: state.auth.sessionIdData,
        guestSessionData: state.auth.guestSessionData,
        accountID: state.user.accountID,
        mediaState: state.info.mediaState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMediaState: (id, sessionID, type) => dispatch(actions.fetchAccountState(id, sessionID, type)),
        onUpdateMediaState: (accountID, sessionID, mediaType, mediaID, stateType, stateValue) => dispatch(actions.updateMediaState(accountID, sessionID, mediaType, mediaID, stateType, stateValue)),
        onUpdateRating: (type, id, value, sessionID, requestType, isGuest) => dispatch(actions.updateRating(type, id, value, sessionID, requestType, isGuest)),
        onSetGuestMedia: (mediaID, status) => dispatch(actions.setGuestMedia(mediaID, status)),
        onAddStateMedia: (mediaType, mediaID, stateType) => dispatch(actions.addStateMedia(mediaType, mediaID, stateType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);