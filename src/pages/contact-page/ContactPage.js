import React, { Component } from 'react';
import { graphql } from "react-apollo";
import query from '../../graphql/queries/ContactPages';
import PageBanner from '../../components/page-banner/PageBanner';
import ContactForm from '../../components/contact-form/ContactForm';
import Footer from '../../components/footer/Footer';
import './ContactPage.scss';

class ContactPage extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        const page = this.props.data.readContactPages[0];
        const pageContent = () => ({__html: page.Content});

        return (
            <div className="contact-page">
                <PageBanner backgroundUrl={page.Banner.URL} bannerTitle={page.MenuTitle}></PageBanner>
                <h1>{page.Title}</h1>
                <div dangerouslySetInnerHTML={pageContent()} />
                <ContactForm />
                <Footer></Footer>
            </div>
        );
    }
}

export default graphql(query, {
    options: (props) => ({variables: { path: props.location.pathname.replace(/\/+/g, '') }})
})(ContactPage);