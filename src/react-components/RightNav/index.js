import React from 'react';
import TopTenList from './TopTenList';

import Actions from '../../actions';
import ProductStore from '../../stores/ProductStore';
import connectToStores from 'alt-utils/lib/connectToStores';

@connectToStores
class RightNav extends React.Component {
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

  renderProductList() {
  	var productArray = this.props.products;
  	var toptenArray = productArray.filter(function(obj){
  		return obj.topten == true;
  	})
  	var newArray = _.sortBy(toptenArray, 'rank', function(n){
  		return Math.sin(n);
  	});

    return(
      <section className="topten-item">
        {
          productArray
          ?
          <TopTenList productList={newArray}/>
          :
          null 
        }
      </section>    
    );
  }

  render() {
    return (
      <section className="hidden-xs hidden-sm col-md-3 col-lg-3 right-nav">
      	<h5 className="category-title">TOP 10</h5>
      	{this.renderProductList()}
      </section>
    );
  }
}

export default RightNav;