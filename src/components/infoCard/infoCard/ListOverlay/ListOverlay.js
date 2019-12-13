// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Components
import ListDropdown from '../../../User/Lists/ListsControls/ListsDropdown/ListsDropdown';

// CSS
import styles from './ListOverlay.module.css';

const listOverlay = (props) => {
    const { accountLists, mediaID, mediaType } = props;
    return (
        <div className={styles.ListOverlay}>
            <ListDropdown 
                show={true} 
                lists={accountLists} 
                listType="info"
                mediaID={mediaID}
                mediaType={mediaType}/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        lists: state.info.accountLists
    };
};

export default connect(mapStateToProps)(listOverlay);