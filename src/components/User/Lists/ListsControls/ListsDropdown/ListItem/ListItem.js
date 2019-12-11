// Dependencies
import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../store/actions/index';

// CSS
import styles from './ListItem.module.css';

// Assets
import { ReactComponent as Clear } from '../../../../../../assets/images/svgs/erase.svg';
import { ReactComponent as Delete } from '../../../../../../assets/images/svgs/delete.svg';
import { ReactComponent as AddMedia } from '../../../../../../assets/images/svgs/list+.svg';
import { ReactComponent as RemoveMedia } from '../../../../../../assets/images/svgs/list-.svg';

class ListItem extends Component {

    componentDidMount() {
        const { id, mediaID, listsItems, lists, onFetchMediaStatus, onFetchListStatus, addList, type, title } = this.props;

        if(lists !== null) {
            if(lists[id]) {
                if(lists[id][mediaID] === undefined) {
                    onFetchMediaStatus(mediaID, id);
                }   
            } else {
                onFetchMediaStatus(mediaID, id);
            }
        } else {
            onFetchMediaStatus(mediaID, id);
        }

        if(listsItems) {
            if(listsItems[id] === null) {
                onFetchListStatus(this.props.id);
            }
        } else {
            onFetchListStatus(this.props.id);
        }

        if(type === 'user') {
            addList(id, title);    
        }
    }

    addMediaHandler = () => {
        const { id, mediaID, sessionID, title } = this.props;
        this.props.onUpdateListMedia(id, mediaID, sessionID, "add_item", true);
    };

    removeMediaHandler = () => {
        const { id, mediaID, sessionID, title } = this.props;
        this.props.onUpdateListMedia(id, mediaID, sessionID, "remove_item", false);
    };

    render() {
        const { 
            mediaID,
            sessionID, 
            dispatch, 
            onFetchMediaStatus, 
            onUpdateListMedia,
            onFetchListStatus, 
            listsItems,
            addList,
            showItems,
            toggleLists,
            onClearList,
            onDeleteList,
            ...rest } = this.props;

        let listControls = null;
        let list = null;

        if (this.props.lists) {
            if(this.props.type === 'user') {
                listControls = (
                    <div>
                        <Clear 
                            title="Clear List"
                            onClick={() => onClearList(this.props.id, sessionID)}/>
                        <Delete 
                            title="Delete List"
                            onClick={() => onDeleteList(this.props.id, sessionID)}/>
                    </div>
                );
                list = <li 
                    onClick={() => {
                        toggleLists();
                        showItems(this.props.id);
                    }}
                    className={styles.ListItem}
                    {...rest}>{this.props.children}{listControls}</li>;
            }
            if(this.props.type === 'info') {
                listControls =  (
                    <Fragment>
                        {this.props.lists[this.props.id][this.props.mediaID] ? 
                            <RemoveMedia 
                                onClick={this.removeMediaHandler}
                                title="Remove Movie From List"
                                className={styles.InfoSVG}/> : 
                            <AddMedia
                                onClick={this.addMediaHandler}
                                title="Add Movie To List" 
                                className={styles.InfoSVG}/>}
                    </Fragment>
                );
                list = <li 
                className={styles.ListItem}
                {...rest}>{this.props.children}{listControls}</li>;
            }
        }
        return list;
    }
};

const mapStateToProps = state => {
    return {
        lists: state.info.lists,
        listsItems: state.info.listsItems,
        sessionID: state.auth.sessionIdData.session_id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMediaStatus: (mediaID, id) => dispatch(actions.fetchMediaStatus(mediaID, id)),
        onUpdateListMedia: (id, mediaID, sessionID, type, status) => dispatch(actions.updateList(id, mediaID, sessionID, type, status)),
        onFetchListStatus: (id) => dispatch(actions.fetchListStatus(id)),
        onClearList: (id, sessionID) => dispatch(actions.clearList(id, sessionID)),
        onDeleteList: (id, sessionID) => dispatch(actions.deleteList(id, sessionID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);