// Dependencies
import React from 'react';

// Components
import Button from '../../../Button/Button';

// CSS
import styles from './PaginationButtons.module.css';

const paginationButtons = (props) => {
    let pages = [];
    let min = props.page-4;
    if(min <= -1) {
        min = 0;
    }
    let max = parseInt(props.page) + 3;
    for(let i = min; i < max; i++) {
        if(i < 0 || i >= props.max) {
            continue;
        } else {
            let dynMob = null;
            if(i+1 >= min+5) {
                dynMob = styles.ButtonExtends;
            }
            pages.push(
                <Button
                    clicked={() => props.changePage(i+1, props.max)}
                    key={i}
                    addClass={[styles.UpdatedButtons, dynMob]}
                    type="Mini"
                >{i+1}</Button>
            );
        }
    }

    return (
        <div>
            {pages}
        </div>
    );
};

export default paginationButtons;