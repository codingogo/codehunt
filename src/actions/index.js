import alt from '../alt';
import Firebase from 'firebase';
import _ from 'lodash';

class Actions {

	initSession(){
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com');
			var authData = firebaseRef.getAuth();
			var user;

			if(authData){
				user = {
	      	id: authData.facebook.id,
	      	name: authData.facebook.displayName,
	      	avatar: authData.facebook.profileImageURL,
	      	locale: authData.facebook.cachedUserProfile.locale,
	      	link: authData.facebook.cachedUserProfile.link,
	      	picture: authData.facebook.cachedUserProfile.picture
	      }
			} else {
				user = null;
			}
			setTimeout(() => dispatch(user));
		}
	}

	login(){
		return(dispatch) => {
	    var firebaseRef = new Firebase('https://delb.firebaseio.com');
	    firebaseRef.authWithOAuthPopup('facebook', (error, authData) => {
	      if(error){
	      	return;
	      }
	      var user = {
	      	id: authData.facebook.id,
	      	name: authData.facebook.displayName,
	      	avatar: authData.facebook.profileImageURL,
	      	locale: authData.facebook.cachedUserProfile.locale,
	      	link: authData.facebook.cachedUserProfile.link,
	      	picture: authData.facebook.cachedUserProfile.picture
	      }
	      firebaseRef.child("users").child(authData.facebook.id).set(user);
	      dispatch(user); 

	      var profile = {
	      	id: authData.facebook.id,
	      	name: authData.facebook.displayName,
	      	avatar: authData.facebook.profileImageURL,
	      	locale: authData.facebook.cachedUserProfile.locale,
	      	link: authData.facebook.cachedUserProfile.link,
	      	picture: authData.facebook.cachedUserProfile.picture
	      }
	      firebaseRef.child("profiles").child(authData.facebook.id).set(profile);
	      dispatch(profile);
	    });		
		}
	}

	addComment(productId, comment){
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com/comments');
			firebaseRef.child(productId).push(comment);
		}
	}

	logout() {
		return(dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com');
			firebaseRef.unauth();
			setTimeout(() => dispatch(null));
		}
	}	

	getProducts() {
		return(dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com/products');
			firebaseRef.on('value', (snapshot) => {
				var productsValue = snapshot.val();
				var products = _(productsValue).keys().map((productKey) => {
					var item =_.clone(productsValue[productKey]);
					item.key = productKey;
					return item;
				})
				.value();
				dispatch(products);
			});
		}
	}

	addProduct(product){
		var ref = new Firebase('https://delb.firebaseio.com');
		var newPostRef = ref.child('products').push(product);
		var newPostKey = newPostRef.key();
		var updatedPostData = {};
		var userId = product.maker.id;
		updatedPostData["users/"+ userId + "/posts/" + newPostKey] = true;
		updatedPostData["posts/"+ userId + '/' + newPostKey] = product;
		ref.update(updatedPostData, function(error){
			if(error){
				console.log("Error updating data:", error);
			}
		})
	}

	addVote(productId, userId, productObj) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com');
			var voteRef = firebaseRef.child('votes').child(productId).child(userId);
			voteRef.on('value', (snapshot) => {
				if(snapshot.val() == null){
					voteRef.set(true);
					firebaseRef = firebaseRef.child('products').child(productId).child('upvote');
					var vote = 0;
					firebaseRef.on('value', (snapshot)=> {
						vote = snapshot.val();
					});
					firebaseRef.set(vote+1);
				}
			});
			// save to Profile Likes
			firebaseRef.child('likes').child(userId).child(productId).set(productObj);
		}
	}

	addComment(productId, comment){
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com/comments');
			firebaseRef.child(productId).push(comment);
		}
	}

	getComments(productId) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com/comments');
			firebaseRef.child(productId).on('value', (snapshot) => {
				var commentsVal = snapshot.val();
				var comments = _(commentsVal).keys().map((commentKey) => {
					var item = _.clone(commentsVal[commentKey]);
					item.key = commentKey;
					return item;
				})
				.value();
				dispatch(comments);
			});
		}
	}

	getPosts(userId) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com/posts');
			firebaseRef.child(userId).on('value', (snapshot) => {
				var postsVal = snapshot.val();
				var posts =  _(postsVal).keys().map((postKey) => {
					var item =_.clone(postsVal[postKey]);
					item.key = postKey;
					return item;
				})
				.value();
				dispatch(posts);
			});
		}
	}

	getLikes(userId) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com/likes');
			firebaseRef.child(userId).on('value', (snapshot) => {
				var likesVal = snapshot.val();
				var likes = _(likesVal).keys().map((likeKey) => {
					var item = _.clone(likesVal[likeKey]);
					item.key = likeKey;
					return item;
				})
				.value();
				dispatch(likes);
			});
		}
	}

	getProfiles(userId) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com/profiles');
			firebaseRef.child(userId).on('value', (snapshot) => {
				var profilesVal = snapshot.val();
				dispatch(profilesVal);
			});
		}
	}

	updateCategory(productCategory) {
		return (dispatch) => {
			dispatch(productCategory);
		}
	}

	toggleProfileInfo(showProfileDesc) {
		return (dispatch) => {
			dispatch(showProfileDesc);
		}
	}

	showPopup(popupStatus){
		return (dispatch) => {
			dispatch(popupStatus);
		}
	}

	hidePopup(popupStatus){
		return (dispatch) => {
			dispatch(popupStatus);
		}
	}	
}

export default alt.createActions(Actions);









