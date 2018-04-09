import React,{ Component } from 'react';
import {BrowserRouter ,Route} from 'react-router-dom';

import Header from './Header/Header';

class App extends Component {
  render(){
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" component={Header} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
