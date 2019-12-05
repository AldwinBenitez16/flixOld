// Dependencies
// Dependencies
import React, { Fragment } from 'react';
import { apiKey } from '../../../shared/Axios/axios';

// Components
import Slider from '../../UI/Slider/Slider';

// HOC
import DataWrapper from '../../../hoc/DataWrapper/DataWrapper';


const watchlist = (props) => {
    let watchlistContent = null;
    if(props.show) {
        watchlistContent = (
            <Fragment>
                <DataWrapper path={`/account/${props.accountID}/watchlist/movies?api_key=${apiKey}&session_id=${props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}>
                    <Slider />
                </DataWrapper>
                <DataWrapper path={`/account/${props.accountID}/watchlist/tv?api_key=${apiKey}&session_id=${props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}>
                    <Slider />
                </DataWrapper>
            </Fragment>
        );
    }
    return (
        <div>
            {watchlistContent}
        </div>
    );
};

export default watchlist;