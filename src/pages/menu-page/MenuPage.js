import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import './MenuPage.scss';
import Footer from '../../components/footer/Footer';

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
                <Footer></Footer>
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
                URL
            }
            MenuItems {
                edges {
                    node {
                        Title
                        Price
                        Description
                        Image {
                            URL
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