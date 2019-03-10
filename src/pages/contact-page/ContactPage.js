import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import './ContactPage.scss';
import Footer from '../../components/footer/Footer';

class ContactPage extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        const page = this.props.data.readContactPages[0];
        const pageContent = () => ({__html: page.Content});

        return (
            <div className="contact-page">
                <h1>{page.Title}</h1>
                <div dangerouslySetInnerHTML={pageContent()} />
                <Footer></Footer>
            </div>
        );
    }
}

const query = gql`
    query($path: String) {
        readContactPages(URLSegment: $path) {
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
})(ContactPage);