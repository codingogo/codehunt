import React from 'react';

class FollowerCard extends React.Component{
	render() {
		var productClass="col-xs-12 col-sm-4 col-md-3 profile-product";
		var imgClass="profile-product-img";
		var btnClass="btn-sm btn btn-default profile-product-btn";
		var titleClass="profile-product-title";
		var descriptionClass="profile-product-description";
		var userIcon = "fa fa-user";
		var plusIcon = "fa fa-plus";

		return (
  		<section className={productClass}>
  			<table className="thumbnail">
			  	<tbody>
			  		<tr>
			  			<td className={imgClass}>
			  				<img src={this.props.user ? this.props.user.avatar : null} alt=""/>
			  			</td>
				  		<td className={titleClass} colSpan="2">{this.props.title}</td>
			  		</tr>
			  		<tr>
			  			<td>
			  				<span className={btnClass}>
			  					<i className={userIcon} ariaHidden="true"></i>
			  					<span>&nbsp;{this.props.upvotes}</span>
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