// Dependencies
import React from 'react';

// Components
import PaginationButtons from './PaginationButtons/PaginationButtons';
import Button from '../../Button/Button';

// CSS
import styles from './Pagination.module.css';
import paginationStyles from './PaginationButtons/PaginationButtons.module.css';
const pagination = (props) => {
    const maxPages = props.max;
    const currPage = props.page;
    return(
        <div className={styles.Pagination}>
            <Button
                clicked={() => props.changePage(currPage - 1, maxPages)}
                addClass={[paginationStyles.UpdatedButtons]}
                type="Mini">{'<'}</Button>
            <PaginationButtons changePage={props.changePage} max={maxPages} page={currPage}/>
            <Button
                clicked={() => props.changePage((parseInt(currPage) + 1), maxPages)}
                addClass={[paginationStyles.UpdatedButtons]}
                type="Mini">{'>'}</Button>
        </div>
    );
};

export default pagination;