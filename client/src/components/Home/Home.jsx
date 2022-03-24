import { getAllGames, filterByGenres, filterDb } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import VideoGame from '../VideoGame/VideoGame';
import SearchBar from '../SearchBar/SearchBar';
import Paginated from '../Paginated/Paginated';
import AllGames from '../AllGames/AllGames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './Home.module.css';
const Home = () => {
	const dispatch = useDispatch();
	const videogames = useSelector((state) => state.videogames);
	//--------------mostrar los paises
	function handleOnChange(e) {
		e.preventDefault();
		if (e.target.value === '') return dispatch(getAllGames());
		dispatch(filterByGenres(e.target.value));
	}
	function handleDbFilter(e) {
		e.preventDefault();
		if (e.target.value === '') return dispatch(getAllGames());
		dispatch(filterDb(e.target.value));
	}

	// //--------------paginado
	const [ currentPage, setCurrentPage ] = useState(1); //Pagina actual
	const [ gamesByPage, setGamesByPage ] = useState(15); // Cuantos paises por page
	const lastGame = currentPage * gamesByPage;
	const firstGame = lastGame - gamesByPage;
	const currentGame = videogames && videogames.slice(firstGame, lastGame);

	const paginated = (pageNum) => {
		setCurrentPage(pageNum);
	};
	//---------------------------------------

	return (
		<div>
			<div className={s.container}>
				<SearchBar />

				<Link to={'/create'}>Create Videogame</Link>
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
				<div>
					<select onChange={(e) => handleDbFilter(e)}>
						<option value={'All'}>Todos</option>
						<option value={true}>Created</option>
						<option value={false}>Not Created</option>
					</select>
				</div>
				<div>
					<Paginated
						videogames={videogames && videogames.length}
						gamesByPage={gamesByPage}
						paginated={paginated}
					/>
				</div>
				<div className={s.containerAllGames}>
					<div>
						<AllGames currentGame={currentGame} className={s.cards} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
