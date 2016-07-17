import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

import LikeCard from './LikeCard';
import {Link} from 'react-router';

@connectToStores
class LikeList extends React.Component{
	constructor(){
		super();
	}

  static getStores() {
    return [ProductStore];
  };

  static getPropsFromStores() {
    return ProductStore.getState();
  };

  renderLikes () {
  	return (
  		<LikeCard 
  		  title={this.props.title}
  		  description={this.props.description}
  			likes={this.props.likes}
  			upvotes={this.props.upvotes}
  			{...this.props}/>		
  	)
  }

	render() {
		return (	
  		<section className="profile-content-area">
	  		<div className="row profile-content-items">
		  		{this.renderLikes()}
		  		{this.renderLikes()}
		  		{this.renderLikes()}
		  	</div>	
  		</section>	
		)	
	}
}

export default LikeList;