// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// CSS
import styles from './ListsDropdown.module.css';

const listsDropdown = (props) => {
    
    let visible = styles.Hide;
    if(props.show) {
        visible = styles.Show;
    }
    let listsContent = props.lists.map(list => (
            <li 
                key={list.id} 
                id={list.id}>{list.description}</li>
        ));
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