import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

@connectToStores
class Upvote extends React.Component {
  constructor() {
    super();
    this.handleVote = this.handleVote.bind(this);
  }
  
  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  handleVote = () => {
    var productObj = {
      name: this.props.name,
      media: this.props.media,
      description: this.props.description,
      link: this.props.link,
      maker: {
        avatar: this.props.maker.avatar,
        id: this.props.maker.id,
        name: this.props.maker.name
      },
      category: this.props.category,
      timestamp:Firebase.ServerValue.TIMESTAMP
    }
    var productOwnerId = (this.props.maker?this.props.maker.id:null);
    Actions.addVote(this.props.pid, this.props.user.id, productObj, productOwnerId);
  };

	render() {
    return (
      <a className="upvote-button" onClick={this.handleVote}>
        <span className="up-heart"><i className="fa fa-heart-o"></i></span>
        <span className="upcount">{this.props.upvote}</span>
      </a>
    );
	}
}


export default Upvote;