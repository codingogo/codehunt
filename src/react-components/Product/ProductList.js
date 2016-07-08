import React from 'react';
import ProductItem from './ProductItem';
import CategoryList from '../LeftNav/CategoryList';
import Category from '../LeftNav/Category';

class ProductList extends React.Component{  
  constructor(props) {
    super(props);
    this.state = {productCategory: ''};
    this.changeCategory = this.changeCategory.bind(this);
  }

  changeCategory(ev){
    this.setState({productCategory: ev.target.value});
  }

  renderProductList(){
    var productArr = this.props.productList.slice(0).reverse();
    var filteredProduct;
    var productCategory = '';

    if(this.state.productCategory == 'design'){
      filteredProduct = productArr.filter(function(obj){
        return obj.category == 'design';
      });
    } else if(this.state.productCategory == 'entertainment'){
      filteredProduct = productArr.filter(function(obj){
        return obj.category == 'entertainment';
      });
    } else if(this.state.productCategory == 'lifestyle'){
      filteredProduct = productArr.filter(function(obj){
        return obj.category == 'lifestyle';
      });
    } else if(this.state.productCategory == 'beauty'){
      filteredProduct = productArr.filter(function(obj){
        return obj.category == 'beauty';
      });
    } else {
      filteredProduct = productArr;
    }

    return(
      <ul className="product-list">
          { 
            filteredProduct.map(function(item,idx){
              return <ProductItem key={idx} pid={item.key} {...item}/>
            })
          }         
      </ul>  
    )    
  }

  renderCategorySelect() {
    return(
      <section>
        <a value={"design"} onClick={this.changeCategory} className="category-select">Design </a>
        <a value={"entertainment"} onClick={this.changeCategory} className="category-select">Entertainment </a>
        <a value={"lifestyle"} onClick={this.changeCategory} className="category-select">Lifestyle </a>
        <a value={"beauty"} onClick={this.changeCategory} className="category-select">Beauty</a>
        <a value={""} onClick={this.changeCategory} className="category-select">All</a>
      </section>
    )
  }

  render() {
    
    return (
      <section>
        {this.renderCategorySelect()}
        {this.renderProductList()}
      </section>
    );
  }
}

export default ProductList;






