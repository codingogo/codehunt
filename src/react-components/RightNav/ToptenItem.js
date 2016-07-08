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
      <div className={imgClass} style={imgStyle}></div> 
    )  	
  }

  renderToptenInfo() {
  	return (
  		<section onClick={this.showProductPopup}>
  			<div className="topten-rank">{this.props.rank}</div>
	  		{this.renderProductImg()}
	  		<div className="topten-name">{this.props.name}</div>
	  		<div className="topten-description">{this.props.description.substring(0,30)}...</div>
  		</section>
  	)
  }

	render(){
		return(
			<section>
				<li className="topten">						
					{this.renderToptenInfo()}
					<ProductPopup {...this.props} status={this.state.productPopupStatus} hidePopup={this.hideProductPopup} />
				</li>
			</section>
		);
	}
}

export default ToptenItem;