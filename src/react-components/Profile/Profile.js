import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

import FollowerCard from './Followers/FollowerCard';
import FollowingCard from './Following/FollowingCard';
import NavLink from '../Navbar/NavLink';

@connectToStores
class Profile extends React.Component{
	constructor(){
		super();
    this.toggleProfileDesc = this.toggleProfileDesc.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnFollow = this.handleUnFollow.bind(this);
	}

  static getStores() {
    return [ProductStore];
  };

  static getPropsFromStores() {
    return ProductStore.getState();
  };

	componentDidMount() {
    if(this.props.params.id){
      Actions.getUsers(this.props.params.id);
      Actions.getPosts(this.props.params.id);
      Actions.getLikes(this.props.params.id);
      Actions.getFollowers(this.props.params.id);
      Actions.getFollowing(this.props.params.id);
    }
  }

  componentWillUnMount() {
    this.isActive;
    this.handleFollow;
    this.handleUnFollow;
    this.toggleProfileDesc;
    console.log('profile', this);
  }

	toggleProfileDesc = () => {
		this.props.showProfileDescription? Actions.toggleProfileInfo({showProfileDescription:false}) : Actions.toggleProfileInfo({showProfileDescription:true})
	};

  isActive = (value) => {
  	return 'profile-stat ' + ((value===this.props.selected) ? 'active' : null);
  };

  handleFollow = () => {
    var followedId = this.props.params.id;
    var followerId = this.props.user.id;
    var follower = {
      name: this.props.user.name,
      media: this.props.user.avatar,
      timestamp: Firebase.ServerValue.TIMESTAMP
    };
    var followedObj = this.props.profiles?this.props.profiles:null;
    Actions.addFollow(followedId, followerId, follower, followedObj);
  }

  handleUnFollow = () => {
    var followedId = this.props.params.id;
    var followerId = this.props.user.id;
    Actions.removeFollow(followedId, followerId);
  }

  renderFollowBtnMobile() {
    var followerArr = [];
    var userId;
    var i;
    var obj = this.props.followers;
    var followBtnMobile = "visible-xs btn btn-default follow-btn-mobile"

    for(i=0;i<obj.length; i++){
      followerArr.push(obj[i].key);
    }
    if(this.props.user !== null){
      userId = this.props.user.id;
    }

    return(
      <section>
        {
          (followerArr.indexOf(userId) > -1)
          ?
          <button className={followBtnMobile} onClick={this.handleUnFollow}>Unfollow</button>
          :
          <button className={followBtnMobile} onClick={this.handleFollow}>+ Follow</button>
        }
      </section>
    );
  }

  renderFollowBtnDesktop() {
    var obj = this.props.followers;
    var followerArr = [];
    var i;
    var userId;
    var followBtnDesktop = "hidden-xs btn btn-default follow-btn-desktop";

    for(i=0;i<obj.length; i++){
      followerArr.push(obj[i].key);
    }
    if(this.props.user !== null){
      userId = this.props.user.id;
    }

    return(
      <section>
        {
          (followerArr.indexOf(userId) > -1)
          ?
          <button className={followBtnDesktop} onClick={this.handleUnFollow}>Unfollow</button>
          :
          <button className={followBtnDesktop} onClick={this.handleFollow}>+ Follow</button>
        }
      </section>  
    );
  }

  renderProfile() {
  	var profileImgContainer="profile-pg-img-container";
  	var profileImg="profile-pg-img";
  	var profileImgName="profile-pg-name";
  	var caretUp="fa fa-lg fa-caret-up";
  	var caretDown="fa fa-lg fa-caret-down";
    var profileId = this.props.profiles.id;
    var userId = (this.props.user? this.props.user.id: null);
  
  	return (
    		<section className={profileImgContainer}>
    			<img src={this.props.profiles ? this.props.profiles.avatar : null} alt="" className={profileImg}/>
          {(profileId!==userId)?this.renderFollowBtnMobile():null}
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
    var mobileText = "icon-xs";
    var postsUrl ='/profile/posts/' + this.props.profiles.id;
    var likesUrl ='/profile/likes/' + this.props.profiles.id;
    var followersUrl =('/profile/followers/' + this.props.profiles.id);
    var followingUrl =('/profile/following/' + this.props.profiles.id);
    var profileId = this.props.profiles.id;
    var userId = (this.props.user? this.props.user.id: null);
  	return (
	  	<section className={btnContainer}>
		  	<ul className={statArea}>
		  		<li className={inputClass}>		  	
		  			<div className='stat-center'>{this.props.posts? this.props.posts.length: 0}</div>
		  			<NavLink to={postsUrl} className={activePost}>
              <span className={mobileText}>POSTS</span>
            </NavLink>
		  		</li>
		  		<li className={inputClass}>		  			
		  			<div className='stat-center'>{this.props.followers? this.props.followers.length: 0}</div>
		  			<NavLink to={followersUrl} className={activePost}>
              <span className={mobileText}>FOLLOWERS</span>
            </NavLink>	
		  		</li>
          <li className={inputClass}>           
            <div className='stat-center'>{this.props.following? this.props.following.length: 0}</div>
            <NavLink to={followingUrl} className={activePost}>
              <span className={mobileText}>FOLLOWING</span>
            </NavLink> 
          </li>
          <li className={inputClass}>           
            <div className='stat-center'>{this.props.likes? this.props.likes.length: 0}</div>
            <NavLink to={likesUrl} className={activePost}>
              <span className={mobileText}>LIKES</span>
            </NavLink>
          </li>          
          {(profileId!==userId)?this.renderFollowBtnDesktop():null}
		  	</ul>
	  	</section>	
  	)
  }

  render() {
    return (
      <section className="container">
        {this.renderProfile()}
        {this.renderStats()}
        {
          this.props.showProfileDescription
          ? 
          this.renderProfileDescription() 
          : 
          null
        }
        {this.props.children}
      </section>
    )
  }
}

export default Profile;