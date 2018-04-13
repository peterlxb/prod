import React,{ Component } from 'react';
import {Switch ,withRouter,Redirect,Route} from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Header from './Header/Header';
import Landing from './Landing/Landing';
import Surveys from './Surveys/Surveys';

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }



  render(){

    let routes = (
        <Switch>
          <Route path="/surveys" component={Surveys} />
          <Route path="/" exact component={Landing} />
          <Redirect to="/" />
        </Switch>
    );

    return (
      <div className="container">
        <div>
          <Header />
          {routes}
        </div>
      </div>
    )
  }
}

export default withRouter(connect(null,actions)(App));
