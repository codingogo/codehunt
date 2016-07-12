import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';
import ProfileProduct from './ProfileProduct';

@connectToStores
class Profile extends React.Component{
	constructor(){
		super();
		this.state ={
			showProfileDescription: false, 
			showPosts: true,
			showLikes: false,
			showFollowers: false
		};
	}

  static getStores() {
    return [ProductStore];
  };

  static getPropsFromStores() {
    return ProductStore.getState();
  };

	handleClick = () => {
		if (this.state.showProfileDescription){
			this.setState({showProfileDescription: false});
		} else {
			this.setState({showProfileDescription: true});
		}
	};

	showPosts = () => {
		(this.state.showPosts === false) ?
			[this.setState({showPosts: true}),
			this.setState({showLikes: false}),
			this.setState({showFollowers: false})]
		: null
	}

	showLikes = () => {
		(this.state.showLikes === false) ?
			[this.setState({showPosts: false}),
			this.setState({showLikes: true}),
			this.setState({showFollowers: false})]
		: null
	}

	showFollows = () => {
		(this.state.showFollowers === false) ?
			[this.setState({showPosts: false}),
			this.setState({showLikes: false}),
			this.setState({showFollowers: true})]
			: null
	}

  renderUser() {
  	return (
  		<section className="profile-pg-img-container">
  			<img src={this.props.user ? this.props.user.avatar : null} alt="" className="profile-pg-img"/>
  			<a className="profile-pg-name" onClick={this.handleClick}>
  				<span>{this.props.user ? this.props.user.name : null} </span>
  				{
  					this.state.showProfileDescription
  					? 
  					<span><i className="fa fa-lg fa-caret-up" ariaHidden="true"></i></span>: 
  					<span><i className="fa fa-lg fa-caret-down" ariaHidden="true"></i></span>
  				}
  			</a>
  		</section>
  	)
  }

  renderUserDescription() {
  	return (
  		<section className="col-xs-12 profile-pg-description" ref="profileDescription">
  			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, illo, necessitatibus? Aliquid earum, molestias quas repellat numquam quam iste fugit, quidem incidunt voluptatem at modi iure ullam! Corporis, deleniti, nobis.</p>
  		</section>
  	);
  }

  renderStatistics() {
  	var inputClass = 'profile-stat';
  	return (
	  	<section className="main-btn-container">
		  	<ul className="col-xs-12 col-sm-8">
		  		<li className={inputClass}>
		  			<div>12</div>
		  			<a onClick={this.showPosts}>Posts</a>
		  		</li>
		  		<li className={inputClass}>
		  			<div>35</div>
		  			<a onClick={this.showLikes}>Likes</a>
		  		</li>
		  		<li className={inputClass}>
		  			<div>1982</div>
		  			<a onClick={this.showFollows}>Followers</a>
		  		</li>
		  	</ul>
	  	</section>	
  	)
  }

  renderProduct() {
  	return(
  		<ProfileProduct {...this.props}/>
  	);
  }

  renderContents() {
  	return (
  		<section className="profile-content-area">
	  		<div className="row profile-content-items">
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  			{this.renderProduct()}
	  		</div>	
  		</section>
  	)
  }

  renderLikes () {
  	return (
  		<section>
  			LIKES!!!!
  		</section>
  	)
  }

  renderFollowers () {
  	return (
  		<section>
  			FOLLOWERS!!!!
  		</section>
  	)
  }

	render() {
		return (	
			<div className="container">
				{this.renderUser()}
				{this.renderStatistics()}
				{
					this.state.showProfileDescription? this.renderUserDescription():null
				}
				{
					this.state.showPosts? this.renderContents() : null
				}
				{
					this.state.showLikes? this.renderLikes() : null
				}
				{ 
					this.state.showFollowers? this.renderFollowers() : null
				}
			</div>
		)	
	}
}

export default Profile;