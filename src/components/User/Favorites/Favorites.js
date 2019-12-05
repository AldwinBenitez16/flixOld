// Dependencies
import React, { Fragment } from 'react';
import { apiKey } from '../../../shared/Axios/axios';

// Components
import Slider from '../../UI/Slider/Slider';

// HOC
import DataWrapper from '../../../hoc/DataWrapper/DataWrapper';


const favorites = (props) => {
    let favoritesContent = null;
    if(props.show) {
        favoritesContent = (
            <Fragment>
                <DataWrapper path={`/account/${props.accountID}/favorite/movies?api_key=${apiKey}&session_id=${props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}>
                    <Slider />
                </DataWrapper>
                <DataWrapper path={`/account/${props.accountID}/favorite/tv?api_key=${apiKey}&session_id=${props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}>
                    <Slider />
                </DataWrapper>
            </Fragment>
        );
    }
    return (
        <div>
            {favoritesContent}
        </div>
    );
};

export default favorites;