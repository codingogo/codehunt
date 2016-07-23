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
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    return (
      <div className={imgClass} style={imgStyle}></div> 
    )  	
  }

  renderToptenInfo() {
    var rank = "topten-rank";
    var name = "topten-name whitespace";
    var description = "topten-description whitespace";
  	return (
  		<section onClick={this.showProductPopup}>
  			<div className={rank}>{this.props.rank}</div>
	  		{this.renderProductImg()}
	  		<div className={name}>{this.props.name}</div>
	  		<div className={description}>{this.props.description.substring(0,30)}...</div>
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