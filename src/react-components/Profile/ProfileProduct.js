import React from 'react';

class ProfileProduct extends React.Component{
	render() {
		return (
  		<section className="col-xs-12 col-sm-4 col-md-3 profile-product">
  			<table className="thumbnail">
			  	<tbody>
			  		<tr>
			  			<td className="profile-product-img"><img src={this.props.user ? this.props.user.avatar : null} alt=""/></td>
				  		<td className="profile-product-title" colSpan="2">Ti ajsdkfj ajsdfka tlej asjdkfal sfjkla sd</td>
			  		</tr>
			  		<tr>
			  			<td>
			  				<span className="btn-xs btn btn-default profile-product-btn"><i className="fa fa-heart" ariaHidden="true"></i><span>&nbsp;432442</span></span>
			  			</td>
			  			<td>
			  				<span className="btn-xs btn btn-default profile-product-btn"><i className="fa fa-lg fa-caret-up" ariaHidden="true"></i><span>&nbsp;43242</span></span>
			  			</td>
			  		</tr>
			  		<tr>	
			  			<td className="profile-product-description" colSpan="3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit ut, voluptates hic est. Et amet voluptates iure adipisci magni eum temporibus quidem consequuntur, odit aspernatur dolorem officiis at, delectus debitis!</td>
			  		</tr>
			  	</tbody>	
	  		</table>	

	  		<h1>{this.props.params.repoName}</h1>
  		</section>
		)
	}
}

export default ProfileProduct;