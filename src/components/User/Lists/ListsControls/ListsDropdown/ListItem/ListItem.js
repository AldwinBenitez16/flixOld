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
        const { id, addList, type, title } = this.props;
        if(type === 'user') {
            addList(id, title);    
        }
    }

    addMediaHandler = () => {
        const { id, mediaID, mediaType, onAddMedia, sessionID } = this.props;
        onAddMedia(mediaType, mediaID, id, sessionID);
        this.forceUpdate();
    };

    removeMediaHandler = () => {
        const { id, mediaID, onRemoveMedia, sessionID} = this.props;
        onRemoveMedia(mediaID, id, sessionID);
    };

    clearListHandler = () => {
        const { id, sessionID, onClearList } = this.props;
        onClearList(id, sessionID);
    }

    deleteListHandler = () => {
        const { id, sessionID, onDeleteList } = this.props;
        onDeleteList(id, sessionID);
    }

    render() {
        const { 
            mediaID,
            sessionID, 
            addList,
            showItems,
            toggleLists,
            mediaType,
            onClearList,
            onDeleteList,
            onAddMedia,
            accountLists,
            onRemoveMedia,
            ...rest } = this.props;

        let listControls = null;
        let list = null;
        if(this.props.type === 'user') {
            listControls = (
                <div>
                    <Clear 
                        title="Clear List"
                        onClick={this.clearListHandler}/>
                    <Delete 
                        title="Delete List"
                        onClick={this.deleteListHandler}/>
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
            let listItems = accountLists[this.props.id].listItems;
            let isRated = false;
            listItems.map(item => {
                if(item.id === parseInt(mediaID)) {
                    isRated = true;
                }
            });
            listControls =  (
                <Fragment>
                    { isRated ? 
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
        return list;
    }
};

const mapStateToProps = state => {
    return {
        sessionID: state.auth.sessionIdData.session_id,
        accountLists: state.info.accountLists
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClearList: (listID, sessionID) => dispatch(actions.clearList(listID, sessionID)),
        onDeleteList: (listID, sessionID) => dispatch(actions.deleteList(listID, sessionID)),
        onAddMedia: (mediaType, mediaID, listID, sessionID) => dispatch(actions.addMedia(mediaType, mediaID, listID, sessionID)),
        onRemoveMedia: (mediaID, listID, sessionID) => dispatch(actions.removeMedia(mediaID, listID, sessionID))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ListItem);