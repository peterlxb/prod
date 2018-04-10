import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="left brand-logo">
            FullStack
          </a>
          <ul id="nav-mobile" className="right">
            <li><a href="/">Login With GitHub</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header);
