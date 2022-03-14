import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions/index';

export default function Detail() {
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(
		() => {
			dispatch(getDetail(id));
		},
		[ dispatch, id ]
	);

	const details = useSelector((state) => state.details[0]);
	// console.log('Hi there soy details', details.length);
	return (
		<div>
			{
				details ? <div>
					<h2 key={id}>{details.name}</h2>
					<img src={details.background_image} width="350px" height="200px" alt="" />
					<h4>Genero : {details.genresString}</h4>
					<h4>Released: {details.released}</h4>
					<h4>Rating: {details.rating}</h4>
					<h4>Description: {details.description}</h4>
					<h4>Platforms : {details.platforms}</h4>
                    <p>HOLAAAA</p>
				</div> :
				<span>Country Not Found</span>}
		</div>
	);
}
