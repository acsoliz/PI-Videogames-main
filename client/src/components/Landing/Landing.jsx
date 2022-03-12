import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div>
			<h1>I'M LANDINGPAGE!!</h1>
			<Link to="/home">Welcome</Link>
		</div>
	);
};

export default Landing;
