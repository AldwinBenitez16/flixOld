// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Components
import ListControls from '../../../components/User/Lists/ListsControls/ListControls';
import DataInfo from '../../UI/DataInfo/DataInfo';
import Spinner from '../../UI/Spinner/Spinner';

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
        let listItems = <Spinner />;
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
                            addList={this.props.addList}
                            showItems={this.props.showItems}sa
                            toggleList={this.props.showList}/>
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
        listsItems: state.info.listsItems
    };
};

export default connect(mapStateToProps)(Lists);