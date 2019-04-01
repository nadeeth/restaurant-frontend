import React, { Component } from 'react';
import { graphql } from "react-apollo";
import Config from "../../config/Config";
import query from "../../graphql/queries/HomePages";
import './HomePage.scss';

class HomePage extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        const page = this.props.data.readHomePages[0];
        const pageContent = () => ({__html: page.Content});
        const bgStyles = {backgroundImage: 'url("' + Config.assetsBaseUrl + page.Background.URL + '")'}

        return (
            <div className="home-page" style={bgStyles}>
                <h1>{page.Title}</h1>
                <div dangerouslySetInnerHTML={pageContent()} />
            </div>
        );
    }
}

export default graphql(query, {
    options: (props) => ({variables: { 
        path: props.location.pathname.replace(/\/+/g, '') ? props.location.pathname.replace(/\/+/g, '') : 'home'
    }})
})(HomePage);