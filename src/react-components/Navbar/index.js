import React from 'react';
import LoginPopup from './LoginPopup';

import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import {Link} from 'react-router';
import Menu from 'react-motion-menu';
import NavLink from './NavLink';
import PostPopup from './PostPopup';
import ProductStore from '../../stores/ProductStore';


@connectToStores
class Navbar extends React.Component {
  constructor(){
    super();
    this.state = {
      menu1: {isOpen: false},
      popupStatus: false    
    };
    this.initializeStats = this.initializeStats.bind(this);
    this.refreshStats = this.refreshStats.bind(this);
  }

  static getStores() {
    return [ProductStore];
  };

  static getPropsFromStores() {
    return ProductStore.getState();
  };

  handleOnOpen(name){
    this.setState({[name] : {isOpen: true}});
  }

  handleOnClose(name){
    this.setState({[name] : {isOpen: false}});
  }

  showPopup = () => {
    this.setState({popupStatus: true});
  }

  hidePopup = () => {
    this.setState({popupStatus: false});
  }

  handleLogout = (e) => {
    this.setState({menu1: {isOpen: false}});
    e.preventDefault();
    Actions.logout();
  }

  initializeStats = () => {
    var initObj = {
      posts: [],
      likes: [],
      followers: [],
      comments: []
    }
    Actions.initializeProfileStats(initObj);
  }

  refreshStats = () => {
    var statId = this.props.user.id;
    Actions.getPosts(statId);
    Actions.getLikes(statId);
    Actions.getFollowers(statId);
    Actions.getFollowing(statId);
    Actions.getUsers(statId);
  }

  renderProductSearch(){
    var searchBox="product-search-box";
    var search="product-search";
    var inputGroup="input-group";
    var inputBtn="input-group-btn";
    var searchBtn="btn btn-default product-search-btn";
    var searchIcon="fa fa-search";
    return(
      <section className={searchBox}>
        <div className={inputGroup}>
          <input className={search} placeholder="search"/>
          <span className={inputBtn}>
            <button className={searchBtn}><i className={searchIcon} aria-hidden="true"></i></button>
          </span>
        </div>
      </section>
    );
  }

  renderLogo() {
    return (
      <section>
        <img src="./img/delb.png" className="brand-logo"/><span className="brand-title">delb</span>
      </section>
    );
  }

  renderMenuBtn() {
    var userPostLink = ('/profile/posts/' + this.props.user.id);
    var userLikeLink = ('/profile/likes/' + this.props.user.id);
    var timeIcon = "fa fa-times fa-lg";
    var imgProfile = "profile-img";
    var userIcon = "fa fa-user fa-lg menu";
    var heartIcon = "fa fa-heart fa-lg menu";
    var cogIcon = "fa fa-cog fa-lg menu";
    var signoutIcon = "fa fa-sign-out fa-lg menu";
    return (
      <div>
        <Menu
          name="menu1"
          direction="vertical"
          onOpen={this.handleOnOpen.bind(this)}
          onClose={this.handleOnClose.bind(this)}
          distance={50}
          width={44}
          height={44}
          y={-13}
          x={-20}
          customStyle={{
            color: "#555",
            textAlign:"center",
            lineHeight:"45px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            boxShadow: "1px 1px 1px #ddd"
          }}>
          <span>
            {
              this.state.menu1.isOpen 
              ?
              <a><i className={timeIcon}></i></a> 
              :
              <img src={this.props.user.avatar} className={imgProfile} />
            }  
          </span>
          
          <Link to={userPostLink} onClick={this.refreshStats}><i className={userIcon}></i></Link>
          <Link to={userLikeLink} onClick={this.refreshStats}><i className={heartIcon}></i></Link>
          <Link to="/"><i className={cogIcon}></i></Link>
          <Link to="/" onClick={this.handleLogout}><i className={signoutIcon}></i></Link> 
        </Menu>
      </div>
    );
  }

  renderPost(){
    var pointer = "pointer";
    return(
      <span>
        <a className={pointer} onClick={this.showPopup} className="plus"><i className="fa fa-pencil-square-o"></i></a>
      </span>      
    );
  }

  renderUser() {
    var pointer = "pointer post-add";
    return (
      <section>
        {
          this.props.user
          ?
          // Post link 
          <section>
            <span className={pointer}>{this.renderPost()}</span>
            <span className="menu-motion-btn">{this.renderMenuBtn()}</span>
            <PostPopup user={this.props.user} status={this.state.popupStatus} hidePopup={this.hidePopup}/>
          </section>
          :
          // Login link
          <section>
            <a onClick={this.showPopup} className="login-btn">Login</a>
            <LoginPopup status={this.state.popupStatus} hidePopup={this.hidePopup}/>
          </section>
        }
      </section>
    );
  }

  renderToggleNav() {
    var nav="navbar";
    var navHeader="navbar-header";
    var navBrand="navbar-brand";
    var search="nav-list-search";
    var right="right-align";
    return (    
      <section className={nav}>
          <div className={navHeader}> 
            <Link to="/" className={navBrand} onClick={this.initializeStats}>{this.renderLogo()}</Link>
            <span className={search}>{this.renderProductSearch()}</span>
            <span className={right}>{this.renderUser()}</span>
        </div>           
      </section>
    );
  }

  render(){
    return (
      <section>
        <section>
          {this.renderToggleNav()} 
        </section>
      </section>
    );
  }
}

export default Navbar;