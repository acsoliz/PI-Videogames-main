import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createGame, getGenres, getPlatforms } from '../../redux/actions/index';

export default function Form() {
	const dispatch = useDispatch();
	// const history = useNavigate();
	let stateGenres = useSelector((state) => state.genres);
	let allGenres = stateGenres.map((e) => (e = e.name));
	let navigate = useNavigate()
	let allPlatforms = useSelector((state) => state.platforms);

	const [ state, setstate ] = useState({
		name        : '',
		rating      : 0,
		description : '',
		released    : '',
		image       : '',
		genres      : [],
		platforms   : []
	});
	const [ error, setError ] = useState({
		name        : '',
		rating      : '',
		description : '',
		released    : '',
		image       : '',
		genres      : '',
		platforms   : ''
	});
	
	//----------------------->  name, rating, description, released IMAGE
	const handleInputChange = function(e) {
		e.preventDefault();
		setstate({
			...state,
			[e.target.name]: e.target.value
		});
		validate(e.target.name, e.target.value);
	};
	//------------>  GENERO
	const handleGenreChange = function(e) {
		if (!state.genres.includes(e.target.value)) {
			setstate({
				...state,
				genres : [ ...state.genres, e.target.value ]
			});

			setError({
				...error,
				[e.target.name]: ''
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
			setError({
				...error,
				platforms: ''
			});

		}
	};
	const handlePlatformDelete = function(e) {
		//una de las platforms{}
		e.preventDefault();
		setstate({
			...state,
			platforms : [ ...state.platforms.filter((g) => g != e.target.value) ]
		});
	};

	///////////////////////////////////////////////
	function validateSubmit() {
		var asignErrors = {};
	
		if (!state.platforms.length) {
			asignErrors = { ...asignErrors, platforms: 'Must select at least one platform' };
		}
		if (!state.genres.length) {
			asignErrors = { ...asignErrors, genres: 'Must select at least one genre' };
		}
		if (!state.name) {
			asignErrors = { ...asignErrors, name: 'Must add a name' };
		}
		if (!state.description) {
			asignErrors = { ...asignErrors, description: 'Must add a description' };
		}

		setError({ ...error, ...asignErrors });
	
		return Object.values({ ...error, ...asignErrors }).filter((value) => value !== '');

	}

	// ----------------> POSTEO
	const handleSubmit = function(e) {
		e.preventDefault();
		const flag = validateSubmit();
		if (!flag.length) {
			try {
				dispatch(createGame(state));
				alert('VideoGame Created! ');
				navigate("/home/")
			} catch (error) {
				// console.log(error);
			}
		} else {
			// console.log('atenti soy el Flag para validar: ', flag);
			alert('Missing or invalid values');
		}

		// dispatch(getAllGames())
	};

	useEffect(
		() => {
			dispatch(getGenres());
			dispatch(getPlatforms());
		},
		[ dispatch ]
	);

	function validate(state, value) {
		switch (state) {
			case 'name':
				if (value === '') {
					return setError({ ...error, name: '' });
				}
				if (!/^[A-Za-z0-9\u00C0-\u017F ]+$/.test(value)) {
					return setError({ ...error, name: 'Not special characters' });
				} else {
					return setError({ ...error, name: '' });
				}
			case 'description':
				if (value === '') {
					return setError({ ...error, description: '' });
				}
				if (value.replace(/\s/g, '').length < 10) {
					return setError({ ...error, description: 'At least ten characters required' });
				} else {
					return setError({ ...error, description: '' });
				}
			case 'image':
				if (value === '') {
					return setError({ ...error, image: '' });
				} else if (
					!/[(http(s)?)://(www.)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/gi.test(
						value
					)
				) {
					return setError({ ...error, image: 'Invalid URL' });
				} else {
					return setError({ ...error, image: '' });
				}
			case 'rating':
				if (value === '') {
					return setError({ ...error, rating: '' });
				}
			// 	if (!/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(value)) {
			// 		return setError({ ...error, rating: 'Should only be numeric characters' });
			// 	} else if (parseFloat(value) < 1 || parseFloat(value) > 5) {
			// 		return setError({ ...error, rating: 'Should be between 1-5' });
			// 	} else {
			// 		return setError({ ...error, rating: '' });
			// 	}
			default:
				return error;
		}
	}

	return (
		<div>
			<Link to="/home">HOME</Link>
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
						<span>{error.name}</span>
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
						{/* <span>{error.rating}</span> */}
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
						<span>{error.description}</span>
					</div>
					<br />
					<div>
						<label>📆Release:</label>
						<input name="released" type="date" value={state.released} onChange={handleInputChange} />
						<span>{error.released}</span>
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
						<span>{error.image}</span>
					</div>
					<br />
					<button type="submit">Create Game</button>
				</form>
			</div>
		</div>
	);
}
