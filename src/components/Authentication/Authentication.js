// Dependencies
import React, { Component } from 'react';
import { updateObject, checkValidity } from '../../shared/Utillity/Utillity';

// Components
import Button from '../UI/Button/Button';
import FormElement from '../UI/FormElement/FormElement';

// CSS
import styles from './Authentication.module.css';

class Authentication extends Component {

    state={
        loginForm: {
            email: this.createFormElementHandler('input', '', {
                type: 'text',
                placeholder: 'Your Email'
            }, {
                required: true,
                isMail: true
            }, false),
            password: this.createFormElementHandler('input', '',{
                type: 'password',
                placeholder: 'password'
            }, {
                required: true,
                minLength: 4
            }, false)
        },
        formIsValid: false
    }

    createFormElementHandler(type, value, config, rules=null, valid=true, touched=false) {
        return {
            elementType: type, 
            value,
            elementConfig: {
                ...config
            },
            validation: {
                ...rules
            },
            valid,
            touched
        };
    };

    inputChangeHandler = (e, id) => {
        const updatedLogin = updateObject(this.state.loginForm, {
            [id]: updateObject(this.state.loginForm[id], {
               value: e.target.value, 
               valid: checkValidity(e.target.value, this.state.loginForm[id].validation),
               touched: true 
            })
        });

        let formIsValid = true;
        for(let id in updatedLogin) {
            formIsValid = updatedLogin[id].valid && formIsValid;
        };
        this.setState({loginForm: updatedLogin, formIsValid});
    }

    render() {
        const loginFormArray = [];
        for(let key in this.state.loginForm) {
            loginFormArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }
        const loginForm = (
            loginFormArray.map(elem => (
                <FormElement 
                key={elem.id}
                label={elem.id}
                elementType={elem.config.elementType} 
                elementConfig={elem.config.elementConfig}
                value={elem.config.value}
                invalid={!elem.config.valid}
                needsValidation={elem.config.validation}
                touched={elem.config.touched}
                changed={e => this.inputChangeHandler(e, elem.id)}/>
            ))
        );

        return(
            <div className={styles.Authentication}>
                <h2>Login</h2>
                {loginForm}
                <Button 
                    addClass={[]}
                    type="Success"
                    action="Login"
                    clicked={() => {}}>Login</Button>
                <Button 
                    addClass={[]}
                    type="Danger"
                    action="Cancel"
                    clicked={() => {}}>Cancel</Button>
            </div>
        );
    }
};


export default Authentication;