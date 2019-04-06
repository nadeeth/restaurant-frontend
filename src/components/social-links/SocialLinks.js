import React, { Component } from 'react';
import ConfigContext from '../../config/ConfigContext';
import Facebook from '../../images/facebook.svg';
import Twitter from '../../images/twitter.svg';
import Instagram from '../../images/instagram.svg';
import './SocialLinks.scss';

class SocialLinks extends Component {

    static contextType = ConfigContext;

    render() {
        return (
            <div className="social-links">
                {this.context.Facebook &&
                    <a href={this.context.Facebook} target="_blank" rel="noopener noreferrer"><img src={Facebook} alt="Facebook" /></a>
                }
                {this.context.Twitter &&
                    <a href={this.context.Twitter} target="_blank" rel="noopener noreferrer"><img src={Twitter} alt="Twitter"/></a>
                }
                {this.context.Instagram &&
                    <a href={this.context.Instagram} target="_blank" rel="noopener noreferrer"><img src={Instagram} alt="Instagram"/></a>
                }
            </div>
        );
    }
}

export default SocialLinks;