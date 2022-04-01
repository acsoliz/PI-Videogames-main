import { getAllGames, filterByGenres, filterDb, sortByAlph, sortByRating } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import VideoGame from '../VideoGame/VideoGame';
import SearchBar from '../SearchBar/SearchBar';
import Paginated from '../Paginated/Paginated';
import AllGames from '../AllGames/AllGames';
import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import s from './Home.module.css';




const Home = () => {
	const dispatch = useDispatch();
	const videogames = useSelector((state) => state.videogames);
	const genres = useSelector((state) => state.genres);

	//--------------mostrar los vIDEOJUEGOS
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
	const [ gamesByPage, setGamesByPage ] = useState(15); // Cuantos videojuegos por page
	const lastGame = currentPage * gamesByPage;
	const firstGame = lastGame - gamesByPage;
	const currentGame = videogames && videogames.slice(firstGame, lastGame); //

	//----------------trraigo los videojuegos cuando el componente se monta

	const [ auxiliar, setAuxiliar ] = useState(); //Pagina actual
	useEffect(() => {            
    setAuxiliar(videogames)
	setCurrentPage(1)
  }, [videogames])              //de lo que depende


	const paginated = (pageNum) => {
		console.log("Estoy dentro de PAGINATED ")
		setCurrentPage(pageNum);
	};
	//---------------------------------------
	//----------------Ordenarlos-------------
	const [ sort, setSort ] = useState('');

	function handleSortAlph(e) {
		e.preventDefault();
		dispatch(sortByAlph(e.target.value));
		setSort(e.target.value);
	}

	function habdleSortRating(e) {
		e.preventDefault();
		dispatch(sortByRating(e.target.value));
		setSort(e.target.value);
	}
	//--------------- REFRESCAR----------------------
	function handleClick(e) {
		e.preventDefault();
		dispatch(getAllGames());
	}
	//---------------------------------------

	return (
		<div>
			{console.log("Home ",currentPage)}
			<button className={s.volver} onClick={(e) => handleClick(e)}>
				RELOAD⮨
			</button>

			<div className={s.container}>
				<div className={s.search}>
					<SearchBar />
				</div>

				<Link to={'/create'} className={s.toCreate}>
					Create Videogame
				</Link>
				<div className={s.controlls}>
					<div>
						<select onChange={(e) => handleOnChange(e)}>
							<option value={'All'}>Genres</option>
							{genres && genres.map((el, i) => <option key={i}>{el.name}</option>)}
						</select>
					</div>
					<div>
						<select className={s.selectFilter} onChange={(e) => handleDbFilter(e)}>
							{/* <option defaultValue="true" disabled="disabled">Creation</option> */}
							<option value={'All'}>From</option>
							<option value={true}>Created</option>
							<option value={false}>From Api</option>
						</select>
					</div>

					<div>
						<div>
							<select
								className={s.selectFilter}
								onChange={(e) => {
									handleSortAlph(e);
								}}
							>
								<option >a-z or za</option>
								<option value="a-z">A-Z</option>
								<option value="z-a">Z-A</option>
							</select>
						</div>
					</div>
					<div>
						<div>
							<select
								className={s.selectFilter}
								onChange={(e) => {
									habdleSortRating(e);
								}}
							>
								<option >Rating</option>
								<option value="most">Most</option>
								<option value="less">Less</option>
							</select>
						</div>
					</div>
				</div>

				<div className={s.paginated}>
					<Paginated
						videogames={videogames && videogames.length}
						gamesByPage={gamesByPage}
						paginated={paginated}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</div>
				<div className={s.containerAllGames}>
					<AllGames currentGame={currentGame} className={s.cards} />
				</div>
				<Paginated
					videogames={videogames && videogames.length}
					gamesByPage={gamesByPage}
					paginated={paginated}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
};

export default Home;
