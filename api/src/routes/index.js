const express = require('express');
const router = express.Router();

router.use(express.json());

const videogames = require('./videogames.js');
const genres = require('./genres.js');
const platforms = require('./platforms.js');

router.use('/videogames', videogames);
router.use('/genres', genres);
router.use('/platforms', platforms)

module.exports = router;
