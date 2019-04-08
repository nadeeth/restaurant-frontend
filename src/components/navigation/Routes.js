import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { graphql } from "react-apollo";
import query from "../../graphql/queries/Navigation";
import Loading from '../../components/loading/Loading';
import Config from "../../config/Config";
import './Routes.scss';

class Routes extends Component {

    render() {

        if (this.props.data.loading) {
            return <Loading/>;
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
            if (page.ShowInMenus || page.ShowInFooterMenu) {
                return (
                    <Route key={page.ID} path={'/' + page.URLSegment + '/'} component={Config.pages[page.ClassName]} />
                );
            }
            return '';
        });
    }
}

export default graphql(query)(Routes); 