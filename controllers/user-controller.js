 const User = require('../models/User');

 // controller object containing all off our user route logic as methods
 const userController = {
     // logic for getting all users
     getAllUsers(req,res) {
         User.find({})
         .populate({
             path:'thoughts',
             select: '-__v'
         })
         .populate({
             path:'friends',
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
// logic to get a user by id
getUserById({params},res) {
   User.findOne({_id: params.id})
   .populate({
       path: 'thoughts',
       select: '-__v'
   })
   .populate({
       path: 'friends',
       select: '-__v'
   })
   .select('-__v')
   .then(dbUserData => {
       if(!dbUserData) {
           res.status(404).json({message:'no user found with that id'});
           return;
       }
       res.json(dbUserData);
   })
   .catch(err => {
       console.log(err);
       res.status(400).json(err);
   })
},
// logic to update a user
updateUser({params,body},res) {
    User.findByIdAndUpdate({_id: params.id},body,{new: true, runValidators: true})
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'no user found with that id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},
// logic to create a user
     createUser({body},res) {
       User.create(body)
       .then(dbUserData => res.json(dbUserData))
       .catch(err => res.status(400).json(err));
     },
// logic to delete a user
     deleteUser({params},res) {
         User.findOneAndDelete({_id: params.id})
         .then(dbUserData => {
             if(!dbUserData) {
                 res.status(404).json({mesage: 'no user found matching that id!'});
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
     }
 };

 module.exports = userController;