import alt from '../alt';
import Actions from '../actions';
import {decorate, bind} from 'alt-utils/lib/decorators';

@decorate(alt)
class ProductStore {
	constructor(){
		this.state = {
			user: null,
			products: [],
			comments: [],
			profiles: [],
			posts: [],
			likes: [],
			productCategory: '',
			showProfileDescription: false, 
			showProfileNav: false,

			title: 'ajksf jaksdlf asjd asfjdsfjkjskafd',
			commentNums: 57,
			upvotes: 234234,
			profileDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates dolores unde omnis tempore distinctio sit molestiae, optio obcaecati voluptatem ipsa dignissimos, consequuntur fugiat, totam inventore aliquid deserunt quae. Ea, non!'
		};
	}

	@bind(Actions.login, Actions.initSession, Actions.logout)
	setUser(user) { 
		this.setState({user: user});
	}

	@bind(Actions.getProducts)
	getProducts(products) {
		this.setState({products: products});
	}

	@bind(Actions.getComments)
	getComments(comments) {
		this.setState({comments: comments});
	}

	@bind(Actions.getProfiles)
	getProfiles(profiles) {
		this.setState({profiles: profiles});
	}

	@bind(Actions.getPosts)
	getPosts(posts) {
		this.setState({posts: posts});
	}

	@bind(Actions.getLikes)
	getLikes(likes) {
		this.setState({likes: likes});
	}	

	@bind(Actions.updateCategory)
	updateCategory(productCategory){
    this.setState(productCategory);
  }

  @bind(Actions.toggleProfileInfo)
  toggleProfileInfo(showProfileDesc){
  	this.setState(showProfileDesc);
  }

  @bind(Actions.initializeProfileStats)
  initializeProfileStats(initObj){
  	this.setState(initObj);
  }

  @bind(Actions.showPopup)
  showPopup(popupStatus){
  	this.setState(popupStatus);
  }

  @bind(Actions.hidePopup)
  hidePopup(popupStatus){
  	this.setState(popupStatus);
  }  
}

export default alt.createStore(ProductStore);