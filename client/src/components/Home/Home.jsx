import React, {useState}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VideoGame from '../VideoGame/VideoGame';
import SearchBar from '../SearchBar/SearchBar';
import { getAllGames, filterByGenres, filterDb } from '../../redux/actions/index';
import s from './Home.module.css';
import Paginated from '../Paginated/Paginated';
const Home = () => {
	const dispatch = useDispatch();

	const videogames = useSelector((state) => state.videogames);
		//--------------mostrar los VIDOGAMES
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

	// //--------------paginado
	const [ currentPage, setCurrentPage ] = useState(1); //Pagina actual
	const [ gamesByPage, setGamesByPage ] = useState(15); // Cuantos paises por page
	const lastGame = currentPage * gamesByPage;
	const firstGame = lastGame - gamesByPage;
	const currentCountries = videogames && videogames.slice(firstGame, lastGame);
	console.log(currentCountries); // array con nueve paises

	const paginated = (pageNum) => {
		setCurrentPage(pageNum);
	};
	//---------------------------------------

	return (
		<div>
			<div>
				<div>
					<Paginated
						videogames={videogames?videogames.length:100}
						gamesByPage={gamesByPage}
						paginated={paginated}
					/>
				</div>		
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
				<div className={s.cards}>
					{
						videogames.length > 0 ? videogames.map((e) => (
							<div key={e.id}>
								<VideoGame name={e.name} image={e.background_image} genres={e.genres} id={e.id} />
							</div>
						)) :
						<div>Loading...</div>}
				</div>
			</div>
		</div>
	);
};

export default Home;
