const express = require('express');
const { Op } = require('sequelize');
const router = express();
const { Videogame, Genre } = require('../db');

//_____________ All Characters && Filter By Name_________
async function getAllGames(req, res, next) {
	const { name } = req.query;
	try {
		if (!name) {
			const AllGames = await Videogame.findAll();
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
	console.log( idVideogame, 'SOy getById en controllers')
	try {
		const dbVideogame = await Videogame.findAll({
			where : {
				id : idVideogame
			}
		});
		 console.log(dbVideogame[0], ' linea 46 controllers filter ID')
		if (dbVideogame) {
			return res.json(dbVideogame)
			
		}
		// aqui deberia preguntar o ir a traer by id a la AIP si no lo encontre en mi db
		return res.send("NO SE HA ENCONTRAD EL ID INDICADO");
	} catch (error) {
		console.log(error);
		next(error);
	}
}

module.exports = { getAllGames, getById };
