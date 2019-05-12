import React, { Component } from 'react';
import { graphql } from "react-apollo";
import query from '../../graphql/queries/MenuPages';
import PageBanner from '../../components/page-banner/PageBanner';
import Loading from '../../components/loading/Loading';
import Footer from '../../components/footer/Footer';
import MenuItem from '../../components/menu-item/MenuItem';
import OrderForm from '../../components/order-form/OrderForm';
import './MenuPage.scss';

class MenuPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            order: {
                ID: null,
                Email: '',
                Name: '',
                Phone: '',
                PickUpTime: 0,
                Message: '',
                Status: null,
                Total: null,
                Tax: null,
                Discount: null,
                NetTotal: null,
                items: []
            }
        }

        this.updateOrder = this.updateOrder.bind(this);
    }

    render() {

        if (this.props.data.loading) {
            return <Loading/>;
        }

        const page = this.props.data.readMenuPages[0];
        const pageContent = () => ({__html: page.Content});

        return (
            <div className="menu-page">
                <PageBanner backgroundUrl={page.Banner.URL} bannerTitle={page.MenuTitle}></PageBanner>
                <h1>{page.Title}</h1>
                <div dangerouslySetInnerHTML={pageContent()} />
                <OrderForm onChange={this.updateOrder} order={this.state.order} />
                <div className="menu">
                    {this.renderMenuItems(page.MenuItems.edges)}
                </div>
                <Footer></Footer>
            </div>
        );
    }

    renderMenuItems(items) {
        const itemsJsx = [];
        Object.keys(items).forEach(key => {
            const item = items[key].node;
            itemsJsx.push(
                <MenuItem onChange={this.updateOrder} item={item} order={this.state.order} key={item.ID} />
            );
        });
        return itemsJsx;
    }

    updateOrder(order) {
        this.setState({order});
    }
}

export default graphql(query, {
    options: (props) => ({variables: { path: props.location.pathname.replace(/\/+/g, '') }})
})(MenuPage);