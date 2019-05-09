import React, { Component } from 'react';
import { graphql } from "react-apollo";
import Config from "../../config/Config";
import ConfigContext from '../../config/ConfigContext';
import query from '../../graphql/queries/MenuPages';
import PageBanner from '../../components/page-banner/PageBanner';
import Loading from '../../components/loading/Loading';
import Footer from '../../components/footer/Footer';
import './MenuPage.scss';
import gql from 'graphql-tag';

class MenuPage extends Component {

    static contextType = ConfigContext;
    
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

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const order = this.state.order;
        order[event.target.name] = event.target.value;
        this.setState({order});
    }

    handleSubmit(event) {
        this.setState({success: 'Sending...'});
        event.preventDefault();
        Config.client.mutate({
            mutation: gql`
                mutation($ID: Int!, $Email: String, $Name: String, $Phone: String!, $PickUpTime: Int, $Message: String, $Status: String, $Total: Float, $Tax: Float, $Discount: Float, $NetTotal: Float) {
                    createOrder(
                        ID: $ID
                        Email: $Email,
                        Name: $Name,
                        Phone: $Phone,
                        PickUpTime: $PickUpTime,
                        Message: $Message,
                        Status: $Status,
                        Total: $Total,
                        Tax: $Tax,
                        Discount: $Discount,
                        NetTotal: $NetTotal
                    ) {
                        ID
                        Email
                        Name
                        Phone
                        PickUpTime
                        Message
                        Status
                        Total
                        Tax
                        Discount
                        NetTotal
                    }
                }
            `,
            variables: {
                ID: this.state.order.ID,
                Email: this.state.order.Email,
                Name: this.state.order.Name,
                Phone: this.state.order.Phone,
                PickUpTime: this.state.order.PickUpTime,
                Message: this.state.order.Message,
                Status: 'CustomerConfirmed',
                Total: this.state.order.Total, 
                Tax: this.state.order.Tax,
                Discount: this.state.order.Discount,
                NetTotal: this.state.order.NetTotal
            }
        })
        .then(() => this.setState({success: 'Order placed.'}))
        .catch(() => this.setState({error: 'Error placing order. Please try again later.'}));
    }

    success() {
        if (this.state.success) {
            return (<h3 className="success">{this.state.success}</h3>);
        }
    }

    error() {
        if (this.state.error) {
            return (<h3 className="error">{this.state.error}</h3>);
        }
    }

    render() {

        if (this.props.data.loading) {
            return <Loading/>;
        }

        // console.log(this.context);//TODO: remove this line

        const page = this.props.data.readMenuPages[0];
        const pageContent = () => ({__html: page.Content});

        return (
            <div className="menu-page">
                <PageBanner backgroundUrl={page.Banner.URL} bannerTitle={page.MenuTitle}></PageBanner>
                <h1>{page.Title}</h1>
                <div dangerouslySetInnerHTML={pageContent()} />
                <div className="order">
                    {this.renderOrderItems()}
                    <form onSubmit={this.handleSubmit} className="order-form">
                        <div className="info">
                            {this.success()}
                            {this.error()}
                        </div>
                        <div className="name">
                            <label htmlFor="Name">Name</label>
                            <input
                                name="Name"
                                id="Name"
                                type="text"
                                required
                                value={this.state.order.Name}
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="phone">
                            <label htmlFor="Phone">Phone</label>
                            <input
                                name="Phone"
                                id="Phone"
                                type="tel"
                                required
                                value={this.state.order.Phone}
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="email">
                            <label htmlFor="Email">Email</label>
                            <input
                                name="Email"
                                id="Email"
                                type="email"
                                required
                                value={this.state.order.Email}
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="message">
                            <label htmlFor="Message">Messege</label>
                            <textarea name="Message" id="Message" required value={this.state.order.Message} onChange={this.handleInputChange} />
                        </div>
                        <div className="action">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
                <div className="menu">
                    {this.renderMenuItems(page.MenuItems.edges)}
                </div>
                <Footer></Footer>
            </div>
        );
    }

    renderOrderItems() {
        return this.state.order.items.map((item, index) => {
            return (
                <div key={index}>{item.Title} : {item.Price} . {item.Qty} <span onClick={() => this.removeItem(item)}>-</span></div>
            )
        });
    }

    renderMenuItems(items) {
        const itemsJsx = [];
        Object.keys(items).forEach(key => {
            const item = items[key].node;
            itemsJsx.push(
                <div className="menu-item" key={item.ID}>
                    <h5>{item.Title}</h5>
                    <p>{item.Description}</p>
                    <span>{item.Price}</span><span onClick={() => this.addItem(item)}>+</span>
                    <img src={Config.assetsBaseUrl + item.Image.URL} alt={item.Title} />
                </div>
            );
        });
        return itemsJsx;
    }

    async addItem(item) {

        if (!this.state.order.ID) {
            const { data } = await Config.client.mutate({
                mutation : gql`mutation($ID: Int!, $Email: String, $Name: String, $Phone: String!, $PickUpTime: Int, $Message: String, $Status: String, $Total: Float, $Tax: Float, $Discount: Float, $NetTotal: Float) {
                    createOrder(
                      ID: $ID
                      Email: $Email,
                      Name: $Name,
                      Phone: $Phone,
                      PickUpTime: $PickUpTime,
                      Message: $Message,
                      Status: $Status,
                      Total: $Total,
                      Tax: $Tax,
                      Discount: $Discount,
                      NetTotal: $NetTotal
                    ) {
                      ID
                      Email
                      Name
                      Phone
                      PickUpTime
                      Message
                      Status
                      Total
                      Tax
                      Discount
                      NetTotal
                    }
                  }`,
                  variables: { ID: 0, Email: '', Name: '', Phone: '', PickUpTime: 123, Message: '', Status: 'Created', Total: 0, Tax: 0, Discount: 0, NetTotal: 0}
            })
            this.state.order.ID = data.createOrder.ID;
            this.setState({order: this.state.order});
        }

        console.log(item);
        console.log(this.state.order.ID);
        console.log(this.state.order.items);

        let found = false;
        this.state.order.items.forEach(async (i) => {
            if (i.Title === item.Title && i.Price === parseFloat(item.Price)) {
                found = i;
            }
        });
        if (found) {
            const qty = found.Qty + 1;
            const { data } = await Config.client.mutate({
                mutation: gql`mutation($ID: Int!, $OrderID: Int, $Title: String, $Price: Float, $Qty: Int) {
                    createOrderItem(
                        ID: $ID
                        OrderID: $OrderID,
                        Title: $Title,
                        Price: $Price,
                        Qty: $Qty
                    ) {
                        ID
                        OrderID
                        Title
                        Price
                        Qty
                    }
                    }`,
                variables: { ID: found.ID, OrderID: found.OrderID, Title: found.Title, Price: found.Price, Qty: qty }
            });
            found.Qty = data.createOrderItem.Qty;
        }
        if (!found) {
            const { data } = await Config.client.mutate({
                mutation: gql`mutation($ID: Int!, $OrderID: Int, $Title: String, $Price: Float, $Qty: Int) {
                    createOrderItem(
                      ID: $ID
                      OrderID: $OrderID,
                      Title: $Title,
                      Price: $Price,
                      Qty: $Qty
                    ) {
                      ID
                      OrderID
                      Title
                      Price
                      Qty
                    }
                  }`,
                variables: { ID: 0, OrderID: this.state.order.ID, Title: item.Title, Price: item.Price, Qty: 1 }
            });
            // this.state.order.items.push(data.createOrderItem);
            this.state.order.items.push({
                ID : data.createOrderItem.ID,
                OrderID: data.createOrderItem.OrderID,
                Title: data.createOrderItem.Title,
                Price: data.createOrderItem.Price,
                Qty: data.createOrderItem.Qty
            });
        }
        this.setState({order: this.state.order});
    }

    removeItem(item) {
        this.state.order.items.forEach((savedItem, index) => {
            if (savedItem.Title === item.Title && savedItem.Price === item.Price) {
                if (savedItem.Qty > 1) {
                    savedItem.Qty--;
                } else {
                    delete this.state.order.items[index];
                }
            }
        });
        this.setState({order: this.state.order});
    }
}

export default graphql(query, {
    options: (props) => ({variables: { path: props.location.pathname.replace(/\/+/g, '') }})
})(MenuPage);