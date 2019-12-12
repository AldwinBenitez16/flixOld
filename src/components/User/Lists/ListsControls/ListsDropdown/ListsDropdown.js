// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Components
import ListItem from './ListItem/ListItem';

// CSS
import styles from './ListsDropdown.module.css';

const listsDropdown = (props) => {
    let visible = styles.Hide;
    if(props.show) {
        visible = styles.Show;
    }

    let listsContent = <li onClick={props.toggleShowForm} className={styles.Center}>Create New List</li>
    if(props.lists.length > 0) {
        listsContent = props.lists.map(list => {
            let name = list.name;
            if(props.listType === 'info') {
                if(name.length >= 20) {
                    name = name.substring(0, 17) + '...';
                }
            }
            return ( 
                <ListItem 
                    key={list.id} 
                    id={list.id}
                    type={props.listType}
                    mediaID={props.mediaID}
                    addList={props.addList}
                    showItems={props.showItems}
                    toggleLists={props.toggleLists}
                    title={list.name}
                    mediaType={props.mediaType}>{name}</ListItem>
            );
        });
    };
    return (
        <div className={[styles.ListsDropdown, visible].join(' ')}>
            <ul>
                {listsContent}
            </ul>
        </div>
    );;
};

// --- listItems clearList/deleteList

const mapStateToProps = state => {
    return {
        lists: state.info.accountLists
    };
};

export default connect(mapStateToProps)(listsDropdown);