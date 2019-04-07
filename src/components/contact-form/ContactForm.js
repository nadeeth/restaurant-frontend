import React, { Component } from 'react';
import { graphql } from "react-apollo";
import mutation from '../../graphql/mutations/CreateEnquiry';
import './ContactForm.scss';

class ContactForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            messege: '',
            success: '',
            error: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.setState({success: 'Sending...'});
        event.preventDefault();
        this.props.mutate({
            variables: {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                message: this.state.messege
            }
        })
        .then(() => this.setState({success: 'Messege sent.'}))
        .catch(() => this.setState({error: 'Error sending message. Please try again later.'}));
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

        return (
            <form onSubmit={this.handleSubmit} className="contact-form">
                <div className="info">
                    {this.success()}
                    {this.error()}
                </div>
                <div className="name">
                    <label for="name">Name</label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        required
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                </div>
                <div className="phone">
                    <label for="phone">Phone</label>
                    <input
                        name="phone"
                        id="phone"
                        type="tel"
                        required
                        value={this.state.phone}
                        onChange={this.handleInputChange} />
                </div>
                <div className="email">
                    <label for="email">Email</label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        required
                        value={this.state.email}
                        onChange={this.handleInputChange} />
                </div>
                <div className="message">
                    <label for="message">Messege</label>
                    <textarea name="messege" id="messege" required value={this.state.messege} onChange={this.handleInputChange} />
                </div>
                <div className="action">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

export default graphql(mutation)(ContactForm);