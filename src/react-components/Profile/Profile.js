import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

import FollowerCard from './FollowerCard';
import PostCard from './PostCard';

@connectToStores
class Profile extends React.Component{
	constructor(props){
		super(props);
		Actions.getProfiles(this.props.routeParams.id);
		this.state ={
			showProfileDescription: false, 
			showPosts: true,
			showLikes: false,
			showFollowers: false,
			title: 'ajksf jaksdlf asjd asfjdsfjkjskafd',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit vel magni aliquid rerum ipsa ea placeat, quo. Atque dolores blanditiis voluptatum reprehenderit tenetur quam, provident sunt tempore, eius, a repellat?',
			commentNums: 57,
			upvotes: 234234,
			profileDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates dolores unde omnis tempore distinctio sit molestiae, optio obcaecati voluptatem ipsa dignissimos, consequuntur fugiat, totam inventore aliquid deserunt quae. Ea, non!'
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
	};

	showLikes = () => {
		(this.state.showLikes === false) ?
			[this.setState({showPosts: false}),
			this.setState({showLikes: true}),
			this.setState({showFollowers: false})]
		: null
	};

	showFollows = () => {
		(this.state.showFollowers === false) ?
			[this.setState({showPosts: false}),
			this.setState({showLikes: false}),
			this.setState({showFollowers: true})]
			: null
	};

  isActive = (value) => {
  	return 'profile-stat ' + ((value===this.state.selected) ? 'active' : null);
  };

  renderProfile() {
  	var profileImgContainer="profile-pg-img-container";
  	var profileImg="profile-pg-img";
  	var profileImgName="profile-pg-name";
  	var caretUp="fa fa-lg fa-caret-up";
  	var caretDown="fa fa-lg fa-caret-down";
  	return (
  		<section className={profileImgContainer}>
  			<img src={this.props.profiles ? this.props.profiles.avatar : null} alt="" className={profileImg}/>
  			<a onClick={this.handleClick} className={profileImgName}>
  				<span>{this.props.profiles ? this.props.profiles.name : null} </span>
  				{
  					this.state.showProfileDescription
  					? 
  					<span><i className={caretUp} ariaHidden="true"></i></span>
  					: 
  					<span><i className={caretDown} ariaHidden="true"></i></span>
  				}
  			</a>
  		</section>
  	)
  }

  renderProfileDescription() {
  	var profileDesc="col-xs-12 profile-pg-description"
  	return (
  		<section className={profileDesc} ref="profileDescription">
  			<p>{this.state.profileDescription}</p>
  		</section>
  	);
  }

  renderStats() {
  	var inputClass = 'profile-stat';
    var activePost = '';
    var activeLike = '';
    var activeFollow = '';
    var statArea = 'stat-area col-xs-12 col-sm-8';
    var btnContainer = 'main-btn-container';

    if(this.state.showPosts){
    	activePost = 'active'
    } else if (this.state.showLikes){
    	activeLike = 'active'
    } else {
    	activeFollow = 'active'
    }

  	return (
	  	<section className={btnContainer}>
		  	<ul className={statArea}>
		  		<li className={inputClass}>		  	
		  			<div>{this.props.profiles.posts? this.props.profiles.posts.length: 0}</div>
		  			<a onClick={this.showPosts} className={activePost}>POSTS</a>
		  		</li>
		  		<li className={inputClass}>			  		
		  			<div>{this.props.profiles.likes? this.props.profiles.likes.length: 0}</div>
		  			<a onClick={this.showLikes} className={activeLike}>LIKES</a>
		  		</li>
		  		<li className={inputClass}>		  			
		  			<div>{this.props.profiles.followers? this.props.profiles.followers.length: 0}</div>
		  			<a onClick={this.showFollows} className={activeFollow}>FOLLOWERS</a>			  		
		  		</li>
		  	</ul>
	  	</section>	
  	)
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
		  		<PostCard 
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
				{this.renderProfile()}
				{this.renderStats()}
				{
					this.state.showProfileDescription? this.renderProfileDescription() : null
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