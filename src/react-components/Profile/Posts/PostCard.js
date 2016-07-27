import React from 'react';
import ProductPopup from '../../Product/ProductPopup';

class PostCard extends React.Component{
  constructor(){
    super();
    this.state = {
      popupStatus: false
    };
  }

  showPopup = () => {
    this.setState({popupStatus: true})
  };

  hidePopup = () => {
    this.setState({popupStatus: false})
  };  

  componentWillUnMount() {
    this.showPopup;
    this.hidePopup;
  }  

  render() {
    var postcard="col-xs-6 col-sm-4 col-md-3 postcard";
    var img = "postcard-img width-full"
    var imgUrl = this.props.media? this.props.media : "./img/delb.png";
    var btn = "btn-sm btn btn-default width-half postcard-btn";
    var postcardTitle="width-full postcard-title";
    var heart = "fa fa-lg fa-heart-o";
    var comment = "fa fa-comment";
    var imgMain = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      cursor: 'pointer'
    };
    
    return (
      <li className={postcard}>
        <div className={img} style={imgMain} onClick={this.showPopup}></div>
        <div className={postcardTitle}>
          {this.props.name?this.props.name.substring(0,27):null}
        </div>          
        <div className="width-full">
          <span className={btn}>
            <i className={heart} ariaHidden="true"></i>
            <span>&nbsp;{this.props.upvote}</span>
          </span>     
          <span className={btn}>
            <i className={comment} ariaHidden="true"></i>
            <span>&nbsp;{this.props.commentCount? this.props.commentCount: 0 }</span>
          </span>
        </div>
        <ProductPopup {...this.props} status={this.state.popupStatus} hidePopup={this.hidePopup}/>
        {this.props.children}
      </li>
    )
  }
}

export default PostCard;