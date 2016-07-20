import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

import FollowerCard from './FollowerCard';


import {Link} from 'react-router';
import NavLink from '../Navbar/NavLink';

@connectToStores
class Profile extends React.Component{
	constructor(props){
		super(props);
		this.toggleProfileDesc = this.toggleProfileDesc.bind(this);
	}

  static getStores() {
    return [ProductStore];
  };

  static getPropsFromStores() {
    return ProductStore.getState();
  };

	componentWillMount() {
    Actions.getProfiles(this.props.params.id);
    Actions.getPosts(this.props.params.id);
  }

	toggleProfileDesc = () => {
		this.props.showProfileDescription? Actions.toggleProfileInfo({showProfileDescription:false}) : Actions.toggleProfileInfo({showProfileDescription:true})
	};

  isActive = (value) => {
  	return 'profile-stat ' + ((value===this.props.selected) ? 'active' : null);
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
  			<a onClick={this.toggleProfileDesc} className={profileImgName}>
  				<span>{this.props.profiles ? this.props.profiles.name : null} </span>
  				{
  					this.props.showProfileDescription
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
  			<p>{this.props.profileDescription}</p>
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
    var postsUrl =('/profile/posts/' + this.props.user.id)
    var likesUrl =('/profile/likes/' + this.props.user.id)
    var followersUrl =('/profile/followers/' + this.props.user.id)

  	return (
	  	<section className={btnContainer}>
		  	<ul className={statArea}>
		  		<li className={inputClass}>		  	
		  			<div>{this.props.posts? this.props.posts.length: 0}</div>
		  			<NavLink to={postsUrl} className={activePost}>POSTS</NavLink>
		  		</li>
		  		<li className={inputClass}>			  		
		  			<div>{this.props.profiles.likes? this.props.profiles.likes.length: 0}</div>
		  			<NavLink to={likesUrl} className={activePost}>LIKES</NavLink>
		  		</li>
		  		<li className={inputClass}>		  			
		  			<div>{this.props.profiles.followers? this.props.profiles.followers.length: 0}</div>
		  			<NavLink to={followersUrl} className={activePost}>FOLLOWERS</NavLink>		  		
		  		</li>
		  	</ul>
	  	</section>	
  	)
  }

  renderProfilePage () {
  	return (
      <div className="container">
        {this.renderProfile()}
        {this.renderStats()}
        {
					this.props.showProfileDescription? this.renderProfileDescription() : null
				}
        {this.props.children}
      </div>
  	)
  }

  render() {
    return (
      <section>
      	{this.renderProfilePage()}
      </section>
    )
  }
}

export default Profile;