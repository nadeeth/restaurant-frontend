import React, { Component } from 'react';
import loading from '../../images/loading.svg';
import './Loading.scss';

class Loading extends Component {

    render() {

        const bgStyles = {
            height: window.innerHeight + 'px'
        }

        return (
            <div className="loading" style={bgStyles}>
                <img src={loading} alt='loading' />
            </div>
        );
    }
}

export default Loading;