import React from 'react';
import ProductPopup from '../../Product/ProductPopup';

class LikeCard extends React.Component{
  constructor(){
    super();
    this.state = {
      likePopupStatus: false
    }
  }

  showLikePopup = () => {
    this.setState({likePopupStatus: true});
  };

  hideLikePopup = () => {
    this.setState({likePopupStatus: false});
  };  

  render() {
    var likecard="col-xs-6 col-sm-4 col-md-3 postcard";
    var img = "postcard-img width-full"
    var imgUrl = this.props.media? this.props.media : "./img/delb.png";
    var btn = "btn-sm btn btn-default width-half postcard-btn";
    var likecardTitle="width-full postcard-title";
    var caretUp = "fa fa-lg fa-caret-up";
    var comment = "fa fa-comment";
    var imgMain = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      cursor: 'pointer',
      backgroundPosition: 'center'
    };
    
    return (
      <li className={likecard}>
        <div className={img} style={imgMain} onClick={this.showPostPopup}></div>
        <div className={likecardTitle}>
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
        <ProductPopup {...this.props} status={this.state.likePopupStatus} hidePopup={this.hidePostPopup}/>
      </li>
    )
  }
}

export default LikeCard;