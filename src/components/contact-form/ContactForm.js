import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
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
                {this.success()}
                {this.error()}
                <label>
                    Name:
                    <input
                        name="name"
                        type="text"
                        required
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Email:
                    <input
                        name="email"
                        type="email"
                        required
                        value={this.state.email}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Phone:
                    <input
                        name="phone"
                        type="tel"
                        required
                        value={this.state.phone}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Messege:
                    <textarea name="messege" required value={this.state.messege} onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

const mutation = gql`
    mutation($email: String!, $name: String, $phone: String, $message: String) {
        createEnquiry (
            Email: $email, 
            Name: $name,
            Phone: $phone,
            Message: $message
        ) {
            ID
            Email
            Name
            Phone
            Message
        }
    }
`;

export default graphql(mutation)(ContactForm);