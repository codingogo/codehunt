import React from 'react';

class PostCard extends React.Component{
	render() {
		var imgClass = "postcard-img width-full"
		var imgUrl = this.props.user? this.props.user.avatar: "./img/delb.png";
		var imgStyle = {
	    backgroundImage: 'url(' + imgUrl + ')',
	    backgroundSize: 'cover'
	  }
	  var postcardClass="col-xs-6 col-sm-4 col-md-3 postcard";
	  var btnClass = "btn-sm btn btn-default width-half postcard-btn";
	  var postcardTitleClass="width-full postcard-title";

		return (
  		<section className={postcardClass}>
	  		<div className={imgClass} style={imgStyle}></div>
	  		<div className={postcardTitleClass}>
	  			{
	  				(this.props.title.length > 27)?
	  				this.props.title.substring(0,27)+'..':
	  				this.props.title
	  			}
	  		</div>	  			
	  		<div className="width-full">
					<span className={btnClass}><i className="fa fa-lg fa-caret-up" ariaHidden="true"></i><span>&nbsp;{this.props.upvotes}</span></span>			
					<span className={btnClass}><i className="fa fa-comment" ariaHidden="true"></i><span>&nbsp;{this.props.commentNums}</span></span>
	  		</div>
  		</section>
		)
	}
}

export default PostCard;