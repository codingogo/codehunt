import React from 'react';

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

		return (
  		<section className={productClass}>
  			<table className="thumbnail">
			  	<tbody>
			  		<tr>
			  			<td className={imgClass} style={imgMain}>
			  			</td>
				  		<td className={titleClass} colSpan="2">{this.props.name}</td>
			  		</tr>
			  		<tr>
			  			<td>
			  				<span className={btnClass}>
			  					<i className={userIcon} ariaHidden="true"></i>
			  					<span>&nbsp;</span>
			  				</span>
			  			</td>
			  			<td>
			  				<span className={btnClass}>
				  				<i className={plusIcon} ariaHidden="true"></i>
				  				<span>&nbsp;Follow</span>
			  				</span>
			  			</td>
			  		</tr>
			  		<tr>	
			  			<td className={descriptionClass} colSpan="3">{this.props.description}</td>
			  		</tr>
			  	</tbody>	
	  		</table>	
  		</section>
		)
	}
}

export default FollowerCard;