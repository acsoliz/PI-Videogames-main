import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, createGame, getGenres, getPlatforms } from '../../redux/actions/index';

export default function Form() {
	const dispatch = useDispatch();
	const history = useNavigate();

	let allGenres = useSelector((state) => state.genres);
	let allPlatforms = useSelector((state) => state.platforms);

	allGenres = allGenres.map((e) => (e = e.name));
	const [ error, setError ] = useState({ state: 'complete Form' });
	const [ state, setstate ] = useState({
		name        : '',
		rating      : 0,
		description : '',
		release     : '',
		genres      : [],
		platforms   : []
	});
	//----------------------->  name, rating, description, release IMAGE
	const handleInputChange = function(e) {
		e.preventDefault();
		setstate({
			...state,
			[e.target.name]: e.target.value
		});
	};
	//------------>  GENERO
	const handleGenreChange = function(e) {
		if (!state.genres.includes(e.target.value)) {
			setstate({
				...state,
				genres : [ ...state.genres, e.target.value ]
			});
		}
	};

	const handleDelete = function(e) {
		e.preventDefault();
		setstate({
			...state,
			genres : [ ...state.genres.filter((g) => g != e.target.value) ]
		});
	};

	// //--------------->   PLATFORMS
	const handlePlatformsChange = function(e) {
		if (!state.platforms.includes(e.target.value)) {
			setstate({
				...state,
				platforms : [ ...state.platforms, e.target.value ]
			});
		}
	};
	const handlePlatformDelete = function(e) {
		e.preventDefault();
		setstate({
			...state,
			platforms : [ ...state.platforms.filter((g) => g != e.target.value) ]
		});
	};

	// ----------------> POSTEO
	const handleSubmit = function(e) {
		if (!state.name || !state.rating || !state.description || !state.release || !state.genres || !state.platforms) {
			e.preventDefault();
			alert('Debes completar todos los campos');
		} else {
			console.log("i'M ESTATEee complete!  ", state);
			e.preventDefault();
			dispatch(createGame(state));
			alert('VIdeoJuego Creado');
		}
	};

	useEffect(
		() => {
			dispatch(getGenres());
			dispatch(getPlatforms());
		},
		[ dispatch ]
	);

	return (
		<div>
			<Link to="/home">volver⮨</Link>
			<div>
				<h1>CREATE A NEW VIDEOGAME</h1>
				<form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
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
							<select name="genres" onChange={(e) => handleGenreChange(e)}>
								<option>--Select genres--</option>
								{allGenres &&
									allGenres.map((genre, i) => {
										return <option key={i}>{genre}</option>;
									})}
							</select>
						</div>
						<div>
							{state.genres.map((element, i) => (
								<span key={i}>
									<span>{element} </span>
									<button value={element} onClick={(e) => handleDelete(e)}>
										x
									</button>
								</span>
							))}
						</div>
					</div>

					<br />
					<div>
						<label> 🎮Platforms:</label>
						<div>
							<select name="platforms " onChange={(e) => handlePlatformsChange(e)}>
								<option>--Select platforms--</option>
								{allPlatforms &&
									allPlatforms.map((platform, i) => {
										return <option key={i}>{platform}</option>;
									})}
							</select>
						</div>
						<div>
							{state.platforms.map((element, i) => (
								<span key={i}>
									<span>{element} </span>
									<button value={element} onClick={(e) => handlePlatformDelete(e)}>
										x
									</button>
								</span>
							))}
						</div>
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

// function validate(input, value) {

//     switch (input) {
//         case 'name':
//             if(value === '') {
//                 return setError({...error, name: ''})
//             }
//             if(!/^[A-Za-z0-9\u00C0-\u017F ]+$/.test(value)){
//                 return setError({...error, name: 'Not special characters'})
//             } else {
//                 return setError({...error, name: ''})
//             };
//         case 'description':
//             if(value === '') {
//                 return setError({...error, description: ''})
//             }
//             if(value.replace(/\s/g, '').length < 10) {
//                 return setError({...error, description: 'At least ten characters required'})
//             }
//             else {
//                 return setError({...error, description: ''})
//             }
//         case 'image':
//             if(value === ''){
//                 return setError({...error, image: ''})
//             }
//             else if(!/[(http(s)?)://(www.)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/ig.test(value)){
//                 return setError({...error, image: 'Invalid URL'})
//             } else {
//                 return setError({...error, image: ''})
//             };
//         case 'rating':
//             if(value === ''){
//                 return setError({...error, rating: ''})
//             }
//             if(!/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(value)){
//                 return setError({...error, rating: 'Should only be numeric characters'})
//             }else if(parseFloat(value) < 1 || parseFloat(value) > 5){
//                 return setError({...error, rating: 'Should be between 1-5'})
//             }
//             else {
//                 return setError({...error, rating: ''})
//             }
//         default :
//             return error;
//     }
// }
