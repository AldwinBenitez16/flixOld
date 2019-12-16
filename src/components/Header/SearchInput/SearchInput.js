// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';

// Components
import Button from '../../UI/Button/Button';

// Assets
import { ReactComponent as SearchIcon } from '../../../assets/images/svgs/search.svg';

const searchInput = (props) => {
    let addClass = [];
    if(props.addClass) {
        addClass = props.addClass;
    }

    return (
        <div className={[...addClass].join(' ')}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSetSearchPath();
                    if(props.history.location.pathname !== '/home') {
                        props.history.push('/home');
                    }
                }} >
                <select 
                    onChange={(e) => props.onChangeSearchTypeQuery(e.target.value)}
                    value={props.SearchTypeQuery}
                    defaultValue="movie">
                    <option value="movie">Movies</option>
                    <option value="tv" >Tv</option>
                </select>
                <input 
                    type='text'
                    onChange={(e) => props.onChangeSearchQuery(e.target.value)}
                    value={props.searchQuery} />
                <Button
                    action="Search"
                    type="Success"
                    clicked={() => {}}
                    ><SearchIcon /></Button>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        SearchTypeQuery: state.search.typeQuery
    };
};
 
const mapDispatchToProps = dispatch => {
    return {
        onChangeSearchQuery: (search) => dispatch(actions.changeSearchQuery(search)),
        onChangeSearchTypeQuery: (type) => dispatch(actions.changeSearchTypeQuery(type)),
        onSetSearchPath: () => dispatch(actions.setSearchPath())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(searchInput));
