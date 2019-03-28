import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { graphql } from "react-apollo";
import query from "../../graphql/queries/Pages";
import Config from "../../Config";
import './Routes.scss';

class Routes extends Component {

    render() {

        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        return this.props.data.readPages.map((page) => {
            return (
                <div>
                    <Route path='/'>
                        <Redirect to="/home/" />
                    </Route>
                    <Route key={page.ID} path={'/' + page.URLSegment + '/'} component={Config.pages[page.ClassName]} />
                </div>
            );
        });
    }
}

export default graphql(query)(Routes); 