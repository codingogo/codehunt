import React from 'react';
import CategoryList from './CategoryList';


class SideNav extends React.Component {
  constructor(){
    super();
    this.state = { 
      categoryList: [
        {
          id: 1,
          name: 'Design',
          url: '',
          showWhichCategory: {
            productCategory: 'design'
          }
        },
        {
          id: 2,
          name: 'Entertainment',
          url: '',
          showWhichCategory: {
            productCategory: 'entertainment'
          }
        },
        {
          id: 3,
          name: 'Lifestyle',
          url: '',
          showWhichCategory: {
            productCategory: 'lifestyle'
          }
        },
        {
          id: 4,
          name: 'Beauty',
          url: '',
          showWhichCategory: {
            productCategory: 'beauty'
          }
        }
      ]
    }
  }

  renderCategory(){
    return(
      <section>
        <ul className="category-canvas">
          {
            this.state.categoryList.map(function(item,idx){
              return <CategoryList key={idx} {...item}/>
            })
          } 
        </ul>           
      </section>
    );
  }

  renderSideNavigation(){
    return(
      <section className="hidden-xs col-sm-2 col-md-2 col-lg-2 left-navbar">
          <h5 className="category-title">CATEGORIES</h5>
          <div>{this.renderCategory()}</div>
      </section>
    ); 
  }

  render() {
    return (
      <section>
        {this.renderSideNavigation()}
      </section>
    );
  }
}

export default SideNav;