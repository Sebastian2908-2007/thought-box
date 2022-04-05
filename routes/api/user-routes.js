// import our methods from the controller directory "destructured userController object"
const {getAllUsers,getUserById,updateUser,createUser,addFriend,deleteUser,deleteFriend} = require('../../controllers/user-controller');
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

// add and delete a friend /api/users/:userId/friends/:friendId
router 
.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(deleteFriend);

module.exports = router;
