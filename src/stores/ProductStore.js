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
			productCategory: '',
			showProfileDescription: false, 

						title: 'ajksf jaksdlf asjd asfjdsfjkjskafd',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit vel magni aliquid rerum ipsa ea placeat, quo. Atque dolores blanditiis voluptatum reprehenderit tenetur quam, provident sunt tempore, eius, a repellat?',
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

	@bind(Actions.updateCategory)
	updateCategory(productCategory){
    this.setState(productCategory);
  }

  @bind(Actions.toggleProfileInfo)
  toggleProfileInfo(showProfileDesc){
  	this.setState(showProfileDesc);
  }
}

export default alt.createStore(ProductStore);