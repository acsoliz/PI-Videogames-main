const { default: axios } = require('axios');
const express = require('express');
const { Op } = require('sequelize');
const router = express();
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
const API_GENRES = 'https://api.rawg.io/api/genres?key=';

//______________________getAllGenres_ ______________________________________

async function getAllGenres(req, res, next) {
	const AllGenres = await axios(`${API_GENRES}${API_KEY}`);

	const genres =
		AllGenres &&
		AllGenres.data.results.map((e) => {
			return {
				name : e.name
			};
		});
	for (let genre of genres) {
		Genre.create({
			name : genre.name
		});
	}

	try {
	} catch (error) {
		console.log('ERROR AL CREAR DB GENRES', error);
	}

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
async function getApiGenres() {}
// const maxId = await Videogame.max('id');
// // console.log(maxId, "soy el id");
// if (!maxId) {
// 	const AllGenres = await axios(`${API_GENRES}${API_KEY}`);

// 	const genres =
// 		AllGenres &&
// 		AllGenres.data.results.map((e) => {
// 			return {
// 				name : e.name
// 			};
// 		});
// 	for (let genre of genres) {
// 		Genre.create({
// 			name : genre.name
// 		});
// 	}

// 	try {
// 	} catch (error) {
// 		console.log('ERROR AL CREAR DB GENRES', error);
// 	}

module.exports = { getAllGenres, getApiGenres };
