// Dependencies
import React, { Fragment } from 'react';
import { apiKey } from '../../../shared/Axios/axios';

// Components
import Slider from '../../UI/Slider/Slider';

// HOC
import DataWrapper from '../../../hoc/DataWrapper/DataWrapper';


const rated = (props) => {
    let ratedContent = null;
    if(props.show) {
        ratedContent = (
            <Fragment>
                <DataWrapper path={`/account/${props.accountID}/rated/movies?api_key=${apiKey}&session_id=${props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}>
                    <Slider />
                </DataWrapper>
                <DataWrapper path={`/account/${props.accountID}/rated/tv?api_key=${apiKey}&session_id=${props.sessionID}&language=en-US&sort_by=created_at.asc&page=1`}>
                    <Slider />
                </DataWrapper>
            </Fragment>
        );
    }
    return (
        <div>
            {ratedContent}
        </div>
    );
};

export default rated;