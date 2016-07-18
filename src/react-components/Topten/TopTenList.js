import React from 'react';
import ToptenItem from './ToptenItem';

class ToptenList extends React.Component {
	render() {
		return (
			<section className="topten-item">
				{
					this.props.toptenList.map(function(item,idx){
						return <ToptenItem key={idx} pid={item.key} {...item} />
					})
				}
			</section>	
		)
	}
}

export default ToptenList;