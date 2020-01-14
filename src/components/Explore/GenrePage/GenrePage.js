// Dependencies
import React, { Component } from 'react';
import { apiKey } from '../../../shared/Axios/axios';
import queryString from 'query-string';

// HOC
import DataWrapper from '../../../hoc/DataWrapper/DataWrapper';

// Components
import DataInfo from '../../UI/DataInfo/DataInfo';
import Spinner from '../../UI/Spinner/Spinner';

// CSS
import styles from './GenrePage.module.css';

class GenrePage extends Component {

    state={
        id: null,
        type: null,
        page: null,
        title: null
    }

    componentDidMount() {
        const queries = queryString.parse(this.props.location.search);
        let path = this.props.match.url.substring(1)
        let genre = path.substring(path.indexOf('/')+1);
        this.setState({
            id: queries.id,
            type: queries.type,
            page: queries.page,
            genre
        });
    }

    changePageHandler = (page, max) => {
        if(page > 0 && page <= max) {
            this.props.history.push(`/genre/${this.state.genre}?id=${this.state.id}&type=${this.state.type}&page=${page}`);
            this.setState({page});
        }
    }

    render() {
        let list = (
            <div className={styles.Loading}>
                <Spinner />
            </div>
        );
        if(this.state.id && this.state.type && this.state.page) {
            list = (
                <DataWrapper path={`/discover/${this.state.type}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}&with_genres=${this.state.id}`}>
                    <DataInfo 
                        changePage={this.changePageHandler}
                        title={this.state.genre}
                        page={this.state.page}
                        viewInfo={this.props.viewInfo}
                        type={this.state.type} />
                </DataWrapper>
            );
        }
        
        return(
            <div key={this.state.page} className={styles.GenrePage}>
                {list}
            </div>
        );
    }
};

export default GenrePage;