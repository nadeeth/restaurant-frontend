import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import './Menu.scss';

class Menu extends Component {

    renderMenu() {
        return this.props.data.readPages.map((page) => {
            return (<li key={page.ID}><a href={page.URLSegment}>{page.MenuTitle}</a></li>);
        });
    }

    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }
        return (
            <div className="main-menu">
                <ul>
                    {this.renderMenu()}
                </ul>
            </div>
        );
    }
}

const query = gql`
    query {
        readPages(ShowInMenus: true) {
            MenuTitle
            ID
            URLSegment
        }
    }
`;

export default graphql(query)(Menu);