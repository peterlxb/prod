import React,{ Component } from 'react';
import {BrowserRouter ,Route} from 'react-router-dom';
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
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" exact component={Surveys} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null,actions)(App);
