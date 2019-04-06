import React, { Component } from 'react';
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import query from '../../graphql/queries/Navigation';
import './FooterMenu.scss';

class FooterMenu extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        return (
            <nav className="footer-menu">
                {this.renderMenu()}
            </nav>
        );
    }

    renderMenu() {
        return this.props.data.readPages.map((page) => {
            if (page.ShowInFooterMenu) {
                return (
                    <Link key={page.ID} to={'/' + page.URLSegment + '/'}>{page.MenuTitle}</Link>
                );
            }
            return '';
        });
    }
}

export default graphql(query)(FooterMenu);