// Dependencies
import React from 'react';

// Components
import ListDropdown from '../../../User/Lists/ListsControls/ListsDropdown/ListsDropdown';

// CSS
import styles from './ListOverlay.module.css';

const listOverlay = (props) => {
    const { mediaID, mediaType } = props;
    return (
        <div className={styles.ListOverlay}>
            <ListDropdown 
                show={true} 
                listType="info"
                mediaID={mediaID}
                mediaType={mediaType}/>
        </div>
    );
};

export default listOverlay;