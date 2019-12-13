// Dependencies
import React from 'react';

// Components
import ListsDropdown from './ListsDropdown/ListsDropdown';
import ListsForm from './ListsForm/ListsForm'

// CSS
import styles from './ListControls.module.css';

// Assets
import { ReactComponent as ListDrop } from '../../../../assets/images/svgs/listsdrop.svg'; 
import { ReactComponent as AddList } from '../../../../assets/images/svgs/add.svg'; 

const listControls = (props) => {
    console.log();
    return (
        <div className={styles.ListControls}>
            <div className={styles.ListBar}>
                <ListDrop onClick={props.toggleShowLists}/>
                <AddList onClick={props.toggleShowForm}/>
            </div>
            <ListsDropdown 
                show={props.showLists} 
                listType="user"
                addList={props.addList}
                showItems={props.showItems}
                toggleLists={props.toggleShowLists}
                toggleShowForm={props.toggleShowForm}/>
            <ListsForm 
                title={props.titleValue}
                desc={props.descValue}
                show={props.showForm} 
                changeFormKey={props.changeFormKey}
                createNewList={props.createNewList}/>
        </div>
    );
};

export default listControls;