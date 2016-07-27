import React from 'react';
import ProductPopup from '../../Product/ProductPopup';
import {Link} from 'react-router';

class LikeCard extends React.Component{
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

  renderMaker() {
    var imgcss="likes-maker-avatar";
    var imgMakerUrl = this.props.maker? this.props.maker.avatar : "./img/delb.png";
    var imgMaker = {
      backgroundImage: 'url(' + imgMakerUrl + ')',
      backgroundSize: 'cover',
      cursor: 'pointer',
      backgroundPosition: 'center'
    };   
    var makerUrl = ('/profile/posts/'+(this.props.maker? this.props.maker.id : null)); 
    return(
      <section>
        <Link to={makerUrl}>
          <img src={imgMakerUrl} alt="image" className={imgcss}/>
        </Link>
      </section>  
    );
  }

  renderTitle() {
    var likecardTitle="width-full likecard-title";
    return (
      <section className={likecardTitle}>
        {this.props.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).substring(0,27)}
      </section>
    );
  }

  renderMainImg() {
    var img = "postcard-img width-full"    
    var imgUrl = this.props.media? this.props.media : "./img/delb.png";    
    var imgMain = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      cursor: 'pointer',
      backgroundPosition: 'center'
    };    
    return(
      <div className={img} style={imgMain} onClick={this.showPopup}></div>
    );
  }

  render() {
    var likecard="col-xs-6 col-sm-4 col-md-3 postcard"; 
    return (
      <li className={likecard}>
        {this.renderMaker()}       
        {this.renderMainImg()}
        {this.renderTitle()}
        <ProductPopup {...this.props} status={this.state.popupStatus} hidePopup={this.hidePopup}/>
      </li>
    )
  }
}

export default LikeCard;