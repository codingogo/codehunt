import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

import FollowerCard from './FollowerCard';
import {Link} from 'react-router';

@connectToStores
class FollowerList extends React.Component{
	constructor(){
		super();
	}

  static getStores() {
    return [ProductStore];
  };

  static getPropsFromStores() {
    return ProductStore.getState();
  };

  renderFollowers() {
  	return(
  		<FollowerCard 
  		  title={this.props.title}
  		  description={this.props.description}
  			likes={this.props.likes}
  			upvotes={this.props.upvotes}
  			{...this.props}/>
  	);
  }

	render() {
		return (	
  		<section className="profile-content-area">
	  		<div className="row profile-content-items">
		  		{this.renderFollowers()}
		  	</div>	
  		</section>	
		)	
	}
}

export default FollowerList;
