import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

import FollowerCard from './FollowerCard';
import PostCard from './PostCard';

@connectToStores
class Profile extends React.Component{
	constructor(){
		super();
		this.state ={
			showProfileDescription: false, 
			showPosts: true,
			showLikes: false,
			showFollowers: false,
			title: 'ajksf jaksdlf asjd asfjdsfjkjskafd',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit vel magni aliquid rerum ipsa ea placeat, quo. Atque dolores blanditiis voluptatum reprehenderit tenetur quam, provident sunt tempore, eius, a repellat?',
			likes: 1231,
			followers: 2324,
			commentNums: 57,
			upvotes: 234234,
			userDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates dolores unde omnis tempore distinctio sit molestiae, optio obcaecati voluptatem ipsa dignissimos, consequuntur fugiat, totam inventore aliquid deserunt quae. Ea, non!'
		};
	}

  static getStores() {
    return [ProductStore];
  };

  static getPropsFromStores() {
    return ProductStore.getState();
  };

	handleClick = () => {
		this.state.showProfileDescription
		?
		this.setState({showProfileDescription: false})
		:
		this.setState({showProfileDescription: true})
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
  			<p>{this.state.userDescription}</p>
  		</section>
  	);
  }

  isActive = (value) => {
  	return 'profile-stat ' + ((value===this.state.selected) ? 'active' : null);
  }

  renderStats() {
  	var inputClass = 'profile-stat';
    var activePost = '';
    var activeLike = '';
    var activeFollow = '';

    if(this.state.showPosts){
    	activePost = 'active'
    } else if (this.state.showLikes){
    	activeLike = 'active'
    } else {
    	activeFollow = 'active'
    }

  	return (
	  	<section className="main-btn-container">
		  	<ul className="stat-area col-xs-12 col-sm-8">
		  		<li className={inputClass}>		  	
		  			<div>12</div>
		  			<a onClick={this.showPosts} className={activePost} >Posts</a>
		  		</li>
		  		<li className={inputClass}>			  		
		  			<div>35</div>
		  			<a onClick={this.showLikes} className={activeLike}>Likes</a>
		  		</li>
		  		<li className={inputClass}>		  			
		  			<div>1982</div>
		  			<a onClick={this.showFollows} className={activeFollow}>Followers</a>			  		
		  		</li>
		  	</ul>
	  	</section>	
  	)
  }

  renderFollowerCard() {
  	return(
  		<FollowerCard 
  		  title={this.state.title}
  		  description={this.state.description}
  			likes={this.state.likes}
  			upvotes={this.state.upvotes}
  			{...this.props}/>
  	);
  }

  renderPostCard() {
  	return(
  		<PostCard
  			title={this.state.title}
  		  description={this.state.description}
  			commentNums={this.state.commentNums}
  			upvotes={this.state.upvotes}
  		{...this.props}/>
  	)
  }

  renderPosts() {
  	return (
  		<section className="profile-content-area">
	  		<div className="row profile-content-items">
	  			{this.renderPostCard()}
	  			{this.renderPostCard()}
	  			{this.renderPostCard()}
	  			{this.renderPostCard()}
	  			{this.renderPostCard()}
	  		</div>	
  		</section>
  	)
  }

  renderLikes () {
  	return (
  		<section className="profile-content-area">
	  		<div className="row profile-content-items">
		  		<FollowerCard 
		  		  title={this.state.title}
		  		  description={this.state.description}
		  			commentNumbs={this.state.commentNumbs}
		  			upvotes={this.state.upvotes}
		  			{...this.props}/>
		  	</div>	
  		</section>			
  	)
  }

  renderFollowers () {
  	return (
  		<section className="profile-content-area">
	  		<div className="row profile-content-items">
		  		{this.renderFollowerCard()}
		 			{this.renderFollowerCard()}
		 			{this.renderFollowerCard()}
		 			{this.renderFollowerCard()}
		 			{this.renderFollowerCard()}
		 			{this.renderFollowerCard()}
		 			{this.renderFollowerCard()}
		  	</div>	
  		</section>	
  	)
  }

	render() {
		return (	
			<div className="container">
				{this.renderUser()}
				{this.renderStats()}
				{
					this.state.showProfileDescription? this.renderUserDescription():null
				}
				{
					this.state.showPosts? this.renderPosts() : null
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