import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VideoGame from '../VideoGame/VideoGame';

const Home = () => {
	const dispatch = useDispatch();

	const videogames = useSelector((state) => state.videogames);

	// function handleOnchange(e) {
	// 	console.log(e);
	// 	e.preventDefault();
	// 	if (e.target.value === '') return dispatch(getAllGames());
	// 	dispatch(filtergenre(e.target.value));
	// }

	return (
		<div>
			<div>
				{
					videogames.length > 0 ? videogames.map((e) => (
						<VideoGame name={e.name} image={e.background_image} genresString={e.genresString} key={e.id} />
					)) :
					<div>Loading...</div>}
			</div>
		</div>
	);
};

export default Home;
