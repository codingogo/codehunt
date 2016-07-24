import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

@connectToStores
class Comment extends React.Component {
  
  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

	render() {
    return (
      <a className="comment-button">
        <span className="comment-bubble"><i className="fa fa-comment-o"></i></span>
        <span className="comment-count">{this.props.commentCount?this.props.commentCount:0}</span>
      </a>
    );
	}
}


export default Comment;