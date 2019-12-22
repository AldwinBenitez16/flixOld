import React, { Component } from 'react';
import { apiKey } from '../../shared/Axios/axios';

import Spinner from '../../components/UI/Spinner/Spinner';
import DataWrapper from '../../hoc/DataWrapper/DataWrapper';
import DataInfo from '../../components/UI/DataInfo/DataInfo';

import styles from './Search.module.css';

class Search extends Component {    

    state={
        type: null,
        query: null,
        page: null
    }

    componentDidMount() {
        let params = this.props.match.params;
        this.setState({ 
            type: params.type, 
            query: params.query,
            page: params.page
        });
    };

    changePageHandler = (page, max) => {
        if(page > 0 && page <= max) {
            this.props.history.push(`/search/${this.state.type}/${this.state.query}-${page}`);
            this.setState({ page });
        }
    };


    viewInfoHandler = (type, title, movieId) => {
        this.props.history.push(`/info/${type}/${title}?movieId=${movieId}`);
    }

    render() {
        let searchComponent = <Spinner />;
        if(this.state.type && this.state.query && this.state.page) {
            searchComponent = (
                <DataWrapper path={`/search/${this.state.type}?api_key=${apiKey}&language=en-US&query=${this.state.query}&page=${this.state.page}&include_adult=false`}>
                    <DataInfo 
                        changePage={this.changePageHandler}
                        title={`[${this.state.type}] - ${this.state.query}`}
                        page={this.state.page}
                        viewInfo={this.viewInfoHandler}
                        type={this.state.type} />
                </DataWrapper>
            );
        }
        return (
            <div key={this.state.page} className={styles.Search}>
                {searchComponent}
            </div>
        );
    }; 
};

export default Search;