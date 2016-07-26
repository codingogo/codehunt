import React from 'react';
import NavLink from '../Navbar/NavLink'
import ProductPopup from './ProductPopup';
import Upvote from './Upvote';
import Comment from './Comment';
import Actions from '../../actions';


class ProductItem extends React.Component {
  constructor(){
    super();
    this.state = {
      productPopupStatus: false
    }
    this.refreshStats = this.refreshStats.bind(this);
  }

  showProductPopup = () => {
    this.setState({productPopupStatus: true});
  };

  hideProductPopup = () => {
    this.setState({productPopupStatus: false});
  };  

  windowOpen = () => {
    window.open(this.props.link,  'newwindow', 'width=300, height=450');
  }

  refreshStats = () => {
    var userId = (this.props.maker? this.props.maker.id:null);
    if(userId && Actions){
      Actions.getPosts(userId);
      Actions.getLikes(userId);
      Actions.getFollowers(userId);
      Actions.getFollowing(userId);
      Actions.getUsers(userId);
    }
  }

  renderInfo(){
    var itemInfo = "product-item-info";
    var clickable = "clickable";
    var itemDesc = "product-item-description";
    var avatar = "small-avatar";
    var productStats = "product-stats";
    var productLink ="product-item-link";
    return (
      <section className={itemInfo}>
        <h5 onClick={this.showProductPopup} className={clickable}>{this.props.name? this.props.name.substring(0,25).toUpperCase():null}</h5>
        <p className={itemDesc}>{this.props.description? this.props.description.substring(0,50):null}...</p>
        <div className={productStats}>
          <NavLink to={this.props.maker? ("/profile/posts/"+this.props.maker.id): "/"} onClick={this.refreshStats}>
            <img className={avatar} src={this.props.maker? this.props.maker.avatar:null}/>
          </NavLink>
          <Upvote {...this.props} /> 
          <span onClick={this.showProductPopup}><Comment {...this.props} /></span>
        </div>  
      </section>      
    )
  }

  renderProductImg() {
    var imgClass = "product-item-media clickable";
    var imgUrl = this.props.media;
    var imgStyle = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    return (
      <div className={imgClass} style={imgStyle} onClick={this.showProductPopup}></div>
    )
  }

  render() {
    return (
      <li className="product-item-li">
        <div className="product-item">
          {this.renderProductImg()}      
          {this.renderInfo()}
        </div> 
        <a onClick={this.windowOpen} className="product-item-link"><i className="fa fa-external-link" aria-hidden="true"></i></a> 
        <ProductPopup {...this.props} status={this.state.productPopupStatus} hidePopup={this.hideProductPopup} />
      </li>
    );
  }
}

export default ProductItem;