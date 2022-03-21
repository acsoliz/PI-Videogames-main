const { default: axios } = require('axios');
const express = require('express');
const { Op } = require('sequelize');
const router = express();
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

//_____________ All Characters && Filter By Name_________
async function getAllGames(req, res, next) {
	const { name } = req.query;
	try {
		if (!name) {
			let AllGames = await Videogame.findAll({
				include : {
					model      : Genre,
					attributes : [ 'name' ],
					through    : {
						attributes : []
					}
				}
			});
			AllGames = AllGames.map((e) => {
				return {
					name             : e.dataValues.name,
					background_image : e.dataValues.background_image,
					genres           : e.dataValues.genres.map((e) => e.dataValues.name).join(', '),
					id               : e.id,
					db               : e.db,
					rating           : e.rating
				};
			});
			// console.log('Soy All Games DETALEEEEEEESSS', AllGames);

			return res.send(AllGames);
		}

		let byName;
		if (name) {
			byName = await Videogame.findAll({
				where : {
					name : {
						[Op.iLike]: `%${name}%`
					}
				}
			});
		} else {
			console.log("We can't find the VideoGame, please check the name ");
		}
		return res.send(byName);
	} catch (error) {
		console.log(error);
		next(error);
	}
}
//__________ Filter By Id___________

async function getById(req, res, next) {
	const { idVideogame } = req.params;
	try {
		if (!idVideogame.includes('-')) {
			let detailsApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
			const detail = {
				id               : detailsApi.data.id,
				name             : detailsApi.data.name,
				background_image : detailsApi.data.background_image,
				genresString     : detailsApi.data.genres.map((el) => el.name),
				released         : detailsApi.data.released,
				rating           : detailsApi.data.rating,
				description      : detailsApi.data.description,
				platforms        : detailsApi.data.platforms.map((el) => el.platform.name)
			};

			return res.json(detail);
		}
		const dbVideogame = await Videogame.findAll({
			where : {
				id : idVideogame
			}
		});
		if (dbVideogame) {
			return res.json(dbVideogame[0]);
		}
		// aqui deberia preguntar o ir a traer by id a la AIP si no lo encontre en mi db
		return res.send('NO SE HA ENCONTRAD EL ID INDICADO');
	} catch (error) {
		console.log(error);
		next(error);
	}
}

// __________ Create VideoGame___________
async function createGame(req, res, next) {
	let { name, background_image, description, released, rating, genres, platforms } = req.body;

	if (!name || !description || !released || !genres) return res.status(400).send('TE FALTA ALGOOOOO!!');
	try {
		const game = await Videogame.create({
			name,
			background_image,
			description,
			released,
			rating,
			platforms
		});

		const genre = await Genre.findAll({
			where : {
				name : genres
			}
		});
		game.addGenre(genre);
		res.send('Videogame creado con exito');
	} catch (error) {
		console.log('No se pudo crear', error);
	}
}


module.exports = { getAllGames, getById, createGame };
