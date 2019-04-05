import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { graphql } from "react-apollo";
import query from "../../graphql/queries/Navigation";
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
            </nav>
        );
    }

    renderMenu() {
        return this.props.data.readPages.map((page) => {
          return (
            <li key={page.ID}>
                <NavLink activeClassName="active" to={'/' + page.URLSegment + '/'}>{page.MenuTitle}</NavLink>
            </li>
          );
        });
    }
}

export default graphql(query)(Navigation);