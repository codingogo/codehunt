import React from 'react';
import Popup from '../Navbar/Popup';
import Upvote from './Upvote';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';

@connectToStores
class ProductPopup extends React.Component{
	constructor(){
		super();
	}

  static getStores() {
    return [ProductStore];
  };

  static getPropsFromStores() {
    return ProductStore.getState();
  };	

  shouldComponentUpdate(nextProps, nextState) {
  	if (nextProps.status && this.props.status != nextProps.status) {
  		Actions.getComments(this.props.pid);
  	}
  	return true;
  };

  windowOpen = () => {
    window.open(this.props.link,  'newwindow', 'width=300, height=450');
  }

	renderHeader() {
		return(
			<header style={{backgroundImage: 'url(' + this.props.media + ')'}}>
				<section className="header-shadow">
					<h2>{this.props.name? this.props.name.toUpperCase():null}</h2>
					<p>{this.props.description? this.props.description:null}</p>
					<section>
						<Upvote {...this.props} />
						<a className="getit-btn" onClick={this.windowOpen}>GO</a>
					</section>
				</section>
			</header>
		)
	}

	handleComment = (e) => {
		if(e.keyCode === 13 && e.target.value.length > 0){
			var comment = {
				content: e.target.value,
				name: this.props.user.name,
				avatar: this.props.user.avatar
			}
			var productOwnerId = (this.props.maker? this.props.maker.id: null);
			Actions.addComment(this.props.pid, comment, this.props.user.id, productOwnerId);
			e.target.value = null;
		}
	};

	renderBodyDiscussion(){
		return(
			<section className="discussion">
				<h2>Discussion</h2>
				{
					this.props.user
					?
					<section className="post-comment">
						<img className="medium-avatar" src={this.props.user.avatar}/>
						<input placeholder="What do you think?" onKeyUp={this.handleComment}/>
					</section>
					:
					null
				}
				{this.renderComments()}
			</section>
		);
	}

	renderBody() {
		return(
			<section className="product-popup-body">
				<main>
					{this.renderBodyDiscussion()}
				</main>
			</section>
		);
	}

	renderComments(){
		return(
			<ul className="comment-list">
				{
					this.props.comments.map(function(comment, idx){
						return (
							<li key={idx}>
								<img className="medium-avatar" src={comment.avatar}/>
								<section>
									<strong>{comment.name}</strong>
									<p>{comment.content}</p>
								</section>
							</li>
						);
					})
				}
			</ul>
		);
	}

	render(){
		return(
			<Popup {...this.props} style="product-popup">
				{this.renderHeader()}
				{this.renderBody()}
			</Popup>
		);
	}
}

export default ProductPopup;