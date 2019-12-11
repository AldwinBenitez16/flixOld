// Dependencies
import React, { Fragment } from 'react';

// Components
import DataInfo from '../../UI/DataInfo/DataInfo';


// HOC
import DataWrapper from '../../../hoc/DataWrapper/DataWrapper';

const userPage = (props) => {
    let pageContent = null;
    if(props.show) {
        pageContent = (
            <Fragment>
                <DataWrapper path={props.moviePath}>
                    <DataInfo 
                        changePage={() => {console.log('change the page man')}}
                        title={props.title}
                        page={props.page}
                        viewInfo={props.viewInfo}
                        type="movie"
                        stylesType="user"/>
                </DataWrapper>
                <DataWrapper path={props.tvPath}>
                    <DataInfo 
                        changePage={() => {console.log('change the page man')}}
                        title={props.title}
                        page={props.page}
                        viewInfo={props.viewInfo}
                        type="tv" 
                        stylesType="user"/>
                </DataWrapper>
            </Fragment>
        );
    }
    return (
        <div>
            {pageContent}
        </div>
    );
};

export default userPage;