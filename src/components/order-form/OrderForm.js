import React, { Component } from 'react';
import { graphql } from "react-apollo";
import Config from '../../config/Config';
import ConfigContext from '../../config/ConfigContext';
import CreateOrderItemMutation from '../../graphql/mutations/CreateOrderItem';
import DeleteOrderItemMutation from '../../graphql/mutations/DeleteOrderItem';
import orderMutation from '../../graphql/mutations/CreateOrder';
import './OrderForm.scss';

class OrderForm extends Component {

    static contextType = ConfigContext;

    constructor(props) {
        super(props);
        this.state = {
            order: this.props.order
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {

        console.log(this.context);//TODO: remove this line

        return (
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
                        <textarea name="Message" id="Message" value={this.state.order.Message} onChange={this.handleInputChange} />
                    </div>
                    <div className="action">
                        <input type="submit" value="Confirm Order" />
                    </div>
                </form>
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

    removeItem(item) {
        this.state.order.items.forEach(async (savedItem, index) => {
            if (savedItem.Title === item.Title && savedItem.Price === item.Price) {
                if (savedItem.Qty > 1) {
                    savedItem.Qty--;
                    await this.alterOrderItem(
                        { ID: savedItem.ID, OrderID: savedItem.OrderID, Title: savedItem.Title, Price: savedItem.Price, Qty: savedItem.Qty },
                        CreateOrderItemMutation
                    );
                } else {
                    await this.alterOrderItem(
                        { ID: this.state.order.items[index].ID},
                        DeleteOrderItemMutation
                    )
                    delete this.state.order.items[index];
                }
            }
        });
        this.setState({order: this.state.order});
        this.props.onChange(this.state.order);
    }

    async alterOrderItem(variables, mutation) {
        const { data } = await Config.client.mutate({
            mutation: mutation,
            variables: variables
        });
        return data;
    }

    handleInputChange(event) {
        const order = this.state.order;
        order[event.target.name] = event.target.value;
        this.setState({order});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ''});
        if (!this.state.order.items.length) {
            this.setState({error: 'Please add some menu items to your order.'});
            return;
        }
        this.setState({success: 'Sending...'});
        this.props.mutate({
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
        .then(() => {
            this.setState({success: 'Order placed.'});
            const order = this.state.order;
            order.ID = 0;
            order.items = [];
            this.props.onChange(order);
        })
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
}

export default graphql(orderMutation)(OrderForm);