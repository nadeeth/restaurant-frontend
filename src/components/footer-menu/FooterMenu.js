import React, { Component } from 'react';
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import query from '../../graphql/queries/Navigation';
import Loading from '../../components/loading/Loading';
import './FooterMenu.scss';

class FooterMenu extends Component {

    render() {

        if (this.props.data.loading) {
            return <Loading/>;
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