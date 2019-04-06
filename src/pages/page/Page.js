import React, { Component } from 'react';
import { graphql } from "react-apollo";
import query from '../../graphql/queries/Pages';
import Footer from '../../components/footer/Footer';
import PageBanner from '../../components/page-banner/PageBanner';
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
                <PageBanner backgroundUrl={page.Banner.URL} bannerTitle={page.MenuTitle}></PageBanner>
                <div className="page-body">
                    <h1>{page.Title}</h1>
                    <div dangerouslySetInnerHTML={pageContent()} />
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default graphql(query, {
    options: (props) => ({variables: { path: props.location.pathname.replace(/\/+/g, '') }})
})(Page);