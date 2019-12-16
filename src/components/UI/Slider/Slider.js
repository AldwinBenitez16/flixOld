// Dependencies
import React, { Component } from 'react';
import Slider from "react-slick";
import { ternary } from '../../../shared/Utillity/Utillity';

// Components
import Spinner from '../../UI/Spinner/Spinner';

// CSS
import styles from './Slider.module.css';

class SliderContainer extends Component {

    state = {
        width: 0
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
    }

    render() {
        let width = this.state.width;
        let devider = 250;
        if(width < 768) {
            devider = 200;
        }
        console.log(Math.floor(width / devider));
        const settings = {
            dots: false, 
            infinite: true,
            speed: 500,
            slidesToShow: Math.floor(width / devider),
            slidesToScroll: Math.floor(width / devider)
        }
        
        let data = (
            <div className={styles.SpinnerSlider}>
                <Spinner />
            </div>
        );
    
        if(!this.props.loading && this.props.data !== null) {
            data = (
                <Slider {...settings}>
                    {this.props.data.results.map(curr => {
                        let type = "movie";
                        if(curr.original_name) {
                            type = "tv";
                        }
                        return (
                            <div key={curr.id} className={styles.Item}>
                                <img
                                    onClick={() => this.props.viewInfo(type, ternary(curr.original_title, curr.original_name), curr.id)}
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
                <h2>{this.props.title}</h2>
                {data}
            </div>
        );
    };
};

/**
 * data -> array -> iterate -> get(info, images) -> display 
 * !data -> loadingSpinner
 */

export default SliderContainer;