import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import './MenuPage.scss';

class MenuPage extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        const page = this.props.data.readMenuPages[0];
        const pageContent = () => ({__html: page.Content});

        return (
            <div className="menu-page">
                <h1>{page.Title}</h1>
                <div dangerouslySetInnerHTML={pageContent()} />
            </div>
        );
    }
}

const query = gql`
    query($path: String) {
        readMenuPages(URLSegment: $path) {
            Title
            MenuTitle
            Content
            Banner {
                Title
                Name
                Filename
                File
            }
            MenuItems {
                edges {
                    node {
                        Title
                        Price
                        Description
                        Image {
                            Filename
                        }
                    }
                }
            }
        }
    }
`;

export default graphql(query, {
    options: (props) => ({variables: { path: props.location.pathname.replace(/\/+/g, '') }})
})(MenuPage);