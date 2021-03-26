import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav className="navbar navbar-dark bg-dark">
					<Link to="/">Home</Link>
					<Link to="/create">Add New Post</Link>
			</nav>
		)
	}
}

export default Nav;