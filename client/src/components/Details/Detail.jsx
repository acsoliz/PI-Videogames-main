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
	const  btnVolver = (<Link className={s.linkStyle} to="/home">volver</Link>)
	// console.log(details, "Fui details!!!!!!!")
	return (
		<div className={s.detailContainer}>			
			{
				details.name ? <div>
					<div className={s.leftContainer}>
						<h2 className={s.tittle} key={id}>
						{btnVolver}
							{details.name}
						</h2>
						<div className={s.cardContainer}>
							<img
								className={s.imageContainer}
								src={details.background_image}
								width="550px"
								height="320px"
								alt=""
							/>
							<h4>Genero : {details.genresString && details.genresString.join(', ')}</h4>
							<h4>Released: {details.released}</h4>
							<h4>Rating: {details.rating}</h4>
							<h4>Platforms : {details.platforms}</h4>
						</div>
						<div className={s.descriptionDiv}>
							<h2>Description:</h2>
							<h4> {details.description}</h4>
						</div>
					</div>
				</div> :
				typeof details == 'string' ? <div className={s.divNotFound}>
					<span className={s.spanNotfound}>Videogame Not Found</span>
					{btnVolver}
				</div> :
				<div>
					<span>Loading....</span>
					{btnVolver}
				</div>}
		</div>
	);
}
