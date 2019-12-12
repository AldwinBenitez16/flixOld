// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Components
import ListDropdown from '../../../User/Lists/ListsControls/ListsDropdown/ListsDropdown';

// CSS
import styles from './ListOverlay.module.css';

const listOverlay = (props) => {
    return (
        <div className={styles.ListOverlay}>
            <ListDropdown 
                show={true} 
                lists={props.accountLists} 
                listType="info"
                mediaID={props.mediaID}
                mediaType={props.mediaType}/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        lists: state.info.accountLists
    };
};

export default connect(mapStateToProps)(listOverlay);