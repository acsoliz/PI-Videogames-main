const { default: axios } = require('axios');
const express = require('express');
const { Op } = require('sequelize');
const router = express();
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
const API_GENRES = 'https://api.rawg.io/api/genres?key=';
const API_GAMES = 'https://api.rawg.io/api/games?key=';

//_____________ All Characters && Filter By Name_________
async function getAllGames(req, res, next) {
	const { name } = req.query;
	// console.log("Me estan enviando esto desde el Front",name)
	try {
		if (!name) {
			//---- ALL
			let AllGames = await Videogame.findAll({
				include : {
					model      : Genre,
					attributes : [ 'name' ]
				}
			});
			AllGames = AllGames.map((e) => {
				return {
					name             : e.name,
					background_image : e.background_image,
					genres           : e.genres.map((e) => e.name).join(', '),
					id               : e.id,
					db               : e.db,
					rating           : e.rating
				};
			});
			//------------------ traigo la info de mi API

			let array = [];
			for (let i = 1; i < 6; i++) {
				const resultsArray = await axios(`${API_GAMES}${API_KEY}&page=${i}`);
				array.push(resultsArray.data.results);
			}
			array = array.flat(); //

			array = array.map((el) => {
				// foreach
				return {
					id               : el.id,
					name             : el.name,
					background_image : el.background_image,
					rating           : el.rating,
					platforms        :
						el.platforms.length[2] ? el.platforms.map((e) => e.platforms.name) :
						'--',
					genres           : el.genres.map((el) => el.name).join(', '),
					released         : el.released
				};
			});
			// console.log('verificando una vez mas las rutas ', array[0], AllGames[0]);
			const apiWhithDb = [ ...array, ...AllGames ];
			// console.log(apiWhithDb.length);

			res.send(apiWhithDb); //
		} else {
			//------------By Name
			let byName;
			byName = await Videogame.findAll({
				where : {
					name : {
						[Op.iLike]: `%${name}%`
					}
				}
			});
			let response = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`));
			// console.log(response.data.results[0])
			var responseApi = response.data.results[0] && response.data.results.map((el) => {
				// foreach
				return {
					id               : el.id,
					name             : el.name,
					background_image : el.background_image,
					rating           : el.rating,
					platforms        :
					el.platforms.length[2] ? el.platforms.map((e) => e.platforms.name) :
					'--',
					genres           : el.genres.map((el) => el.name).join(', '),
					released         : el.released
				};
			});
			if (!responseApi){
				return res.send("We can't find the VideoGame, please check the name ");
			}
			const responseALl = [...byName, ... responseApi ]
			console.log("Soy la response de APi y DB ", responseALl)

			if (responseALl.length < 1) {
				res.send("We can't find the VideoGame, please check the name ");
				// res.status(404).send("We can't find the VideoGame, please check the name ");
			} else res.send(responseALl);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
}
//__________ Filter By Id___________

async function getById(req, res, next) {
	const { idVideogame } = req.params;
	//const id = req.params.idVideogame;
	try {
		if (!idVideogame.toString().includes('.')) {
			const detailsApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
			const detail = {
				id               : detailsApi.data.id,
				name             : detailsApi.data.name,
				background_image : detailsApi.data.background_image,
				genresString     : detailsApi.data.genres.map((el) => el.name),
				released         : detailsApi.data.released,
				rating           : detailsApi.data.rating,
				description      : detailsApi.data.description_raw,
				platforms        : detailsApi.data.platforms.map((el) => el.platform.name)
			};

			res.send(detail);
		} else {
			const detailsDb = await Videogame.findOne({
				where   : { id: idVideogame },
				include : {
					model      : Genre,
					attributes : [ 'name' ]
					// where:{ id : {$col: 'Genre.id'}}
				}
			});
			const detaildb = {
				id               : detailsDb.id,
				name             : detailsDb.name,
				background_image : detailsDb.background_image,
				genresString     : detailsDb.genres.map((el) => el.name),
				released         : detailsDb.released,
				rating           : detailsDb.rating,
				description      : detailsDb.description,
				platforms        : detailsDb.platforms
			};
			res.send(detaildb);
		}
	} catch (error) {
		res.send('videogame not found');
		// res.status(404).send('videogame not found');
	}
}

// __________ Create VideoGame___________
async function createGame(req, res, next) {
	let { name, image, description, released, rating, genres, platforms } = req.body;
	platforms = platforms.join(', ');
	let existe;
	let id;
	const maxId = await Videogame.max('id'); //Select MAX
	do {
		id = maxId + 10 * Math.random(); //
		existe = await Videogame.findOne({
			where      : { id: id },
			attributes : [ 'id' ]
		});
	} while (existe === id);

	const errors = [];
	if (Array.isArray(genres)) {
		let errorFound = false;
		genres.forEach((genre) => {
			if (typeof genre != 'string') {
				errorFound = true;
			}
		});
		if (errorFound) errors.push('some of the genres do not exist ');
	} else {
		errors.push('Genres is not an Array');
	}
	if (typeof platforms != 'string') {
		errors.push("platforms should be an string. EJ: 'Xbox, PSI' ");
	}
	if (name == null) errors.push('the name field cannot be empty');
	if (!rating) {
		errors.push('rating should be an integer number between 1 and 5');
	}
	if (typeof released != 'string') {
		errors.push("released should be an string. EJ: '03-15-2018' ");
	}
	if (description.length < 6) {
		errors.push('must be a string and must contain more than 10 characters ');
	}
	if (errors.length > 0) {
		return res.status(400).send(errors);
	}

	try {
		const game = await Videogame.create({
			id,
			name,
			background_image : image,
			description,
			released,
			rating,
			platforms,
			db               : true
		});
		const genresDB = await Genre.findAll({
			where : {
				name : genres
			}
		});
		var genresSlice = genresDB.slice(0, genres.length);

		game.addGenre(genresSlice);
		res.send('Videogame creado con exito');
	} catch (error) {
		console.log('No se pudo crear', error);
	}
}

//--------------------------------------DELETE -------------------------------------------------

async function deleteGame(req, res, next) {
	try {
		const id = req.params.idVideogame;
		let videogame = await Videogame.destroy({
			where   : { id: id },
			include : {
				model      : Genre,
				attributes : [ 'name' ]
			}
		});

		res.send('Complete Destruction ');
	} catch (error) {
		console.log('videogame cannot be deleted', error);
	}
}

module.exports = { getAllGames, getById, createGame, deleteGame };
