import React, { Component } from 'react';
import { graphql } from "react-apollo";
import query from '../../graphql/queries/ContactPages';
import PageBanner from '../../components/page-banner/PageBanner';
import ContactForm from '../../components/contact-form/ContactForm';
import Loading from '../../components/loading/Loading';
import Footer from '../../components/footer/Footer';
import './ContactPage.scss';

class ContactPage extends Component {

    render() {

        if (this.props.data.loading) {
            return <Loading/>;
        }

        const page = this.props.data.readContactPages[0];
        const pageContent = () => ({__html: page.Content});

        return (
            <div className="contact-page">
                <PageBanner backgroundUrl={page.Banner.URL} bannerTitle={page.MenuTitle}></PageBanner>
                <div className="page-body">
                    <h1>{page.Title}</h1>
                    <div className="content" dangerouslySetInnerHTML={pageContent()} />
                    <ContactForm />
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default graphql(query, {
    options: (props) => ({variables: { path: props.location.pathname.replace(/\/+/g, '') }})
})(ContactPage);