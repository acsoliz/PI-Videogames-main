import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clearDetail } from '../../redux/actions/index';
import s from './Detail.module.css';

export default function Detail() {
	const dispatch = useDispatch();
	const { id } = useParams();
	useEffect(
		() => {
			dispatch(clearDetail());
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			dispatch(getDetail(id));
		},
		[ dispatch ]
	);

	const details = useSelector((state) => state.details);
	console.log('Esto deberia dar true', details);
	// console.log(details, "Fui details!!!!!!!")
	return (
		<div>
			<Link to="/home">volver</Link>
			{
				details.name ? <div>
					<div>
						<h2 key={id}>{details.name}</h2>
						<img src={details.background_image} width="350px" height="200px" alt="" />
						<h4>Genero : {details.genresString && details.genresString.join(', ')}</h4>
						<h4>Released: {details.released}</h4>
						<h4>Rating: {details.rating}</h4>
						<h4>Description: {details.description}</h4>
						<h4>Platforms : {details.platforms}</h4>
					</div>
				</div> :
				typeof details == 'string' ? <div className={s.divNotFound}>
					<span className={s.spanNotfound}>Videogame Not Found</span>
				</div> :
				<div>
					<span>Loading....</span>
				</div>}
		</div>
	);
}
