import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, createGame, getGenres, getPlatforms } from '../../redux/actions/index';

export default function Form() {
	const dispatch = useDispatch();
	const history = useNavigate();

	let allGenres = useSelector((state) => state.genres);
	allGenres = allGenres.map((e) => (e = e.name));
	const [ errors, setErrors ] = useState({ state: 'complete Form' });
	const [ state, setstate ] = useState({
		name        : '',
		rating      : 0,
		description : '',
		release     : '',
		genres      : [],
		platforms   : []
	});
	const handleInputChange = function(e) {
		e.preventDefault();
		setstate({
			...state,
			[e.target.name]: e.target.value
		});
	};
	function handleSubmit() {
		if (!state.name || !state.rating || !state.description || !state.release || !state.genres || !state.platforms) {
			return alert('Debes completar todos los campos');
		}
		return alert(`Se agrego ${state.name} con exito!`);
	}


	const platforms = getPlatforms()
	console.log(platforms)
	const [ currentPage, setCurrentPage ] = useState({}); //esto es para PLATFRMS

	useEffect(
		() => {
			dispatch(getGenres());
			dispatch(getPlatforms())
		},
		[ dispatch ]
	);

	return (
		<div>
			<Link to="/home">volver⮨</Link>
			<div>
				<h1>CREATE A NEW VIDEOGAME</h1>
				<form onSubmit={() => handleSubmit()}>
					{
						state.name === '' ? <p>Debes completar todos los campos :D</p> :
						null}
					<div>
						<label>🅰Name:</label>
						<input
							type="text"
							name="name"
							value={state.name}
							onChange={handleInputChange}
							placeholder="Ingrese un nombre"
						/>
					</div>
					<br />

					{
						state.rating === '' ? <p>Asigna un rating</p> :
						null}
					<div>
						<label>⭐Rating:</label>
						<select name="rating" value={state.rating} onChange={handleInputChange}>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</div>
					<br />
					<div>
						<label>💭Description:</label>
						<textarea
							name="description"
							id=""
							cols="30"
							rows="10"
							name="description"
							value={state.description}
							onChange={handleInputChange}
						/>
					</div>
					<br />
					<div>
						<label>📆Release:</label>
						<input name="release" type="date" value={state.release} onChange={handleInputChange} />
					</div>
					<br />
					<div>
						<label>🔖Genres: </label>
						<div>
							<select value={1} onChange={(e) => ({})}>
								{/* handleGenreChange */}
								<option value={1}>--Select genres--</option>
								{allGenres.map((genre, i) => {
									return (
										<option key={i} value={i + 1}>
											{genre}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<br />
					<div>
						<label> 🎮Platforms:</label>
						<select>
							<option>--Select platforms--</option>
						</select>
					</div>
					<br />
					<div>
						<label>📸image:</label>
						<input
							type="text"
							name="image"
							value={state.image}
							onChange={handleInputChange}
							placeholder="Ingrese la URL de la imagen"
						/>
					</div>
					<br />
					<button type="submit">Create Game</button>
				</form>
			</div>
		</div>
	);
}
