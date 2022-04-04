// import our methods from the controller directory "destructured userController object"
const {getAllUsers,createUser} = require('../../controllers/user-controller');
// get our express router instance going
const router = require('express').Router();

router
.route('/')
.get(getAllUsers)
.post(createUser);
module.exports = router;
