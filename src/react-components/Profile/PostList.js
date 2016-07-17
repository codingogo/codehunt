import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

import PostCard from './PostCard';
import {Link} from 'react-router';

@connectToStores
class PostList extends React.Component{
	constructor(){
		super();
	}

  static getStores() {
    return [ProductStore];
  };

  static getPropsFromStores() {
    return ProductStore.getState();
  };

  renderPostCard() {
  	return(
  		<PostCard
  			title={this.props.title}
  		  description={this.props.description}
  			commentNums={this.props.commentNums}
  			upvotes={this.props.upvotes}
  			{...this.props}/>
  	)
  }

  renderPosts() {
  	return (
  		<section className="profile-content-area">
	  		<div className="row profile-content-items">
	  			{this.renderPostCard()}
	  			{this.renderPostCard()}
	  			{this.renderPostCard()}
	  			{this.renderPostCard()}
	  			{this.renderPostCard()}
	  		</div>	
  		</section>
  	)
  }

	render() {
		return (	
			<div>
				{this.renderPosts()}
			</div>
		)	
	}
}

export default PostList;