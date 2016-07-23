import React from 'react';
import NavLink from '../../Navbar/NavLink';

class FollowerCard extends React.Component{
	render() {
		var productClass="col-xs-12 col-sm-4 col-md-3 profile-product";
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
	  			<table className="thumbnail">
				  	<tbody>
				  		<tr>
				  			<td className={imgClass} style={imgMain} colSpan="2">
				  			</td>
				  			<td colSpan="1" className={center}>
				  				<span className={btnClass}>View</span>
				  			</td>
				  		</tr>
				  		<tr>
					  		<td className={titleClass} colSpan="3">{this.props.name}</td>
				  		</tr>
				  		<tr>	
				  			<td className={descriptionClass} colSpan="3">{this.props.description}</td>
				  		</tr>
				  	</tbody>	
		  		</table>	
	  		</NavLink>
  		</section>
		)
	}
}

export default FollowerCard;