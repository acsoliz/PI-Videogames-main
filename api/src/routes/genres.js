const express = require('express');
const { Op } = require('sequelize');
const router = express();
const { Videogame, Genre } = require('../db');

//_______________________ All Characters && Filter By Name______________________________________
async function getAllGenres(req, res, next) {
    console.log('Hola soy el Get de getAllGenres')
}

module.exports = { getAllGenres };