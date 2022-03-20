const express = require('express');
const router = express();
const {getAllGenres} = require('../controllers/genres');


router.get('/', getAllGenres)


module.exports = router;





