import React from 'react';
import ProductItem from './ProductItem';

class ProductList extends React.Component{  
  constructor(props) {
    super(props);
  }

  renderProductList(){
    var productArr = this.props.productList.slice(0).reverse();
    var filteredProduct;
   
    if(this.props.productCategory == 'design'){
      filteredProduct = productArr.filter(function(obj){
        return obj.category == 'design';
      });
    } else if(this.props.productCategory == 'entertainment'){
      filteredProduct = productArr.filter(function(obj){
        return obj.category == 'entertainment';
      });
    } else if(this.props.productCategory == 'lifestyle'){
      filteredProduct = productArr.filter(function(obj){
        return obj.category == 'lifestyle';
      });
    } else if(this.props.productCategory == 'beauty'){
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

  render() {
    return (
      <section>
        {this.renderProductList()}
      </section>
    );
  }
}

export default ProductList;






