const express = require('express');
const router = express();

const {getAllGames, getById} = require('../controllers/videogames');

router.get('/', getAllGames)// by Name && VideoGames

router.get('/:idVideogame', getById)



module.exports = router;
