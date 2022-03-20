const { default: axios } = require('axios');
const express = require('express');
const { Op } = require('sequelize');
const router = express();
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

//______________________getAllGenres_ ______________________________________

async function getAllGenres(req, res, next) {
	const { genre } = req.query;
    console.log("NO se donde estoy , soy el error")
	try {
		let allgenres = await Genre.findAll({attributes:['name']});
		console.log(allgenres);

		res.send(allgenres);
	} catch (error) {
		console.log(error);
	}
  
}

module.exports = { getAllGenres };
