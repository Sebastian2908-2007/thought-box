// import our methods from the controller directory "destructured userController object"
const {getAllUsers,getUserById,updateUser,createUser,deleteUser} = require('../../controllers/user-controller');
// get our express router instance going
const router = require('express').Router();

// Get all user and Post user routes /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

// Get one user ,Put 'update' user,and Delete a user at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;
