// Dependencies
import React, { Component } from 'react';
import axios, { apiKey } from '../../shared/Axios/axios';
import authAxios from '../../shared/Axios/authAxios';
import { updateObject, checkValidity } from '../../shared/Utillity/Utillity';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

// Components
import Button from '../UI/Button/Button';
import FormElement from '../UI/FormElement/FormElement';
import Spinner from '../UI/Spinner/Spinner';
import Overlay from '../UI/Overlay/Overlay';
import StatusDropdown from '../../hoc/StatusDropdown/StatusDropdown';

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
        formIsValid: false,
        backdropPath: ""
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
        const { tokenData, fetchToken} = this.props;
        if(tokenData === null) {
            fetchToken();
        }

        if(tokenData !== null) {
            // console.log(tokenData.expires_at); // year, month, day, hour, min, seconds milliseconds
            const tokenDateArray = tokenData.expires_at.split(' ');
            const tokenDate = tokenDateArray[0].split('-');
            const tokenTime = tokenDateArray[1].split(':');
            const tokenExpiryArray = [...tokenDate, ...tokenTime].map(date => parseInt(date));
            const tokenExpiryDate = new Date(
                tokenExpiryArray[0],
                tokenExpiryArray[1]-1,
                tokenExpiryArray[2],
                tokenExpiryArray[3],
                tokenExpiryArray[4],
                tokenExpiryArray[5],
                0
            ).getTime();
            const currentTime = new Date().getTime();
            const isExpired = ((tokenExpiryDate - currentTime) / 1000) < 0;
            if(isExpired) {
                fetchToken();
            }
        }

        axios.get(`/movie/now_playing?api_key=${apiKey}&language=en-US`)
            .then(res => {
                let counter = 0;
                let backdrop = res.data.results[counter].backdrop_path;
                while(!backdrop) {
                    counter++;
                    backdrop = res.data.results[counter].backdrop_path;
                }
                this.setState({ backdropPath: `https://image.tmdb.org/t/p/w1280/${backdrop}` });
            })
            .catch(err => {
                console.log(err);
            });
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

    guestLoginHandler = () => {
        this.props.onFetchGuestLogin();
    };

    render() {
        let backgroundStyles = {
            backgroundImage: `url('${this.state.backdropPath}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        };
        let authenticationContent = (
            <div className={styles.Loading}>
                <Spinner />
            </div>
        );
        let redirect = null;
        if(this.props.isAuth) {
            redirect = <Redirect to='/user' />;
        }
        if(this.props.isGuest) {
            redirect = <Redirect to='/home'/>;
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
        if(this.state.backdropPath.length > 0) { 
            authenticationContent = (
                <div style={{ position: 'relative' }}>
                    <div style={backgroundStyles} className={styles.Authentication}>
                        {redirect}
                        <Overlay />
                        <div className={styles.Form}>
                            <StatusDropdown axios={authAxios} />
                            <div className={styles.Container}>
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
                                    <hr></hr>
                                    <Button 
                                        addClass={[styles.Guest]}
                                        type="Success"
                                        action="Guest Login"
                                        clicked={this.guestLoginHandler}>Guest Login</Button>
                                    <Button 
                                        addClass={[]}
                                        type="Danger"
                                        action="Cancel"
                                        clicked={this.cancelLoginHandler}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return authenticationContent;
    }
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        tokenData: state.auth.tokenData,
        isAuth: state.auth.authenticated,
        isGuest: state.auth.guestAuth,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchToken: () => dispatch(actions.fetchToken()),
        fetchSessionId: (token, username, password) => dispatch(actions.fetchSessionId(token, username, password)),
        onFetchGuestLogin: () => dispatch(actions.fetchGuestSessionID())
    };
};

export default connect(mapStateToProps ,mapDispatchToProps)(Authentication);