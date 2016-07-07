import React from 'react';
import ToptenItem from './ToptenItem';

class TopTenList extends React.Component {
	render() {
		return (
			<section>
				{
					this.props.productList.map(function(item,idx){
						return <ToptenItem key={idx} pid={item.key} {...item} />
					})
				}
			</section>	
		)
	}
}

export default TopTenList;