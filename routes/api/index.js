// get our expres router instance going
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./Thought-routes');

// consume our thought routes
router.use('/thoughts',thoughtRoutes);
// consume the user routes
router.use('/users',userRoutes);

module.exports = router;