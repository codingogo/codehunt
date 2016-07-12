import React from 'react';

class ProfileCard extends React.Component{
	render() {
		return (
  		<section className="col-xs-12 col-sm-4 col-md-3 profile-product">
  			<table className="thumbnail">
			  	<tbody>
			  		<tr>
			  			<td className="profile-product-img"><img src={this.props.user ? this.props.user.avatar : null} alt=""/></td>
				  		<td className="profile-product-title" colSpan="2">{this.props.title}</td>
			  		</tr>
			  		<tr>
			  			<td>
			  				<span className="btn-xs btn btn-default profile-product-btn"><i className="fa fa-heart" ariaHidden="true"></i><span>&nbsp;{this.props.likes}</span></span>
			  			</td>
			  			<td>
			  				<span className="btn-xs btn btn-default profile-product-btn"><i className="fa fa-lg fa-caret-up" ariaHidden="true"></i><span>&nbsp;{this.props.upvotes}</span></span>
			  			</td>
			  		</tr>
			  		<tr>	
			  			<td className="profile-product-description" colSpan="3">{this.props.description}</td>
			  		</tr>
			  	</tbody>	
	  		</table>	
  		</section>
		)
	}
}

export default ProfileCard;