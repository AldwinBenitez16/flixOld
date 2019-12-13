// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { apiKey } from '../../shared/Axios/axios';
import * as actions from '../../store/actions/index';

// Components
import Spinner from '../../components/UI/Spinner/Spinner';
import Lists from '../../components/User/Lists/Lists';
import UserPage from '../../components/User/UserPage/UserPage';
import UserControls from '../../components/User/UserControls/UserControls';

// HOC
import PageWrapper from '../../hoc/PageWrapper/PageWrapper';

// CSS
import styles from './User.module.css';

class User extends Component {

    state = {
        Lists: {
            show: false,
            showListItems: {}
        },
        Favorites: {
            show: true,
            page: 1
        },
        WatchList: {
            show: false,
            page: 1
        },
        Rated: {
            show: false,
            page: 1
        }
    }

    componentDidMount() {
        const {user, onFetchAccountDetails, onFetchAccountLists, sessionID, accountLists, accountID} = this.props;
        if(user.accountID === null) {
            onFetchAccountDetails(sessionID);
        }
        if(accountLists === null) {
            onFetchAccountLists(accountID, sessionID);
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return true;
    }

    showHandler = (type) => {
        this.setState(prevState => {
            return {
                Lists: {
                    ...prevState.Lists,
                    show: false
                },
                Favorites: {
                    ...prevState.Favorites,
                    show: false
                },
                WatchList: {
                    ...prevState.WatchList,
                    show: false
                },
                Rated:{
                    ...prevState.Rated,
                    show: false
                },
                [type]: {
                    ...prevState[type],
                    show: true
                }
            };
        });
    }

    addListHandler = (id, title) => { 
        this.setState(prevState => {
            return {
                Lists: {
                    ...prevState.Lists,
                    showListItems: {
                        ...prevState.Lists.showListItems,
                        [id]: {
                            show: false,
                            title
                        }
                    }
                }
            }
        });
    };

    showItemsHandler = (id) => {
        this.setState(prevState => {
            let listItems = {};
            for(let key in prevState.Lists.showListItems) {
                listItems[key] = {
                    ...prevState.Lists.showListItems[key],
                    show: false
                };
            }
            listItems[id] = {
                ...listItems[id],
                show: true
            };
            return {
                Lists: {
                    ...prevState.Lists,
                    showListItems: listItems
                }
            }
        });
    }

    render() {
        let user = <Spinner />;
        if(this.props.user.accountID && !this.props.loading) {
            user = (
                <Fragment>
                    <PageWrapper
                        show={this.state.Lists.show}
                        accountID={this.props.user.accountID}
                        sessionID={this.props.sessionID}
                        addList={this.addListHandler}
                        showItems={this.showItemsHandler}
                        list={this.state.Lists.showListItems}>
                        <Lists />
                    </PageWrapper>
                    <PageWrapper
                        title="Favorites"
                        show={this.state.Favorites.show}
                        moviePath={`/account/${this.props.user.accountID}/favorite/movies?api_key=${apiKey}&session_id=${this.props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}
                        tvPath={`/account/${this.props.user.accountID}/favorite/tv?api_key=${apiKey}&session_id=${this.props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}>
                        <UserPage />
                    </PageWrapper>
                    <PageWrapper
                        title="Rated"
                        show={this.state.Rated.show}
                        moviePath={`/account/${this.props.accountID}/rated/movies?api_key=${apiKey}&session_id=${this.props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}
                        tvPath={`/account/${this.props.accountID}/rated/tv?api_key=${apiKey}&session_id=${this.props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}>
                        <UserPage />
                    </PageWrapper>
                    <PageWrapper
                        title="WatchList"
                        show={this.state.WatchList.show}
                        moviePath={`/account/${this.props.accountID}/watchlist/movies?api_key=${apiKey}&session_id=${this.props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}
                        tvPath={`/account/${this.props.accountID}/watchlist/tv?api_key=${apiKey}&session_id=${this.props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}>
                        <UserPage />
                    </PageWrapper>

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
        sessionID: state.auth.sessionIdData.session_id,
        accountLists: state.info.accountLists
    };
};

const mpaDispatchToProps = dispatch => {
    return {
        onFetchAccountDetails: (sessionID) => dispatch(actions.fetchAccountDetails(sessionID)),
        onFetchAccountLists: (accountID, sessionID) => dispatch(actions.fetchAccountLists(accountID, sessionID))
    };
};

export default connect(mapStateToProps, mpaDispatchToProps)(User);