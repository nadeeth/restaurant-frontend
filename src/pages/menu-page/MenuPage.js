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
                PickUpTime: new Date(),
                Message: '',
                Status: null,
                Total: null,
                Tax: null,
                Discount: null,
                NetTotal: null,
                items: []
            },
            selectedCategories: []
        }

        this.updateOrder = this.updateOrder.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
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
                <div className="page-body">
                    <h1>{page.Title}</h1>
                    <div className="content" dangerouslySetInnerHTML={pageContent()} />
                    <div className="order-section">
                        <div className="menu">
                            {this.renderMenuItems(page.MenuItems.edges)}
                        </div>
                        <OrderForm onChange={this.updateOrder} order={this.state.order} />
                        <div className="categories">
                            {this.renderCategories(page.MenuItems.edges)}
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }

    renderMenuItems(items) {
        const itemsJsx = [];
        Object.keys(items).forEach(key => {
            const item = items[key].node;
            if (!this.state.selectedCategories.length || this.state.selectedCategories.indexOf(item.Category.Title) !== -1) {
                itemsJsx.push(
                    <MenuItem onChange={this.updateOrder} item={item} order={this.state.order} key={item.ID} />
                );
            }
        });
        return itemsJsx;
    }

    handleCategoryChange(event) {
        let categories = this.state.selectedCategories;
        if (event.target.checked) {
            categories.push(event.target.value);
        } else {
            categories = categories.filter((category) => {
                return category !== event.target.value;
            });
        }
        this.setState({selectedCategories: categories});
    }

    renderCategories(items) {
        let unique_categories = [];
        const itemsJsx = [];
        Object.keys(items).forEach(key => {
            const item = items[key].node;
            if (unique_categories.indexOf(item.Category.Title) === -1) {
                itemsJsx.push(
                    <div className="category" key={item.ID}>
                        <input id={item.ID} type="checkbox" value={item.Category.Title} onChange={this.handleCategoryChange} />
                        <label htmlFor={item.ID}>{item.Category.Title}</label>
                    </div>
                );
            }
            unique_categories.push(item.Category.Title);
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