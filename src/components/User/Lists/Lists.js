// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

// Components
import ListControls from '../../../components/User/Lists/ListsControls/ListControls';
import ListsPages from './ListPages/ListPages';

class Lists extends Component {

    state = {
        showLists: false,
        form: {
            show: false,
            title: "",
            desc: ""
        }
    }

    toggleShowListsHandler = () => {
        this.setState(prevState => {
            return {
                showLists: !prevState.showLists
            };
        });
    }

    toggleShowFormHandler = () => {
        this.setState(prevState => {
            return {
                form: {
                    ...prevState.form,
                    show: !prevState.form.show
                }
            };
        });
    };

    changeFormKeyHandler = (data) => {
        this.setState(prevState => {
            return {
                form: {
                    ...prevState.form,
                    ...data
                }
            };
        });
    };

    createNewListHandler = () => {
        const { sessionID, onCreateNewList } = this.props;
        onCreateNewList(sessionID, this.state.form.title, this.state.form.desc);
    }

    render() {
            let list = null;
            if(this.props.show) {
                list = (
                    <Fragment>
                        <ListControls 
                            showLists={this.state.showLists}
                            toggleShowLists={this.toggleShowListsHandler}
                            showForm={this.state.form.show}
                            toggleShowForm={this.toggleShowFormHandler} 
                            addList={this.props.addList}
                            showItems={this.props.showItems}
                            toggleList={this.props.showList}
                            changeFormKey={this.changeFormKeyHandler}
                            titleValue={this.state.form.title}
                            descValue={this.state.form.desc}
                            createNewList={this.createNewListHandler}/>
                            
                        <ListsPages 
                            accountLists={this.props.accountLists}
                            list={this.props.list}
                            viewInfo={this.props.viewInfo}/>
                    </Fragment>
                );
            }
            return(
                <div>
                    {list}
                </div>
            );
        }
    }; 

const mapStateToProps = state => {
    return {
        accountLists: state.info.accountLists,
        sessionID: state.auth.sessionIdData.session_id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateNewList: (sessionID, name, description) => dispatch(actions.createNewList(sessionID, name, description))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);