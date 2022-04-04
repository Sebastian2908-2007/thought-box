// set up our express router instance
const router = require('express').Router();
const apiRoutes = require('./api');

// consume our api routes from api dir
router.use('/api',apiRoutes);

module.exports = router;