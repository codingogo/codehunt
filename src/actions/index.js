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
	    });		
		}
	}

	logout() {
		return(dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com');
			firebaseRef.unauth();
			setTimeout(() => dispatch(null));
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

	addVote(productId, userId, productObj, productOwnerId) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com');
			var voteRef = firebaseRef.child('votes').child(productId).child(userId);
			var postRef = firebaseRef.child('posts').child(productOwnerId).child(productId).child('upvote'); 
			voteRef.on('value', (snapshot) => {
				if(snapshot.val() == null){
					voteRef.set(true);
					firebaseRef = firebaseRef.child('products').child(productId).child('upvote');
					var vote = 0;
					firebaseRef.on('value', (snapshot)=> {
						vote = snapshot.val();
					});
					firebaseRef.set(vote+1);

					// update post				
					postRef.on('value', (snapshot) => {
						vote = snapshot.val();
					})
					postRef.set(vote+1);
				}
			});
			// save to Profile Likes
			firebaseRef.child('likes').child(userId).child(productId).set(productObj);
		}
	}

	addComment(productId, comment, userId, productOwnerId){
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com');
			firebaseRef.child('comments').child(productId).push(comment);

			var postRef = firebaseRef.child('posts').child(productOwnerId).child(productId).child('commentCount');
			var likeRef = firebaseRef.child('likes').child(productOwnerId).child(productId).child('commentCount');
			// add commentCount to product & user comment only count once
			var commentRef = firebaseRef.child('products').child(productId).child('comments').child(userId);
			commentRef.on('value', (snapshot) => {
				if(snapshot.val() == null){
					commentRef.set(true)
					firebaseRef = firebaseRef.child('products').child(productId).child('commentCount');
					
					var count = 0;
					firebaseRef.on('value', (snapshot) => {
						count = snapshot.val();
					});
					firebaseRef.set(count+1);

					var countComm = 0;
					postRef.on('value', (snapshot) => {
						countComm = snapshot.val();
					});
					postRef.set(countComm+1);

					var countCommLike = 0;
					likeRef.on('value', (snapshot) => {
						countCommLike = snapshot.val();
					});
					likeRef.set(countCommLike+1);
				}
			});
		}
	}

	addFollow(followedId, followerId, follower, followedObj) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com');
			var followRef = firebaseRef.child('followers').child(followedId).child(followerId);
			var updatedFollowData = {};
			updatedFollowData["users/"+followedId+"/followers/"+followerId] = follower;
			updatedFollowData["users/"+followerId+"/following/"+followedId] = followedObj;

			followRef.on('value', (snapshot) => {
				if(snapshot.val() == null){
					followRef.set(follower);
					firebaseRef.update(updatedFollowData, function(error){
						if(error){
							console.log("Error updating data:", error);
						}
					})
				}
			});
		}
	}

	removeFollow(followedId, followerId) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com');
			var followRef = firebaseRef.child('followers').child(followedId).child(followerId);
			var updatedFollowData = {};

			updatedFollowData["users/"+followedId+"/followers/"+followerId] = null;
			updatedFollowData["users/"+followerId+"/following/"+followedId] = null;
			followRef.on('value', (snapshot) => {
				if(snapshot.val() != null){
					followRef.set(null);
					firebaseRef.update(updatedFollowData, function(error){
						if(error){
							console.log("Error removing follow:", error);
						}
					})
				}
			})
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
					item.postOwnerId = userId;
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
			firebaseRef.child(userId).orderByChild('timestamp').on('value', (snapshot) => {
				var likesVal = snapshot.val();
				var likes = _(likesVal).keys().map((likeKey) => {
					var item = _.clone(likesVal[likeKey]);
					item.key = likeKey;
					item.likedOwnerId = userId;
					return item;
				})
				.value();
				dispatch(likes);
			});
		}
	}

	getFollowers(userId) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com/followers');
			firebaseRef.child(userId).on('value', (snapshot) => {
				var followersVal = snapshot.val();
				var followers = _(followersVal).keys().map((followerKey) => {
					var item = _.clone(followersVal[followerKey]);
					item.key = followerKey;
					return item;
				})
				.value();
				dispatch(followers);
			})
		}
	}

	getFollowing(userId) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com');
			firebaseRef.child('users').child(userId).child('following').on('value', (snapshot) => {
				var followingVal = snapshot.val();
				var following = _(followingVal).keys().map((followingKey) => {
					var item = _.clone(followingVal[followingKey]);
					item.key = followingKey;
					return item;
				})
				.value();
				dispatch(following);
			})
		}
	}
	// getUsers is equivalent to the depricated getProfiles
	getUsers(userId) {
		return (dispatch) => {
			var firebaseRef = new Firebase('https://delb.firebaseio.com/users');
			firebaseRef.child(userId).on('value', (snapshot) => {
				var profilesVal = snapshot.val();
				dispatch(profilesVal);
			});
		}
	}

	initializeProfileStats(initObj) {
		return (dispatch) => {
			dispatch(initObj);
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









