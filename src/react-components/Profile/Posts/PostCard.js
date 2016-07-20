import React from 'react';

class PostCard extends React.Component{
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
      backgroundSize: 'cover'
    };
    
    return (
      <li className={postcard}>
        <div className={img} style={imgMain}></div>
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
      </li>
    )
  }
}

export default PostCard;