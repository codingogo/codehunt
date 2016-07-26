import React from 'react';
import ReactDOM from 'react-dom';
import Actions from '../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import HomePage from './HomePage';
import Navbar from './Navbar';
import ProductStore from '../stores/ProductStore';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Profile from './Profile/Profile';
import PostList from './Profile/Posts/PostList';
import LikeList from './Profile/Likes/LikeList';
import FollowerList from './Profile/Followers/FollowerList';
import FollowingList from './Profile/Following/FollowingList';


@connectToStores
class App extends React.Component {
  constructor() {
    super();
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  componentWillMount() {
    Actions.initSession();
    hashHistory.listen(function(ev) {
      if(ev.pathname.length > 2){
        Actions.getUsers(ev.pathname.split('/').pop());
      }
    });
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
      <Route path="/profile" component={Profile}>
        <Route path="/profile/posts/:id" component={PostList}/>
        <Route path="/profile/likes/:id" component={LikeList}/>
        <Route path="/profile/followers/:id" component={FollowerList}/>
        <Route path="/profile/following/:id" component={FollowingList}/>
      </Route>
    </Route>
  </Router>
  ), document.getElementById('root'));
