// Dependencies
import React from 'react';

// Components
import Button from '../../UI/Button/Button';

const search = (props) => (
    <div className={props.searchStyles}>
        <input 
            type="text" 
            value={props.value}
            onChange={props.changed}/>
        <Button 
            type="Success"
            clicked={() => {}}>+</Button>
    </div>
);
 
export default search;
