import React from 'react';
import ProductPopup from '../Product/ProductPopup';

class ToptenItem extends React.Component {
  constructor(){
    super();
    this.state = {
      productPopupStatus: false
    }
  }

  showProductPopup = () => {
    this.setState({productPopupStatus: true});
  };

  hideProductPopup = () => {
    this.setState({productPopupStatus: false});
  }; 	

  renderProductImg() {
    var imgClass = "topten-img";
    var imgUrl = this.props.media;
    var imgStyle = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover'
    }

    return (
      <div className={imgClass} style={imgStyle} onClick={this.showProductPopup}></div> 
    )  	
  }

  renderToptenDetail () {
  	return (
  		<section>
	  		<div className="topten-name">{this.props.name}</div>
	  		<div className="topten-description">{this.props.description.substring(0,30)}...</div>
  		</section>
  	)
  }

	render(){
		return(
			<section>
				<a>
					<li className="topten">
						{this.renderProductImg()}
						{this.renderToptenDetail()}
						<ProductPopup {...this.props} status={this.state.productPopupStatus} hidePopup={this.hideProductPopup} />
					</li>
				</a>
			</section>
		);
	}
}

export default ToptenItem;