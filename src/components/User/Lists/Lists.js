// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

// Components
import ListControls from '../../../components/User/Lists/ListsControls/ListControls';
import DataInfo from '../../UI/DataInfo/DataInfo';

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

    render() {
        let list = null;
        let listItems = null;
            if(this.props.show && this.props.lists !== null && this.props.list !== null) {
                if(this.props.listsItems) {
                    let listItemsArray = Object.keys(this.props.list).map(i => i);
                    listItems = listItemsArray.map(item => {
                        let listItem = null;
                        if(this.props.list[item] && this.props.listsItems[item]) {
                            let data = {
                                page: 1,
                                results: this.props.listsItems[item],
                                total_pages: 1,
                                total_results: this.props.listsItems[item].length
                            };
                            if(this.props.list[item].show) {
                                listItem = (
                                    <DataInfo 
                                    key={item}
                                    data={data}
                                    changePage={() => {console.log('change the page man')}}
                                    title={this.props.list[item].title}
                                    page="1"
                                    viewInfo={this.props.viewInfo}
                                    stylesType="user"/>
                                ); 
                            }
                        }
                        return listItem;
                    });
                }
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
                            createNewList={() => this.props.onCreateList(this.props.sessionID, this.state.form.title, this.state.form.desc)}/>
                        {listItems}
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
        listsItems: state.info.listsItems,
        sessionID: state.auth.sessionIdData.session_id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateList: (sessionID, name, description) => dispatch(actions.createNewList(sessionID, name, description))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);