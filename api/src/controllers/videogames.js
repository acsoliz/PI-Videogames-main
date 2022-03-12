const express = require('express');
const { Op } = require('sequelize');
const router = express();
const { Videogame, Genre } = require('../db');

//_______________________ All Characters && Filter By Name______________________________________
async function getAllGames(req, res, next) {
	console.log('Hola soy el Get de videogames');
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

module.exports = { getAllGames };
