import React from 'react';
import Actions from '../../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../../stores/ProductStore';
import FollowingCard from './FollowingCard';

@connectToStores
class FollowingList extends React.Component{
	constructor(){
		super();
	}

  static getStores() {
    return [ProductStore];
  };

  static getPropsFromStores() {
    return ProductStore.getState();
  };

  componentDidMount() {
    Actions.getFollowing(this.props.params.id); 
  }  

  componentWillUnMount() {
    console.log('followinglist', this);
  } 

  renderFollowing() {
    var followingArr = this.props.following.slice(0).reverse();
    return(
      <section className="profile-content-area">
        <div className="row profile-content-items">
          {
            this.props.following
            ?
            followingArr.map(function(item,idx){
              return <FollowingCard key={idx} pid={item.key} {...item}/>
            })
            :
            null
          }
        </div>  
      </section>  
    );
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
            (this.props.following.length > 0)
            ?
            this.renderFollowing()
            :
            this.renderEmptyPost()
          }
      </section>  
    ) 
  }
}

export default FollowingList;
