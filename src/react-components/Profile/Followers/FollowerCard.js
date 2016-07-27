import React from 'react';
import {Link} from 'react-router';

class FollowerCard extends React.Component{
	render() {
		var productClass="col-xs-6 col-sm-3 col-md-2 profile-product";
		var imgClass="profile-product-img";
		var imgUrl = this.props.media? this.props.media : "./img/delb.png";
		var titleClass="profile-product-title";
    var imgMain = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      cursor: 'pointer'
    };	
    var followerUrl =('/profile/posts/'+this.props.pid);

		return (
			<section className={productClass}>
	  		<Link to={followerUrl} >
	  			<div className="thumbnail">
	  				<div className="col-xs-12">
	  					<div className={imgClass} style={imgMain}></div>
	  				</div>
	  				<div className="col-xs-12">
	  					<div className={titleClass}>{this.props.name}</div>
	  				</div>
	  			</div>
	  		</Link>
	  		{this.props.children}
  		</section>
		)
	}
}

export default FollowerCard;