import React from 'react';
import ProductList from '../Product/ProductList';
import Firebase from 'firebase';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';

import SideNav from '../LeftNav';
import RightNav from '../RightNav';

@connectToStores
class HomePage extends React.Component {
  constructor() {
    super();
    Actions.getProducts();
  }

  static getStores(){
    return [ProductStore];
  }

  static getPropsFromStores(){
    return ProductStore.getState();
  }

  renderLandingBanner() {
    return(
      <section className="landing-banner">
      </section>
    );
  }

  renderProductList() {
    return(
      <section className="col-xs-12 col-sm-10 col-md-7 col-lg-7 product-list-canvas">
        {
          this.props.products
          ?
          <ProductList productList={this.props.products}/>
          :
          null 
        }
      </section>      
    );
  }

  renderSideNav() {
    return (
      <SideNav/>
    );
  }

  renderRightNav() {
    return (
      <RightNav/>
    );
  }

  render() {
    return (
      <section className="container">
        <section className="row">       
            {this.renderLandingBanner() }
            {this.renderSideNav()}
            {this.renderProductList()}          
            {this.renderRightNav()}
        </section> 
      </section>   
    );
  }
}

export default HomePage;