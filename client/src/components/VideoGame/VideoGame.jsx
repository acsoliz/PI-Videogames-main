import React from 'react';
import { Link } from 'react-router-dom';

export default function VideoGame({ name, image, genresString, id }) {
		return (
		<Link to={`/videogame/${id}`}>
			<div className="contenedor-card">
				<h2 key={id}>{name}</h2>
				<img src={image} width="350px" height="200px" alt="" />
				<div>{genresString}</div>
			</div>
		</Link>
	);
}
