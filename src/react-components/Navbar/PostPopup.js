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
      }
    }
    if(newProduct.name.length > 0 && newProduct.link.length > 0 && newProduct.description.length > 0 && newProduct.media.length > 0) {
      Actions.addProduct(newProduct);    
      {this.props.hidePopup()};
    } else {
      errorMsg = "Please check missing fields."
    }
  };

  renderPostForm(){
    var isRequired=true;
    var inputClass='form-control';

    return(
      <section>
        <h3 className="post-header">New Post</h3>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="listingTitle" className="col-xs-4 col-sm-3 control-label">Name:</label>
            <div className="col-xs-8 col-sm-9 padding-zero-left">
              <input type="text" className={inputClass} id="listingTitle" placeholder="name" ref="name" required={isRequired} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="listingDescription" className="col-xs-4 col-sm-3 control-label">Description:</label>
            <div className="col-xs-8 col-sm-9 padding-zero-left">
              <input type="text" className={inputClass} id="listingDescription" placeholder="description" ref="description" required={isRequired} />
            </div> 
          </div> 
          <div className="form-group">
            <label htmlFor="listingLink" className="col-xs-4 col-sm-3 control-label">Web Link:</label>
            <div className="col-xs-8 col-sm-9 padding-zero-left">
              <input type="text" className={inputClass} id="listingLink" placeholder="http://www..." ref="link" required={isRequired}/>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="listingMedia" className="col-xs-4 col-sm-3 control-label">Media link:</label>
            <div className="col-xs-8 col-sm-9 padding-zero-left">
              <input type="text" className={inputClass} id="listingMedia" placeholder="image link here.."  ref="media" required={isRequired}/>
            </div>  
          </div> 
          <div className="form-group">
            <label htmlFor="listingCategory" className="col-xs-4 col-sm-3 control-label">Category:</label>
            <select className="col-xs-8 col-sm-9 select-category">
              <option value="design" className="option-category">design</option>
              <option value="entertainment">entertainment</option>
              <option value="lifestyle">lifestyle</option>
              <option value="beauty">beauty</option>
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