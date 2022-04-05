import React from 'react';
import VideoGame from '../VideoGame/VideoGame';
import s from './AllGames.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, filterByGenres, filterDb, sortByAlph, sortByRating } from '../../redux/actions/index';

//escucho y mapeo el estadode countries y por cada uno renderizo una Card

export default function AllGames({ currentGame }) {
	if (typeof currentGame == 'string') {
		var message = "We can't find the VideoGame, please check the name and try again";
	} else {
		var message = '... Loadding';
	}
	const dispatch = useDispatch();
	function handleClick(e) {
		e.preventDefault();
		dispatch(getAllGames());
	}
	return (
		<div className={s.cards}>
			{currentGame[0]?
				<>
					{
						Array.isArray(currentGame) ? currentGame.map((e) => (
							<div key={e.id}>
								<VideoGame name={e.name} image={e.background_image} genres={e.genres} id={e.id} />
							</div>
						)) :
						<div className={s.messageError}>
							<h3 className={s.messageText}>{message}</h3>

							<button onClick={(e) => handleClick(e)}>volver⮨</button>
						</div>}
				</>:
				<h1 className={s.loading}>Loading... </h1>
			}
		</div>
	);
}
