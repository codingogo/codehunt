import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Actions from '../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import HomePage from './HomePage';
import Navbar from './Navbar';
import ProductStore from '../stores/ProductStore';
import Profile from './Profile/Profile';

@connectToStores
class App extends React.Component {
  constructor() {
    super();
    Actions.initSession();
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  render() {
    return (
      <section>
        <Navbar user={this.props.user}/>
        {this.props.children}
      </section>
    );
  }
}


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="profile" component={Profile}/>
    </Route>
  </Router>
  ), document.getElementById('root'));
