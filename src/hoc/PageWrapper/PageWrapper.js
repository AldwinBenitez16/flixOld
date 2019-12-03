// Dependencies
import React, { Component, Fragment } from 'react';

class PageWrapper extends Component {
    state = {
        showOverlay: true
    }

    closeOverlayHandler = () => {
        this.setState({ showOverlay: false });
    }

    showOverlayHandler = () => {
        this.setState({ showOverlay: true });
    }

    viewInfoHandler = (type, title, movieId) => {
        this.props.history.push(`/info/${type}/${title}?movieId=${movieId}`);
    }

    render() {
        let newProps = {
            show: this.state.showOverlay,
            closeOverlay: this.closeOverlayHandler,
            showOverlay: this.showOverlayHandler,
            viewInfo: this.viewInfoHandler,
            ...this.props
        };
        let updatedComponent = React.cloneElement(this.props.children, newProps);
        return(
            <Fragment>
                {updatedComponent}
            </Fragment>
        );
    }
}

export default PageWrapper;