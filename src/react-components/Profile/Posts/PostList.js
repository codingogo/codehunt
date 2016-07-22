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
    Actions.getProfiles(this.props.params.id);
    Actions.getPosts(this.props.params.id);
    Actions.getLikes(this.props.params.id);  
  }  

  renderPostList() {
    var postArr = this.props.posts.slice(0).reverse();
    return (
      <section className="profile-content-area">
        <ul className="row profile-content-items">
            {
              this.props.posts 
              ?
              postArr.map(function(item,idx){
                return <PostCard key={idx} pid={item.key} {...item}/>
              })
              :
              null
            }
        </ul> 
      </section>
    )    
  }

  renderEmptyPost () {
    return (
      <section className="profile-content-area">
        <div className="row profile-content-items empty-post">
          <h1 className="empty-post-heading">Pretty empty here...</h1>
        </div>
      </section>
    )
  }

  render() {
  	return (
  		<section>
        {
          (this.props.posts.length > 0)
          ?
          this.renderPostList()
          :
          this.renderEmptyPost()
        } 
      </section>
  	)
  }
}

export default PostList;