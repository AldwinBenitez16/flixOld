// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

// Components
import ListControls from '../../../components/User/Lists/ListsControls/ListControls';

// HOC

class Lists extends Component {

    state = {
        showLists: false
    }

    componentDidMount() {
        if(this.props.accountLists === null) {
            this.props.onFetchAccountLists(this.props.accountID, this.props.sessionData.session_id);
        }
    }

    toggleShowListsHandler = () => {
        this.setState(prevState => {
            return {
                showLists: !prevState.showLists
            };
        });
    }

    render() {
        let list = null;
        if(this.props.show) {
            list = (
                <Fragment>
                    <ListControls 
                        showLists={this.state.showLists}
                        toggleShowLists={this.toggleShowListsHandler}/>
                </Fragment>
            );
        }
        return(
            <div>
                {list}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        accountID: state.user.accountID,
        sessionData: state.auth.sessionIdData,
        accountLists: state.info.accountLists
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccountLists: (accountID, sessionID) => dispatch(actions.fetchAccountLists(accountID, sessionID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);