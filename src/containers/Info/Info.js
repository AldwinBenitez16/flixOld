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
        status: null,
        error: null,
        accountState: null
    };

    componentDidMount() {
        const type = this.props.match.params.type;
        const query = this.props.history.location.search;
        const id = query.substring(query.indexOf('=')+1);
        this.setState({ type, id });
        if(this.props.isAuth) {
            this.props.onFetchMediaState(id, this.props.sessionData.session_id);
        }
    }

    addFavoritesHandler = () => {
        axios({
            url: `/account/${this.props.accountID}/favorite?api_key=${apiKey}&session_id=${this.props.sessionData.session_id}`,
            data: {
                media_type: this.state.type,
                media_id: this.state.id,
                favorite: true
            },
            method: 'post'
        })
            .then(res => {
                this.setState({status: res.data, accountState: {
                    ...this.state.accountState,
                    favorite: true
                }});
            })
            .catch(err => {
                this.setState({ error: err});
            });
    };

    addWatchListHandler = () => {
        axios({
            url: `/account/${this.props.accountID}/watchlist?api_key=${apiKey}&session_id=${this.props.sessionData.session_id}`,
            data: {
                media_type: this.state.type,
                media_id: this.state.id,
                watchlist: true
            },
            method: 'post'
        })
            .then(res => {
                console.log(res.data);
                this.setState({status: res.data, accountState: {
                    ...this.state.accountState,
                    watchlist: true
                }});
            })
            .catch(err => {
                this.setState({ error: err});
            });
    };

    render() {
        let infoContent = <Spinner />;
        if(this.state.type && this.state.id) {
            infoContent = (
                <DataWrapper path={`/${this.state.type}/${this.state.id}?api_key=${apiKey}&language=en-US`}>
                    <InfoCard 
                        isAuth={this.props.isAuth}
                        addFavorite={this.addFavoritesHandler} 
                        addWatchList={this.addWatchListHandler}/>
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
        accountID: state.user.accountID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMediaState: (id, sessionID) => dispatch(actions.fetchAccountState(id, sessionID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);