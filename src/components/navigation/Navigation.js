import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { graphql } from "react-apollo";
import query from "../../graphql/queries/Navigation";
import SocialLinks from "../social-links/SocialLinks";
import Hamburger from "../../images/hamburger.svg";
import Close from "../../images/close.svg";
import Config from "../../config/Config";
import './Navigation.scss';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: Config.isMobile ? false : true
        }
    }

    render() {

        if (this.props.data.loading) {
            console.log('Loading navigation...');
            return '';
        }

        const displayToggle = {
            display: this.state.showMenu ? 'block' : 'none'
        }

        const displayHamburger = {
            display: this.state.showMenu ? 'none' : 'block'
        }

        return (
            <div className="top-nav-container">
                <nav className="top-nav" style={displayToggle}>
                    <img src={Close} onClick={() => this.showMenu(false)} className="close" alt="close" />
                    <ul>
                        {this.renderMenu()}
                    </ul>
                    <SocialLinks />
                </nav>
                <img style={displayHamburger} src={Hamburger} onClick={() => this.showMenu(true)} className="open" alt="open" />
            </div>
        );
    }

    renderMenu() {
        return this.props.data.readPages.map((page) => {
            if (page.ShowInMenus) {
                return (
                    <li key={page.ID}>
                        <NavLink onClick={() => this.showMenu(false)} activeClassName="active" to={'/' + page.URLSegment + '/'}>{page.MenuTitle}</NavLink>
                    </li>
                );
            }
            return '';
        });
    }

    showMenu(bool) {
        if (Config.isMobile) {
            this.setState({showMenu : bool });
        }
    }
}

export default graphql(query)(Navigation);