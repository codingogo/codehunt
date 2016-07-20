import React from 'react';
import ProductPopup from './ProductPopup';
import Upvote from './Upvote';
import NavLink from '../Navbar/NavLink'

class ProductItem extends React.Component {
  constructor(){
    super();
    this.state = {
      productPopupStatus: false
    }
  }

  showProductPopup = () => {
    this.setState({productPopupStatus: true});
  };

  hideProductPopup = () => {
    this.setState({productPopupStatus: false});
  };  


  renderNewWindowIcon(){
    return (
      <a className="product-item-link" href={this.props.link}><span><i className="fa fa-external-link" aria-hidden="true"></i></span></a>
    )
  }

  renderInfoSession(){
    var profileLink = "/profile/posts/"+this.props.maker.id;
    var itemInfo = "product-item-info";
    var clickable = "clickable";
    var itemDesc = "product-item-description";
    var avatar = "small-avatar";
    var productStats = "product-stats";
    return (
      <section className={itemInfo}>
        <h5 onClick={this.showProductPopup} className={clickable}>{this.props.name.substring(0,25).toUpperCase()}</h5>
        <p className={itemDesc}>{this.props.description.substring(0,50)}...</p>
        <div className={productStats}>
          <NavLink to={this.props.maker.id? profileLink : "/"}>
            <img className={avatar} src={this.props.maker.avatar}/>
          </NavLink>
          <Upvote {...this.props} /> 
        </div>  
      </section>      
    )
  }

  renderProductImg() {
    var imgClass = "product-item-media clickable";
    var imgUrl = this.props.media;
    var imgStyle = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover'
    }

    return (
      <div className={imgClass} style={imgStyle} onClick={this.showProductPopup}></div> 
    )
  }

  render() {
    return (
      <li>
        <div className="product-item">
          {this.renderProductImg()}      
          {this.renderInfoSession()}
          {this.renderNewWindowIcon()}  
        </div>  
        <ProductPopup {...this.props} status={this.state.productPopupStatus} hidePopup={this.hideProductPopup} />
      </li>
    );
  }
}

export default ProductItem;