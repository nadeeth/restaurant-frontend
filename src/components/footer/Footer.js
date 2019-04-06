import React, { Component } from 'react';
import ConfigContext from '../../config/ConfigContext';
import FooterMenu from '../footer-menu/FooterMenu';
import './Footer.scss';

class Footer extends Component {

    static contextType = ConfigContext;

    render() {

        return (
            <footer>
                <FooterMenu></FooterMenu>
                <div className="footer-text">{this.context.FooterText}</div>
                <div className="powered-by">Powered by FeastCloud</div>
            </footer>
        );
    }
}

export default Footer;