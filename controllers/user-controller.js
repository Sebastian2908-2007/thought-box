 const User = require('../models/User');

 // controller object containing all off our user route logic as methods
 const userController = {
     getAllUsers(req,res) {
         User.find({})
         .populate({
             path:'thoughts',
             path: 'friends',
             select: '-__v'
         })
         .select('-__v')
         .sort({_id: -1})
         .then(dbUserData => res.json(dbUserData))
         .catch(err => {
             console.log(err);
             res.status(400).json(err);
         })
     },

     createUser({body},res) {
       User.create(body)
       .then(dbUserData => res.json(dbUserData))
       .catch(err => res.status(400).json(err));
     }
 };

 module.exports = userController;