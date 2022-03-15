const express = require('express');
const router = express.Router();

router.use(express.json());

const videogames = require('./videogames.js');
const genres = require('./genres.js');

router.use('/videogames', videogames);
//router.use('/genres', genres);
router.use('/genres',()=>{} );


module.exports = router;
