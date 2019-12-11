// Dependencies
import React from 'react';
import { ternary } from '../../../shared/Utillity/Utillity';

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

    if(props.stylesType === 'user') {
        dataStyles = styles.UserDataInfo;
    }
    if(!props.loading && props.data !== null) {
        dataItems = props.data.results.map(curr => {
            let type = null;
            if (props.type) {
                type = props.type;
            } else {
                if(curr.original_title) {
                    type ="movie";
                } else {
                    type="tv";
                }
            }
            return (
                <div 
                    onClick={() => props.viewInfo(type, ternary(curr.original_title, curr.original_name), curr.id)}
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
                page={props.page} />;
        }
    }

    return (
        <div className={dataStyles}>
            <div className={dataTitle}>
                <h2>{props.title}</h2>
            </div>
            {dataItems}
            {pagination}
        </div>
    );
};

export default dataInfo;