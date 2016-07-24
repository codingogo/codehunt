import React from 'react';
import Actions from '../../actions';

class ProfileMenu extends React.Component{
	constructor() {
		super();
		this.state = {
			showProfileNav: false
		}
	}

	handleClick = () => {
		if (this.state.showProfileNav){
			this.setState({showProfileNav: false});
		} else {
			this.setState({showProfileNav: true});
		}
	};

	handleClickOutside = (e) => {
		if (e.target != this.refs.profileBtn){
			this.setState({showProfileNav: false});
		}
	};

	handleLogout = (e) => {
		e.preventDefault();
		Actions.logout();
	};

	componentWillMount() {
		window.addEventListener("click", this.handleClickOutside, false);
	}

	componentWillUnMount() {
		window.removeEventListener("click", this.handleClickOutside, false);
	}	

	renderProfileNav() {
		var pointer = "pointer";
		return (
			<nav className="profile-nav" ref="profileNav">
				<a className={pointer}>My Profile</a>
				<a className={pointer} onClick={this.handleLogout}>Logout</a>
			</nav>
		);
	}

	render() {
		return(
			<section className="profile-menu">
				<img src={this.props.user.avatar} onClick={this.handleClick} className="profile-btn profile-img" ref="profileBtn"/>
				{
					this.state.showProfileNav? this.renderProfileNav() : null
				}
			</section>
		);
	}
}

export default ProfileMenu;