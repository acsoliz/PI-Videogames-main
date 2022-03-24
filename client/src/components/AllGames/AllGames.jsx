import React from 'react';
import VideoGame from '../VideoGame/VideoGame';
import a from './AllGames.module.css';

//escucho y mapeo el estadode countries y por cada uno renderizo una Card

export default function AllGames({ currentGame }) {
	if(typeof currentGame == 'string'){
		var message = ("We can't find the VideoGame, please check the name and try again")
	}else{
		var message = ("... Loadding") 
	}
	return (
		<div className={a.cards}>
			{
				Array.isArray(currentGame) ? currentGame.map((e) => (
					<div key={e.id}>
						<VideoGame name={e.name} image={e.background_image} genres={e.genres} id={e.id} />
					</div>
				)) :
				<p>{message}</p>}
		</div>
	);
}

