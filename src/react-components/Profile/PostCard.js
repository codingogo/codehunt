import React from 'react';

class PostCard extends React.Component{
	render() {
		return (
  		<section className="col-xs-6 col-sm-4 col-md-3 postcard">
	  		<img className="postcard-img width-full" src={this.props.user ? this.props.user.avatar : null} alt=""/>
	  		<div className="width-full postcard-title">
	  			{
	  				(this.props.title.length > 27)?
	  				this.props.title.substring(0,27)+'..':
	  				this.props.title
	  			}
	  		</div>	
  			
	  		<div className="width-full">
					<span className="btn-xs btn btn-default width-half"><i className="fa fa-heart" ariaHidden="true"></i><span>&nbsp;{this.props.likes}</span></span>			
					<span className="btn-xs btn btn-default width-half"><i className="fa fa-lg fa-caret-up" ariaHidden="true"></i><span>&nbsp;{this.props.upvotes}</span></span>
	  		</div>
  		</section>
		)
	}
}

export default PostCard;