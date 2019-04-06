import React, { Component } from 'react';
import { graphql } from "react-apollo";
import ConfigContext from '../../config/ConfigContext';
import query from '../../graphql/queries/MenuPages';
import PageBanner from '../../components/page-banner/PageBanner';
import Footer from '../../components/footer/Footer';
import './MenuPage.scss';

class MenuPage extends Component {

    static contextType = ConfigContext;

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        console.log(this.context);//TODO: remove this line

        const page = this.props.data.readMenuPages[0];
        const pageContent = () => ({__html: page.Content});

        return (
            <div className="menu-page">
                <PageBanner backgroundUrl={page.Banner.URL} bannerTitle={page.MenuTitle}></PageBanner>
                <h1>{page.Title}</h1>
                <div dangerouslySetInnerHTML={pageContent()} />
                <Footer></Footer>
            </div>
        );
    }
}

export default graphql(query, {
    options: (props) => ({variables: { path: props.location.pathname.replace(/\/+/g, '') }})
})(MenuPage);