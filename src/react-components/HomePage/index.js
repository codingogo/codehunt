import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Firebase from 'firebase';
import ProductList from '../Product/ProductList';
import ProductStore from '../../stores/ProductStore';
import Topten from '../Topten';

@connectToStores
class HomePage extends React.Component {
  constructor() {
    super();
    this.changeCategory = this.changeCategory.bind(this);
  }

  static getStores(){
    return [ProductStore];
  }

  static getPropsFromStores(){
    return ProductStore.getState();
  }

  componentDidMount() {
    Actions.getProducts();
  }

  changeCategory(ev){
    Actions.updateCategory({productCategory: ev.target.value});
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
          <ProductList 
            productCategory={this.props.productCategory}
            productList={this.props.products}/>
          :
          null 
        }
      </section>      
    );
  }

  renderCategory() {
    return (
      <section className="hidden-xs col-sm-2 col-md-2 col-lg-2 left-navbar" productCategory={this.props.productCategory}>
          <h5 className="category-title" value={""} onClick={this.changeCategory}>CATEGORIES</h5>
          <div className="category-canvas">
            <a value={"design"} onClick={this.changeCategory} className="category-select">Design </a>
            <a value={"entertainment"} onClick={this.changeCategory} className="category-select">Entertainment </a>
            <a value={"lifestyle"} onClick={this.changeCategory} className="category-select">Lifestyle </a>
            <a value={"beauty"} onClick={this.changeCategory} className="category-select">Beauty</a>           
          </div> 
      </section>
    );
  }

  renderProductCategory() {
    return (
      <section>
        {this.renderCategory()}
        <div className="col-xs-12 col-sm-10 col-md-7 col-lg-7 product-list-canvas">
          {
            this.props.products
            ?
            <ProductList 
              productCategory={this.props.productCategory} 
              productList={this.props.products}/>
            :
            null 
          }
        </div>  
      </section>

    );
  }

  render() {
    return (
      <section className="container">
        <div className="row">       
            {this.renderLandingBanner()}
            {this.renderProductCategory()}         
            <Topten {...this.props}/>
            {this.props.children}
        </div> 
      </section>   
    );
  }
}

export default HomePage;