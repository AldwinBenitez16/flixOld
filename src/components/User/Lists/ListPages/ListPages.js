// Dependencies
import React, { Component } from 'react';

// Components
import Spinner from '../../../UI/Spinner/Spinner';
import DataInfo from '../../../UI/DataInfo/DataInfo';

const listPages = (props) => {
    const { accountLists, list } = props;
    let listPagesContent = <Spinner />;
    if(accountLists) {
        let listPagesArray = Object.keys(accountLists).map(key => {
            let updatedItem = accountLists[key];
            updatedItem.id = key;
            return updatedItem;
        });

        listPagesContent = listPagesArray.map(item => {
            let listItem = null;
            if(list[item.id]) {
                let data = {
                    page: 1,
                    results: item.listItems,
                    total_pages: 1,
                    total_results: item.length
                };
                if(list[item.id].show) {
                    listItem = (
                        <DataInfo 
                        key={item}
                        data={data}
                        changePage={() => {console.log('change the page man')}}
                        title={list[item.id].title}
                        page="1"
                        viewInfo={props.viewInfo}
                        stylesType="user"/>
                    ); 
                }
            }
            return listItem;
        });
    }
    return (
        <div>
            {listPagesContent}
        </div>
    );
};

export default listPages;