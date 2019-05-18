import React, { Component } from 'react';
import Config from '../../config/Config';
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
                <div className="description">
                    <h5>{item.Title}</h5>
                    <p>{item.Description}</p>
                </div>
                <div className="image">
                    {item.Image.URL && 
                    <img src={Config.assetsBaseUrl + item.Image.URL} alt={item.Title} />
                    }
                </div>
                <div className="action">
                    <span className="price">{item.Price}</span>
                    <button onClick={() => this.addItem(item)}>Add +</button>
                </div>
            </div>
        );
    }

    addItem(item) {

        let found = false;
        this.state.order.items.forEach((i) => {
            if (i.Title === item.Title && i.Price === item.Price) {
                found = i;
            }
        });
        if (found) {
            found.Qty++;
        }
        if (!found) {
            this.state.order.items.push({
                Title: item.Title,
                Price: item.Price,
                Qty: 1
            });
        }
        this.setState({order: this.state.order});
        this.props.onChange(this.state.order);
    }
}

export default MenuItem;