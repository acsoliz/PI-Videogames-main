const express = require('express');
const router = express();
const {getAllGames, getById, createGame} = require('../controllers/videogames');

router.get('/', getAllGames) // by Name && VideoGames

router.get('/:idVideogame', getById)

router.post('/', createGame)





module.exports = router;
