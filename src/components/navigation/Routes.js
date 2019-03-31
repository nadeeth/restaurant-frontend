import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { graphql } from "react-apollo";
import query from "../../graphql/queries/Pages";
import Config from "../../config/Config";
import './Routes.scss';

class Routes extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                {this.renderRoutes()}
                <Route path='/' exact component={Config.pages.HomePage}></Route>
            </div>
        );
    }

    renderRoutes() {
        return this.props.data.readPages.map((page) => {
            return (
                <Route key={page.ID} path={'/' + page.URLSegment + '/'} component={Config.pages[page.ClassName]} />
            );
        });
    }
}

export default graphql(query)(Routes); 