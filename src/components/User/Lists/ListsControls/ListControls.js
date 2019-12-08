// Dependencies
import React from 'react';

// Components
import ListsDropdown from '../../../../components/User/Lists/ListsControls/ListsDropdown/ListsDropdown';

// CSS
import styles from './ListControls.module.css';

// Assets
import { ReactComponent as ListDrop } from '../../../../assets/images/svgs/listsdrop.svg'; 
import { ReactComponent as AddList } from '../../../../assets/images/svgs/add.svg'; 

const listControls = (props) => {
    return (
        <div className={styles.ListControls}>
            <div className={styles.ListBar}>
                <ListDrop onClick={props.toggleShowLists}/>
                <AddList />
            </div>
            <ListsDropdown show={props.showLists}/>
        </div>
    );
};

export default listControls;