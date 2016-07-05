import React from 'react';
import ProductPopup from './ProductPopup';
import Upvote from './Upvote';

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
    return (
      <section className="product-item-info">
        <h5 onClick={this.showProductPopup} className="clickable">{this.props.name.substring(0,25)}</h5>
        <p>{this.props.description.substring(0,30)}...</p>
        <a href="#"><img className="small-avatar" src={this.props.maker.avatar}/></a>
      </section>      
    )
  }

  render() {
    return (
      <li className="product-item">
        <Upvote {...this.props} />        
        <img className="product-item-media clickable" src={this.props.media} onClick={this.showProductPopup} />         
        {this.renderInfoSession()}
        {this.renderNewWindowIcon()}  
        <ProductPopup {...this.props} status={this.state.productPopupStatus} hidePopup={this.hideProductPopup} />
      </li>
    );
  }
}

export default ProductItem;