import React, { Component } from 'react';
import { graphql } from "react-apollo";
import query from '../../graphql/queries/Pages';
import './Page.scss';
import Footer from '../../components/footer/Footer';

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
                <Footer></Footer>
            </div>
        );
    }
}

export default graphql(query, {
    options: (props) => ({variables: { path: props.location.pathname.replace(/\/+/g, '') }})
})(Page);