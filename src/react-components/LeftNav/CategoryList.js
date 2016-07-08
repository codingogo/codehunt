import React from 'react';

class CategoryList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			productCategory: ''
		}
	}

	showSelectCategory = () => {
		var selectedCategory = this.props.showWhichCategory;
		console.log(selectedCategory);
	}

	render() {
		return(
			<section>
				<a>
					<li className="category" onClick={this.showSelectCategory}>
						{this.props.name}
					</li>
				</a>	
			</section>	
		);
	}
}

export default CategoryList;