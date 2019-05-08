import ApolloClient from "apollo-boost";
import Page from '../pages/page/Page';
import HomePage from '../pages/home-page/HomePage';
import ContactPage from '../pages/contact-page/ContactPage';
import MenuPage from '../pages/menu-page/MenuPage';

const Config = {
    client: new ApolloClient({
        uri: 'http://localhost:8100/graphql'
    }),
    assetsBaseUrl : 'http://localhost:8100',
    pages : {
        Page,
        HomePage,
        ContactPage,
        MenuPage
    },
    isMobile : () => window.innerWidth <= 760
}

export default Config;
