import ApolloClient from "apollo-boost";
import Page from '../pages/page/Page';
import HomePage from '../pages/home-page/HomePage';
import ContactPage from '../pages/contact-page/ContactPage';
import MenuPage from '../pages/menu-page/MenuPage';

const apiBaseUrl = 'http://localhost:8100';

const Config = {
    client: new ApolloClient({
        uri: apiBaseUrl + '/graphql'
    }),
    assetsBaseUrl : apiBaseUrl,
    pages : {
        Page,
        HomePage,
        ContactPage,
        MenuPage
    },
    isMobile : () => window.innerWidth <= 760
}

export default Config;
