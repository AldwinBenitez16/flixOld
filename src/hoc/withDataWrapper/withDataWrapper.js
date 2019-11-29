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
                this.setState({loading: false, data: res.data});
            })
            .catch(err => {
                this.setState({loading: false, err: err});
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.data !== nextState.data ||
            this.props.children.props.show !== nextProps.children.props.show) {
            return true;
        }
        return false;
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