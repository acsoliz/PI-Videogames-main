const { default: axios } = require('axios');
const express = require('express');
const { Op } = require('sequelize');
const router = express();
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

//______________________getAllGenres_ ______________________________________

async function getAllGenres(req, res, next) {
	const { genre } = req.query;
	try {
		let allgenres = await Genre.findAll({ attributes: [ 'name' ] });
		const uniques = Array.from(new Set(allgenres.map((el) => el.name))).map((name) => {
			return allgenres.find((el) => el.name === name);
		});
		res.send(uniques);
	} catch (error) {
		console.log(error);
	}
}

module.exports = { getAllGenres };
