const { default: axios } = require('axios');
const express = require('express');
const router = express();
const { API_KEY } = process.env;
const URL_PLATFORM = `https://api.rawg.io/api/platforms?key=`

//____________________________GetPlatforms_________________________________

async function getPlatforms(req, res, next) {
	let allPlatforms = await axios.get(`${URL_PLATFORM}${API_KEY}`);
	allPlatforms = allPlatforms.data.results.map((e) => e.name);
	res.send(allPlatforms);
}



module.exports = { getPlatforms };



