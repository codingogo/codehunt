import React from 'react';

class Category extends React.Component {
	selectedCategory = () => {
		return alert('testing');
	}

	render() {
		return (
			<section>
				<a value={"design"} onClick={this.changeCategory}>Design</a>
        <a value={"entertainment"} onClick={this.changeCategory}>Entertainment</a>
        <a value={"lifestyle"} onClick={this.changeCategory}>Lifestyle</a>
        <a value={"beauty"} onClick={this.changeCategory}>Beauty</a>
			</section>
		)
	}

}

export default Category;