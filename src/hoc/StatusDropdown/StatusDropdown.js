import React, { Component } from 'react';

import styles from './StatusDropdown.module.css';

class StatusDropdown extends Component {
    
    state={
        statusMessage: ''
    };

    componentWillMount() {

        const { axios } = this.props;

        this.resInterceptor = axios.interceptors.response.use(res => {
            this.setState({ statusMessage: res.data.status_message });
            setTimeout(() => {
                this.setState({ statusMessage: '' });
            }, 1500);
            return res;
        }, err => {
            this.setState({ statusMessage: 'Username/Password is Incorrect' });
            setTimeout(() => {
                this.setState({ statusMessage: '' });
            }, 1500);
        });
    };

    componentWillUnmount() {
        const { axios } = this.props;
        axios.interceptors.response.eject(this.resInterceptor);
    };
    
    render() {
        let addClass = styles.Hide;
        if(this.state.statusMessage) {
            if(this.state.statusMessage.length > 0) {
                addClass = styles.Show;
            }
        }

        return (
            <div className={[styles.StatusDropdown, addClass].join(' ')}>
                <p>{this.state.statusMessage}</p>
            </div>
        );;
    };
};

export default StatusDropdown;