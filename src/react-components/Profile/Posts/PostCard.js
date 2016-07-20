import React from 'react';
import ProductPopup from '../../Product/ProductPopup';

class PostCard extends React.Component{
  constructor(){
    super();
    this.state = {
      postPopupStatus: false
    }
  }

  showPostPopup = () => {
    this.setState({postPopupStatus: true});
  };

  hidePostPopup = () => {
    this.setState({postPopupStatus: false});
  };  

  render() {
    var postcard="col-xs-6 col-sm-4 col-md-3 postcard";
    var img = "postcard-img width-full"
    var imgUrl = this.props.media? this.props.media : "./img/delb.png";
    var btn = "btn-sm btn btn-default width-half postcard-btn";
    var postcardTitle="width-full postcard-title";
    var caretUp = "fa fa-lg fa-caret-up";
    var comment = "fa fa-comment";
    var imgMain = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      cursor: 'pointer'
    };
    
    return (
      <li className={postcard}>
        <div className={img} style={imgMain} onClick={this.showPostPopup}></div>
        <div className={postcardTitle}>
          {this.props.name.substring(0,27)}
        </div>          
        <div className="width-full">
          <span className={btn}>
            <i className={caretUp} ariaHidden="true"></i>
            <span>&nbsp;{this.props.upvote}</span>
          </span>     
          <span className={btn}>
            <i className={comment} ariaHidden="true"></i>
            <span>&nbsp;{this.props.commentNums}</span>
          </span>
        </div>
        <ProductPopup {...this.props} status={this.state.postPopupStatus} hidePopup={this.hidePostPopup}/>
      </li>
    )
  }
}

export default PostCard;