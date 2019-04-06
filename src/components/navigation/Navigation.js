import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { graphql } from "react-apollo";
import query from "../../graphql/queries/Navigation";
import SocialLinks from "../social-links/SocialLinks";
import './Navigation.scss';

class Navigation extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        return (
            <nav className="top-nav">
                <ul>
                    {this.renderMenu()}
                </ul>
                <SocialLinks />
            </nav>
        );
    }

    renderMenu() {
        return this.props.data.readPages.map((page) => {
            if (page.ShowInMenus) {
                return (
                    <li key={page.ID}>
                        <NavLink activeClassName="active" to={'/' + page.URLSegment + '/'}>{page.MenuTitle}</NavLink>
                    </li>
                );
            }
            return '';
        });
    }
}

export default graphql(query)(Navigation);