import Page from './pages/page/Page';
import HomePage from './pages/home-page/HomePage';
import ContactPage from './pages/contact-page/ContactPage';
import MenuPage from './pages/menu-page/MenuPage';

const Config = {
    apiBaseUrl : 'http://localhost:8100/graphql',
    pages : {
        Page,
        HomePage,
        ContactPage,
        MenuPage
    }
}

export default Config;
