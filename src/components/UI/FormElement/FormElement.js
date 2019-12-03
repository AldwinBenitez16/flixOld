// Dependencies
import React from 'react';

// CSS
import styles from './FormElement.module.css';

const formElement = (props) => {
    let formElement = null;
    
    let elementClasses = [styles.formElement];
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
    };

    return(
        <div>
            <label>{props.label}</label>
            {formElement}
        </div>
    );
};

export default formElement;