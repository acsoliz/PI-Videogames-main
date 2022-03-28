import React from 'react';
import { Link } from 'react-router-dom';
import s from './VideoGame.module.css'

export default function VideoGame({ name, image, genres, id }) {
	return (
		<div className={s.contenedorCard} background={image} width="350px" height="200px" alt="">
			<Link to={`/videogame/${id}`}>
				<h2 key={id}>{name}</h2>
			</Link>
			<Link to={`/videogame/${id}`}>
				<img src={image} width="350px" height="200px" alt="" className={s.filter}/>
			</Link>
			<div className={s.divGenres}>{genres}</div>
		</div>
	);
}
