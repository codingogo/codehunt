import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

@connectToStores
class Upvote extends React.Component {
  
  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  handleVote = () => {
    Actions.addVote(this.props.pid, this.props.user.id);
  };

	render() {
    return (
      <a className="upvote-button" href="#" onClick={this.handleVote.bind(this)}>
        <span className="uparrow"><i className="fa fa-sort-asc"></i></span>
        <span>{this.props.upvote}</span>
      </a>
    );
	}
}


export default Upvote;