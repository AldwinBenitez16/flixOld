// Dependencies
import React from 'react';
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
                onSubmit={(e) => props.viewSearchPage(e)} >
                <select 
                    onChange={(e) => props.ChangeSearchTypeQuery(e.target.value)}
                    value={props.SearchTypeQuery}
                    defaultValue="movie">
                    <option value="movie">Movies</option>
                    <option value="tv" >Tv</option>
                </select>
                <input 
                    type='text'
                    onChange={(e) => props.ChangeSearchQuery(e.target.value)}
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

export default withRouter(searchInput);
