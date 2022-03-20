import React from 'react';
import VideoGame from '../VideoGame/VideoGame';
import a from './AllGames.module.css';

//escucho y mapeo el estadode countries y por cada uno renderizo una Card

export default function AllGames({ currentGame }) {
	return (
		<div className={a.cards}>
			{
				currentGame ? currentGame.map((e) => (
					<div key={e.id}>
						<VideoGame name={e.name} image={e.background_image} genres={e.genres} id={e.id} />
					</div>
				)) :
				<h2>LOADING...</h2>}
		</div>
	);
}

// {

// 		videogames.length > 0 ? videogames.map((e) => (
// 				<VideoGame name={e.name} image={e.background_image} genres={e.genres} id={e.id} />
// 		)) :
// 		<div>Loading...</div>;
// }
