import React from 'react';
import Actions from '../../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../../stores/ProductStore';
import FollowerCard from './FollowerCard';

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

  componentDidMount() {
    Actions.getFollowers(this.props.params.id); 
  }

  componentWillUnMount() {
    console.log('followerlist', this)
  }    

  renderFollowers() {
    var followerArr = this.props.followers.slice(0).reverse();
    return(
      <section className="profile-content-area">
        <div className="row profile-content-items">
          {
            this.props.followers
            ?
            followerArr.map(function(item,idx){
              return <FollowerCard key={idx} pid={item.key} {...item}/>
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
            (this.props.followers.length > 0)
            ?
            this.renderFollowers()
            :
            this.renderEmptyPost()
          }
      </section>  
    ) 
  }
}

export default FollowerList;
