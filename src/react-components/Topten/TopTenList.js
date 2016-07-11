import React from 'react';
import ToptenItem from './ToptenItem';

class ToptenList extends React.Component {
	render() {
		return (
			<section>
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