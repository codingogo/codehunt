import React from 'react';
import Actions from '../../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../../stores/ProductStore';

import {Link} from 'react-router';
import LikeCard from './LikeCard';

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

  componentWillMount() {
    Actions.getLikes(this.props.params.id);
  }

  renderLikeList() {
    var likeArr = this.props.likes.slice(0).reverse();
    return (
      <section className="profile-content-area">
        <ul className="row profile-content-items">
            {
              this.props.likes 
              ?
              likeArr.map(function(item,idx){
                return <LikeCard key={idx} pid={item.key} {...item}/>
              })
              :
              null
            }
        </ul> 
      </section>
    )    
  }

  renderEmptyLike () {
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
          (this.props.likes.length > 0)
          ?
          this.renderLikeList()
          :
          this.renderEmptyLike()
        } 
      </section>
    )
  }
}

export default LikeList;