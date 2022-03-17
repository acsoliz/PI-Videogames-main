import React from 'react';
import { Link } from 'react-router-dom';

export default function VideoGame({ name, image, genres, id }) {
	return (
		<div className="contenedor-card">
			<Link to={`/videogame/${id}`}>
				<h2 key={id}>{name}</h2>
			</Link>
			<Link to={`/videogame/${id}`}>
				<img src={image} width="350px" height="200px" alt="" />
			</Link>
			<div>{genres}</div>
		</div>
	);
}
