// Dependencies
import React, { Fragment, Component } from 'react';
import axios, { apiKey } from '../../../../../../shared/Axios/axios';
import { connect } from 'react-redux';

// CSS
import styles from './ListItem.module.css';

// Assets
import { ReactComponent as Clear } from '../../../../../../assets/images/svgs/erase.svg';
import { ReactComponent as Delete } from '../../../../../../assets/images/svgs/delete.svg';
import { ReactComponent as AddMedia } from '../../../../../../assets/images/svgs/list+.svg';
import { ReactComponent as RemoveMedia } from '../../../../../../assets/images/svgs/list-.svg';

class ListItem extends Component {

    state = {
        present: null
    };

    componentDidMount() {
        this.checkMediaStatus();
    }

    checkMediaStatus = () => {
        const { mediaID, id } = this.props;
        axios.get(`/list/${id}/item_status?api_key=${apiKey}&movie_id=${mediaID}`)
            .then(res => {
                console.log(res.data);
                this.setState({present: res.data.item_present})
            })
            .catch(err => {
                console.log(err);
            });
    }

    addMediaHandler = () => {
        axios({
            url: `/list/${this.props.id}/add_item?api_key=${apiKey}&session_id=${this.props.sessionID}`,
            method: "post",
            data: {
                media_id: this.props.mediaID
            }
        })
            .then(res => {
                console.log(res.data);
                this.checkMediaStatus();
            })
            .catch(err => {
                console.log(err);
            });
    };

    removeMediaHandler = () => {
        // axios()
        //     .then(res => {
        //         console.log(res.data);
        //         this.checkMediaStatus();
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    };

    render() {
        const { mediaID, sessionID, dispatch, ...rest } = this.props;
        let listControls = (
            <div>
                <Clear />
                <Delete />
            </div>
        );
        if(this.props.type === 'info') {
            listControls =  (
                <Fragment>
                    {this.state.present ? 
                        <RemoveMedia 
                            title="Remove Movie From List"
                            className={styles.InfoSVG}/> : 
                        <AddMedia
                            onClick={this.addMediaHandler}
                            title="Add Movie To List" 
                            className={styles.InfoSVG}/>}
                </Fragment>
            );
        }
        return  <li 
            className={styles.ListItem}
            {...rest}>{this.props.children}{listControls}</li>;
    }
};

const mapStateToProps = state => {
    return {
        sessionID: state.auth.sessionIdData.session_id
    };
};

export default connect(mapStateToProps)(ListItem);