// Dependencies
import React, { Component, Fragment } from 'react';
import axios from '../../shared/Axios/axios';

class withData extends Component {
    state={
        loading: false,
        data: null,
        error: null
    }

    componentDidMount() {
        this.setState({loading: true, err: null});
        axios.get(this.props.path)
            .then(res => {
                console.log(res.data);
                this.setState({loading: false, data: res.data});
            })
            .catch(err => {
                console.log(err.message);
                this.setState({loading: false, err: err});
            });
    }
    
    render() {
        let newProps = {...this.state};
        let updatedComponent = React.cloneElement(this.props.children, newProps);
        return(
            <Fragment>
                {updatedComponent}
            </Fragment>
        );
    };
};

export default withData;