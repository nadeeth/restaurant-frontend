import React, { Component } from 'react';
import Config from '../../config/Config';
import orderItemMutation from '../../graphql/mutations/CreateOrderItem';
import orderMutation from '../../graphql/mutations/CreateOrder';
import './MenuItem.scss';

class MenuItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: this.props.order
        }
    }

    render() {

        const item = this.props.item;

        return (
            <div className="menu-item">
                <h5>{item.Title}</h5>
                <p>{item.Description}</p>
                <span>{item.Price}</span><span onClick={() => this.addItem(item)}>+</span>
                {item.Image.URL && 
                <img src={Config.assetsBaseUrl + item.Image.URL} alt={item.Title} />
                }
            </div>
        );
    }

    async addItem(item) {

        if (!this.state.order.ID) {
            await this.createOrder();
        }

        let found = false;
        this.state.order.items.forEach(async (i) => {
            if (i.Title === item.Title && i.Price === parseFloat(item.Price)) {
                found = i;
            }
        });
        if (found) {
            const qty = found.Qty + 1;
            const data = await this.createOrderItem({ ID: found.ID, OrderID: found.OrderID, Title: found.Title, Price: found.Price, Qty: qty });
            found.Qty = data.createOrderItem.Qty;
        }
        if (!found) {
            const data = await this.createOrderItem({ ID: 0, OrderID: this.state.order.ID, Title: item.Title, Price: item.Price, Qty: 1 });
            this.state.order.items.push({
                ID : data.createOrderItem.ID,
                OrderID: data.createOrderItem.OrderID,
                Title: data.createOrderItem.Title,
                Price: data.createOrderItem.Price,
                Qty: data.createOrderItem.Qty
            });
        }
        this.setState({order: this.state.order});
        this.props.onChange(this.state.order);
    }

    async createOrder() {
        const { data } = await Config.client.mutate({
            mutation : orderMutation,
            variables: { ID: 0, Email: '', Name: '', Phone: '', PickUpTime: 0, Message: '', Status: 'Created', Total: 0, Tax: 0, Discount: 0, NetTotal: 0}
        })
        this.state.order.ID = data.createOrder.ID;
        this.setState({order: this.state.order});
    }

    async createOrderItem(variables) {
        const { data } = await Config.client.mutate({
            mutation: orderItemMutation,
            variables: variables
        });
        return data;
    }
}

export default MenuItem;