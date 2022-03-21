const express = require('express');
const router = express();
const {getPlatforms} = require('../controllers/platforms');


router.get('/', getPlatforms)


module.exports = router;




