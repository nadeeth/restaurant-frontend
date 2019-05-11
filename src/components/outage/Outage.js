import React, { Component } from 'react';
import './Outage.scss';

class Outage extends Component {

    render() {

        const bgStyles = {
            height: window.innerHeight + 'px'
        }

        return (
            <div className="outage" style={bgStyles}>
                <h1>Oops!</h1>
                <p>We are experiencing some unexpected technical issues. We will be back online soon. Please try again later.</p>
            </div>
        );
    }
}

export default Outage;