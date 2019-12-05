// Dependencies
import React, { Component } from 'react';
import { updateObject, checkValidity } from '../../shared/Utillity/Utillity';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

// Components
import Button from '../UI/Button/Button';
import FormElement from '../UI/FormElement/FormElement';

// CSS
import styles from './Authentication.module.css';

class Authentication extends Component {

    state={
        loginForm: {
            username: this.createFormElementHandler('input', '', {
                type: 'text',
                placeholder: 'Username'
            }, {
                required: true
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

    componentDidMount() {
        if(this.props.auth.tokenData === null) {
            this.props.fetchToken();
        }
    }

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

    loginHandler = () => {
        this.props.fetchSessionId(
            this.props.auth.tokenData.request_token, 
            this.state.loginForm.username.value,
            this.state.loginForm.password.value);
    }

    cancelLoginHandler = () => {
        this.props.history.push('/home');
    };

    render() {
        let redirect = null;
        if(this.props.isAuth) {
            redirect = <Redirect to='/user' />;
        }
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
                {redirect}
                <div className={styles.Form}>
                    <h2>Login</h2>
                    <div className={styles.Inputs}>
                        {loginForm}
                    </div>
                    <div className={styles.Controls}>
                        <Button 
                            addClass={[]}
                            type="Success"
                            action="Login"
                            clicked={this.loginHandler}>Login</Button>
                        <Button 
                            addClass={[]}
                            type="Danger"
                            action="Cancel"
                            clicked={this.cancelLoginHandler}>Cancel</Button>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        isAuth: state.auth.authenticated,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchToken: () => dispatch(actions.fetchToken()),
        fetchSessionId: (token, username, password) => dispatch(actions.fetchSessionId(token, username, password))
    };
};

export default connect(mapStateToProps ,mapDispatchToProps)(Authentication);