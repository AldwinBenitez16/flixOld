// Dependencies
import React from 'react';
import { apiKey } from '../../../shared/Axios/axios';

// Components
import Slider from '../../UI/Slider/Slider';

// HOC
import DataWrapper from '../../../hoc/DataWrapper/DataWrapper';

const lists = (props) => {
    let list = null;
    if(props.show) {
        list = (
            <DataWrapper path={`/account/${props.accountID}/lists?api_key=${apiKey}&language=en-US&session_id=${props.sessionID}&page=1`}>
                <Slider />
            </DataWrapper>
        );
    }
    return (
        <div>
            {list}
        </div>
    );
};

export default lists;