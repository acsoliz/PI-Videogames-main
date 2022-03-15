const { default: axios } = require('axios');
const express = require('express');
const { Op } = require('sequelize');
const router = express();
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

//______________________getAllGenres_ ______________________________________
async function getAllGenres(req, res, next) {
    let Allgenre = await Genre.findAll();
        
}

module.exports = { getAllGenres };