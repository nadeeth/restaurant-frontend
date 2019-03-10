import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import './Page.scss';

class Page extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        const page = this.props.data.readPages[0];
        const pageContent = () => ({__html: page.Content});

        return (
            <div className="page">
                <h1>{page.Title}</h1>
                <div dangerouslySetInnerHTML={pageContent()} />
            </div>
        );
    }
}

const query = gql`
    query($path: String) {
        readPages(URLSegment: $path) {
            MenuTitle
            Title
            Content
            Banner {
                URL
            }
        }
    }
`;

export default graphql(query, {
    options: (props) => ({variables: { path: props.location.pathname.replace(/\/+/g, '') }})
})(Page);