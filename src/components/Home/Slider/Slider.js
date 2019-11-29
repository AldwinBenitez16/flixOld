// Dependencies
import React from 'react';
import Slider from "react-slick";

// Components
import Spinner from '../../UI/Spinner/Spinner';

// CSS
import styles from './Slider.module.css';

const slider = (props) => {
    const settings = {
        dots: false, 
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8
    }
    let data = (
        <div className={styles.SpinnerSlider}>
            <Spinner />
        </div>
    );
    if(!props.loading && props.data !== null) {
        data = (
            <Slider {...settings}>
                {props.data.results.map(curr => {
                    let type = "movie";
                    if(curr.original_name) {
                        type = "tv";
                    }
                    return (
                        <div key={curr.id} className={styles.Item}>
                            <img
                                onClick={() => props.viewInfo(type, curr.original_title, curr.id)}
                                src={`https://image.tmdb.org/t/p/w500/${curr.poster_path}`} 
                                onError={(e) => {e.target.src='https://i.imgur.com/zwpr2vD.jpg'}} 
                                alt={curr.title}/>
                        </div>
                    );
                })}
            </Slider>
        );
    }
    return(
        <div className={styles.Slider}>
            <h2>{props.title}</h2>
            {data}
        </div>
    );
};

/**
 * data -> array -> iterate -> get(info, images) -> display 
 * !data -> loadingSpinner
 */

export default slider;