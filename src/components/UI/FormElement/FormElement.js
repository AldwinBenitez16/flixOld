// Dependencies
import React from 'react';
import { capitalize } from '../../../shared/Utillity/Utillity';

// CSS
import styles from './FormElement.module.css';

const formElement = (props) => {
    let formElement = null;
    
    let elementClasses = [styles.FormElement];
    if(props.invalid && props.needsValidation && props.touched) {
        elementClasses.push(styles.Invalid);
    }
    switch(props.elementType) {
        case ('input'):
            formElement = <input 
                className={elementClasses.join(' ')}
                {...props.elementConfig}
                vlaue={props.value}
                onChange={props.changed}/>;
            break;
        default: 
            formElement = <input 
                className={elementClasses.join(' ')}
                {...props.elementConfig}
                vlaue={props.value}
                onChange={props.changed}/>;
    };

    return(
        <div>
            <label>{capitalize(props.label)}</label>
            {formElement}
        </div>
    );
};

export default formElement;