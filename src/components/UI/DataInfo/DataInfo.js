// Dependencies
import React from 'react';
import { ternary } from '../../../shared/Utillity/Utillity';
import { connect } from 'react-redux';

// Components
import Pagination from './Pagination/Pagination';
import Spinner from '../Spinner/Spinner';

// CSS
import styles from './DataInfo.module.css';

const dataInfo = (props) => {
    let dataItems = <Spinner />;
    let pagination= null;
    let dataStyles = styles.DataInfo;
    let dataTitle = styles.DataTitle;
    let addClass = [];
    if(props.addClass) {
        addClass = props.addClass;
    }

    if(props.stylesType === 'user') {
        dataStyles = styles.UserDataInfo;
    }

    if(!props.loading && props.data !== null) {
        let dataItemsArray = props.data.results;
        dataItems = dataItemsArray.map(curr => {
            return (
                <div 
                    onClick={() => props.viewInfo(props.type, ternary(curr.original_title, curr.original_name), curr.id)}
                    key={curr.id} 
                    className={styles.Item}>
                    <img 
                        src={`https://image.tmdb.org/t/p/w500/${curr.poster_path}`} 
                        onError={(e) => {e.target.src='https://i.imgur.com/zwpr2vD.jpg'}}  
                        alt={curr.title}/>
                </div>
            );
        });

        if(props.data.total_pages > 1) {
            pagination = <Pagination
                max={props.data.total_pages}
                changePage={props.changePage}
                page={props.data.page} />;
        }
    }

    return (
        <div className={[dataStyles, ...addClass].join(' ')}>
            <div className={dataTitle}>
                <h2>{props.title}</h2>
            </div>
            {dataItems}
            {pagination}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        mediaItems: state.info.mediaItems
    };
};

export default connect(mapStateToProps)(dataInfo);