import React, { Component } from 'react';
import { graphql } from "react-apollo";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import ConfigContext from '../../config/ConfigContext';
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
        this.handleDateChange = this.handleDateChange.bind(this);
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
                    <div className="pickup-time">
                        <label htmlFor="PickUpTime">Pick up time</label>
                        <DatePicker
                            name="PickUpTime"
                            id="PickUpTime"
                            selected={this.state.order.PickUpTime}
                            onChange={this.handleDateChange}
                            showTimeSelect
                            timeFormat="h:mm aa"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            minDate={new Date()}
                            withPortal
                            placeholderText="Click to select pickup time"
                        />
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

    async removeItem(item) {

        let found = false;
        let foundIndex = null;
        this.state.order.items.forEach(async (i, index) => {
            if (i.Title === item.Title && i.Price === item.Price) {
                found = i;
                foundIndex = index;
            }
        });

        if (found.Qty > 1) {
            found.Qty--;
        } else {
            delete this.state.order.items[foundIndex];
        }

        this.setState({order: this.state.order});
        this.props.onChange(this.state.order);
    }

    handleInputChange(event) {
        const order = this.state.order;
        order[event.target.name] = event.target.value;
        this.setState({order});
    }

    handleDateChange(date) {
        console.log(moment.parseZone(date).format("dddd, MMMM Do YYYY, h:mm:ss a"));
        const order = this.state.order;
        order.PickUpTime = date;
        this.setState({order});
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ''});
        if (!this.state.order.items.length) {
            this.setState({error: 'Please add some menu items to your order.'});
            return;
        }
        this.setState({success: 'Sending...'});
        await this.props.mutate({
            variables: {
                ID: 0,
                Email: this.state.order.Email,
                Name: this.state.order.Name,
                Phone: this.state.order.Phone,
                PickUpTime: moment.parseZone(this.state.order.PickUpTime).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                Message: this.state.order.Message,
                Status: 'CustomerCreatedConfirmed',
                Total: this.state.order.Total, 
                Tax: this.state.order.Tax,
                Discount: this.state.order.Discount,
                NetTotal: this.state.order.NetTotal,
                OrderItems: JSON.stringify(this.state.order.items)
            }
        });

        this.setState({success: 'Order placed.'});
        const order = this.state.order;
        order.items = [];
        this.props.onChange(order);
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