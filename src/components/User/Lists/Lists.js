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

    toggleShowListsHandler = () => {
        this.setState(prevState => {
            return {
                showLists: !prevState.showLists
            };
        });
    }

    render() {
        let list = null;
        if(this.props.show && this.props.lists !== null) {
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


export default Lists;