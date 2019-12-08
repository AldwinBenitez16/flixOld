// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import Spinner from '../../components/UI/Spinner/Spinner';
import Lists from './Lists/Lists';
import Favorites from '../../components/User/Favorites/Favorites';
import Rated from '../../components/User/Rated/Rated';
import WatchList from '../../components/User/WatchList/WatchList';
import UserControls from '../../components/User/UserControls/UserControls';

// CSS
import styles from './User.module.css';

class User extends Component {

    state = {
        showLists: true,
        showFavorites: false,
        showWatchList: false,
        showRated:false
    }

    componentDidMount() {
        if(this.props.user.accountID === null) {
            this.props.onFetchAccountDetails(this.props.sessionID);
        }
    }

    showHandler = (type) => {
        this.setState({
            showLists: false,
            showFavorites: false,
            showWatchList: false,
            showRated:false,
            [`show${type}`]: true
        });
    }

    render() {
        let user = <Spinner />;
        if(this.props.user.accountID && !this.props.loading) {
            user = (
                <Fragment>
                    <Lists 
                        show={this.state.showLists}
                        accountID={this.props.user.accountID}
                        sessionID={this.props.sessionID}/>
                    <Favorites 
                        show={this.state.showFavorites}
                        accountID={this.props.user.accountID}
                        sessionID={this.props.sessionID}/>
                    <Rated 
                        show={this.state.showRated}
                        accountID={this.props.user.accountID}
                        sessionID={this.props.sessionID}/>
                    <WatchList 
                        show={this.state.showWatchList}
                        accountID={this.props.user.accountID}
                        sessionID={this.props.sessionID}/>
                </Fragment>
            );
        }
        return(
            <div className={styles.User}>
                <UserControls 
                   showHandler={this.showHandler} />
                {user}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        user: state.user,
        accountID: state.user.accountID,
        loading: state.user.loading,
        sessionID: state.auth.sessionIdData.session_id
    };
};

const mpaDispatchToProps = dispatch => {
    return {
        onFetchAccountDetails: (sessionID) => dispatch(actions.fetchAccountDetails(sessionID))
    };
};

export default connect(mapStateToProps, mpaDispatchToProps)(User);