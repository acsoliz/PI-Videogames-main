const express = require('express');
const router = express();
const {getAllGames, getById, createGame, deleteGame} = require('../controllers/videogames');

router.get('/', getAllGames) // by Name && VideoGames

router.get('/:idVideogame', getById)

router.post('/', createGame)

router.delete('/:idVideogame', deleteGame)





module.exports = router;
