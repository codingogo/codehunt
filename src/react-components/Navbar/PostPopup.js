import React from 'react';
import Popup from './Popup';
import Actions from '../../actions';

class PostPopup extends React.Component{

  handlePost = () => {
    var errorMsg;
    var newProduct = {
      name: this.refs.name.value,
      link: this.refs.link.value,
      description: this.refs.description.value,
      media: this.refs.media.value,
      upvote: 0,
      maker: {
        name: this.props.user.name,
        avatar: this.props.user.avatar,
        id: this.props.user.id
      },
      category: this.refs.category.mainCategory,
      timestamp: Firebase.ServerValue.TIMESTAMP
    }
    if(newProduct.name.length > 0 && newProduct.link.length > 0 && newProduct.description.length > 0 && newProduct.media.length > 0) {
      Actions.addProduct(newProduct);    
      {this.props.hidePopup()};
    } else {
      errorMsg = "Please check missing fields."
    }
    console.log('newProduct', this.refs.category.mainCategory);
  };

  renderPostForm(){
    var isRequired=true;
    var inputClass='form-control';
    var group = 'form-group';
    var label = "col-xs-4 col-sm-3 control-label";
    var inputArea = "col-xs-8 col-sm-9 padding-zero-left";
    var fullWidth = {width: '100%'}
    return(
      <section>
        <h3 className="post-header">New Post</h3>
        <form className="form-horizontal">
          <div className={group}>
            <label htmlFor="listingTitle" className={label}>Title:</label>
            <div className={inputArea}>
              <input type="text" className={inputClass} style={fullWidth} id="listingTitle" placeholder="title" ref="name" required={isRequired} />
            </div>
          </div>
          <div className={group}>
            <label htmlFor="listingDescription" className={label}>Description:</label>
            <div className={inputArea}>
              <input type="text" className={inputClass} style={fullWidth} id="listingDescription" placeholder="add a short description of the product" ref="description" required={isRequired} />
            </div> 
          </div> 
          <div className={group}>
            <label htmlFor="listingLink" className={label}>Web Link:</label>
            <div className={inputArea}>
              <input type="text" className={inputClass} style={fullWidth} id="listingLink" placeholder="http://www..." ref="link" required={isRequired}/>
            </div>  
          </div>
          <div className={group}>
            <label htmlFor="listingMedia" className={label}>Media link:</label>
            <div className={inputArea}>
              <input type="text" className={inputClass} style={fullWidth} id="listingMedia" placeholder="image address here.."  ref="media" required={isRequired}/>
            </div>  
          </div> 
          <div className={group}>
            <label htmlFor="listingCategory" className={label}>Category:</label>
            <select className="col-xs-8 col-sm-9 select-category" ref="category">
              <option value="{'mainCategory': 'design'}" className="option-category">design</option>
              <option value="{'mainCategory': 'entertainment'}">entertainment</option>
              <option value="{'mainCategory': 'lifestyle'}">lifestyle</option>
              <option value="{'mainCategory': 'beauty'}">beauty</option>
            </select> 
          </div>   

          <footer className="post-footer">
            <button onClick={this.handlePost} className="post-btn">POST</button>
          </footer>
        </form>
      </section>
    );    
  }

  render(){
    return(
      <Popup {...this.props} style="post-popup">
        {this.renderPostForm()}
      </Popup>
    );
  }
}

export default PostPopup;