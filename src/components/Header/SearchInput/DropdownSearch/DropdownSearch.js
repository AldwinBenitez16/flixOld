// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Button from '../../../UI/Button/Button';
import { ReactComponent as SearchIcon } from '../../../../assets/images/svgs/search.svg';

// CSS
import styles from './DropdownSearch.module.css';

const dropdown = (props) => {
    return (
        <div className={styles.DropdownSearch}>
            <Button clicked={() => {
                if(props.history.location.pathname !== '/home') {
                    props.clicked();
                }
            }}>
                <SearchIcon />
            </Button>
        </div>
    );
};

export default withRouter(dropdown);