import React from 'react';
import  { Link } from 'react-router-dom';

const Menu = () => {
	return (
		<div>
			<Link to='/' className="menu-link">Anecdotes</Link>
			<Link to='/create' className="menu-link">Create New</Link>
			<Link to='/about' className="menu-link">About</Link>
		</div>
	);
};

export default Menu;