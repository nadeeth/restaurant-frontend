import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import './HomePage.scss';

class HomePage extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        const page = this.props.data.readHomePages[0];
        const pageContent = () => ({__html: page.Content});
        const bgStyles = {backgroundImage: 'url("http://localhost:8100' + page.Background.URL + '")'}

        return (
            <div className="home-page" style={bgStyles}>
                <h1>{page.Title}</h1>
                <div dangerouslySetInnerHTML={pageContent()} />
            </div>
        );
    }
}

const query = gql`
    query($path: String) {
        readHomePages(URLSegment: $path) {
            MenuTitle
            Title
            Content
            Banner {
                URL
            }
            Background {
                URL
            }
        }
    }
`;

export default graphql(query, {
    options: (props) => ({variables: { path: props.location.pathname.replace(/\/+/g, '') }})
})(HomePage);