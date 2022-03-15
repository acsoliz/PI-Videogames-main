import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VideoGame from '../VideoGame/VideoGame';
import SearchBar from '../SearchBar/SearchBar';
import { getAllGames, filterByGenres, filterDb } from '../../redux/actions/index';

const Home = () => {
	const dispatch = useDispatch();

	const videogames = useSelector((state) => state.videogames);

	function handleOnChange(e) {
		e.preventDefault();
		if (e.target.value === '') return dispatch(getAllGames());
		dispatch(filterByGenres(e.target.value));
	}
	function handleDbFilter(e) {
		// console.log(e.target.value);
		e.preventDefault();
		if (e.target.value === '') return dispatch(getAllGames());
		dispatch(filterDb(e.target.value));
	}

	return (
		<div>
			<div>
				<SearchBar />
				
				<Link to={'/create'} >
					Create Videogame
				</Link>
				<div>
					<select onChange={(e) => handleOnChange(e)}>
						<option value={'All'}>Todos</option>
						<option value={'Action'}>Action</option>
						<option value={'Adventure'}>Adventure</option>
						<option value={'RPG'}>RPG</option>
						<option value={'Shooter'}>Shooter</option>
						<option value={'Puzzle'}>Puzzle</option>
						<option value={'Indie'}>Indie</option>
					</select>
				</div>
				<select onChange={(e) => handleDbFilter(e)}>
					<option value={'All'}>Todos</option>
					<option value={true}>Created</option>
					<option value={false}>Not Created</option>
				</select>
				{
					videogames.length > 0 ? videogames.map((e) => (
						<div key={e.id}>
							<VideoGame
								name={e.name}
								image={e.background_image}
								genresString={e.genresString}
								id={e.id}
							/>
						</div>
					)) :
					<div>Loading...</div>}
			</div>
		</div>
	);
};

export default Home;
