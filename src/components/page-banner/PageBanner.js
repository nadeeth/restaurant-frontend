import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Config from "../../config/Config";
import './PageBanner.scss';

class PageBanner extends Component {

    render() {

        const bgStyles = {
            backgroundImage: 'url("' + Config.assetsBaseUrl + this.props.backgroundUrl + '")'
        }

        return (
            <div className="page-banner" style={bgStyles}>
                <h2>{this.props.bannerTitle}</h2>
                <div className="bread-crumbs">
                    <Link to="/home/">Home</Link> &gt; <span>{this.props.bannerTitle}</span>
                </div>
            </div>
        );
    }
}

export default PageBanner;