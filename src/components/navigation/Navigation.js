import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import query from "../../graphql/queries/Pages";
import './Navigation.scss';

class Navigation extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="main-menu">
                <nav>
                <ul>
                    {this.renderMenu()}
                </ul>
                </nav>
            </div>
        );
    }

    renderMenu() {
        return this.props.data.readPages.map((page) => {
          return (
            <li key={page.ID}>
                <Link to={'/' + page.URLSegment + '/'}>{page.MenuTitle}</Link>
            </li>
          );
        });
    }
}

export default graphql(query)(Navigation);