import React from 'react';
import NavLink from '../../Navbar/NavLink';

class FollowerCard extends React.Component{
	render() {
		var productClass="col-xs-6 col-sm-3 col-md-2 profile-product";
		var imgClass="profile-product-img";
		var imgUrl = this.props.media? this.props.media : "./img/delb.png";
		var btnClass="btn-sm btn btn-default profile-product-btn";
		var titleClass="profile-product-title";
		var descriptionClass="profile-product-description";
		var userIcon = "fa fa-user";
		var plusIcon = "fa fa-plus";
    var imgMain = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      cursor: 'pointer'
    };	
    var followerUrl =('/profile/posts/'+this.props.pid);	
    var center = "center-align";
		return (
			<section className={productClass}>
	  		<NavLink to={followerUrl}>
	  			<div className="thumbnail">
	  				<div className="col-xs-12">
	  					<div className={imgClass} style={imgMain}></div>
	  				</div>
	  				<div className="col-xs-12">
	  					<div className={titleClass}>{this.props.name}</div>
	  				</div>
	  			</div>
	  		</NavLink>
  		</section>
		)
	}
}

export default FollowerCard;