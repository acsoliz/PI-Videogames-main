const express = require('express');
const router = express();

const {getAllGames} = require('../controllers/videogames');

router.get('/', getAllGames)

module.exports = router;