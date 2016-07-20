import React from 'react';
import Actions from '../../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../../stores/ProductStore';

import {Link} from 'react-router';

import PostCard from './PostCard';

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

  componentWillMount() {
    Actions.getPosts(this.props.params.id);
  }

  render() {
  	return (
  		<section className="profile-content-area">
	  		<ul className="row profile-content-items">
          	{
              this.props.posts 
              ?
              this.props.posts.map(function(item,idx){
                return <PostCard key={idx} pid={item.key} {...item}/>
              })
              :
              null
            }
	  		</ul>	
  		</section>
  	)
  }
}

export default PostList;