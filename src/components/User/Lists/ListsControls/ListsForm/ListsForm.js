// Dependencies
import React from 'react';

// Components
import Button from '../../../../UI/Button/Button';

// CSS
import styles from './ListsForm.module.css';

const listsForm = (props) => {

    let visible = styles.Hide;
    if(props.show) {
        visible = styles.Show;
    }

    return (
        <div className={[styles.ListsForm, visible].join(' ')}>
            <input 
                type="text" 
                placeholder="Title" 
                value={props.title}
                onChange={(e) => props.changeFormKey({title: e.target.value})} />

            <textarea
                onChange={(e) => props.changeFormKey({desc: e.target.value})}
                placeholder="Description" 
                value={props.descValue}></textarea>
            <Button
                addClass={[styles.UpdatedButton]}
                clicked={props.createNewList}
                type="Success"
                action="Create List">Create List</Button>
        </div>
    );
};

export default listsForm;