import React from 'react';
import LoginPopup from './LoginPopup';
import PostPopup from './PostPopup';
import SideNav from './SideNav';

import Menu from 'react-motion-menu';


class Navbar extends React.Component {
  constructor(){
    super();
    this.state = {
      popupStatus: false,
      menu1: {isOpen: false}
    }
  }

  handleOnOpen(name){
    this.setState({[name] : {isOpen: true}});
    console.log('open');
  }

  handleOnClose(name){
    this.setState({[name] : {isOpen: false}});
    console.log('close');
  }

  showPopup = () => {
    this.setState({popupStatus: true});
  };

  hidePopup = () => {
    this.setState({popupStatus: false});
  };

  renderProductSearch(){
    return(
      <section className="product-search-box">
        <div className="input-group">
          <input className="product-search" placeholder="search"/>
          <span className="input-group-btn">
            <button className="btn btn-default product-search-btn"><i className="fa fa-search" aria-hidden="true"></i></button>
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
    return (
      <div>
        <Menu
          name="menu1"
          direction="vertical"
          onOpen={this.handleOnOpen.bind(this)}
          onClose={this.handleOnClose.bind(this)}
          distance={50}
          width={45}
          height={45}
          y={-13}
          x={-20}
          customStyle={{
            color: "#555",
            textAlign:"center",
            lineHeight:"45px",
            backgroundColor: "#fff",
            border: "1px solid #fefefe",
            borderRadius: "50%"
          }}
          >
          <span><i className={this.state.menu1.isOpen ? "fa fa-times fa-lg" : "fa fa-bars fa-lg"}></i></span> 
          <a href="#"><i className="fa fa-home fa-lg"></i></a>  
          <a href="#"><i className="fa fa-heart fa-lg"></i></a> 
          <a href="#"><i className="fa fa-user fa-lg"></i></a> 
        </Menu>
      </div>
    );
  }

  renderUser() {
    return (
      <section className="right-side">
        {
          this.props.user
          ?
          // Display Post link here
          <section>

            {this.renderMenuBtn()}

            <span>
              <a href="#" onClick={this.showPopup} className="login-btn"><i className="fa fa-plus fa-lg"></i></a>
            </span>
            <PostPopup status={this.state.popupStatus} hidePopup={this.hidePopup}/>
          </section>
          :
          // Display Login link here
          <section>
            <a href="#" onClick={this.showPopup} className="login-btn">Login</a>
            <LoginPopup status={this.state.popupStatus} hidePopup={this.hidePopup}/>
          </section>
        }
      </section>
    );
  }

  renderToggleNav() {
    return (    
      <section className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header row"> 
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
            </button>

            <a className="navbar-brand" href="/">{this.renderLogo()}</a>
            <span className="nav-list-search">{this.renderProductSearch()}</span>       
          </div> 
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-list-item">{this.renderUser()}</li>
            </ul>  
          </div>
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