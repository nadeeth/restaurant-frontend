import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import Config from "../../config/Config";
import query from "../../graphql/queries/HomePages";
import Loading from '../../components/loading/Loading';
import './HomePage.scss';

class HomePage extends Component {

    render() {

        if (this.props.data.loading) {
            return <Loading/>;
        }

        const page = this.props.data.readHomePages[0];
        const pageContent = () => ({__html: page.Content});
        const bgStyles = {
            backgroundImage: 'url("' + Config.assetsBaseUrl + page.Background.URL + '")',
            height: window.innerHeight + 'px'
        }

        return (
            <div className="home-page" style={bgStyles}>
                <div className="content">
                    <h1>{page.Title}</h1>
                    <div dangerouslySetInnerHTML={pageContent()} />
                    <div className="promo-buttons">
                        <Link to={'/menu/'}>Order Now</Link>
                        <Link to={'/contact-us/'} className="ghost">Book a Table</Link>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    onResize() {
        this.forceUpdate();
    }
}

export default graphql(query, {
    options: (props) => ({variables: { 
        path: props.location.pathname.replace(/\/+/g, '') ? props.location.pathname.replace(/\/+/g, '') : 'home'
    }})
})(HomePage);