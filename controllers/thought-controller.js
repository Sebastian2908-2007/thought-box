const { User,Thought } = require('../models');


const ThoughtController = {
getAllThoughts(req,res) {
    Thought.find({})
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},
getThoughtById({params},res) {
    Thought.findOne({_id: params.id})
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).res.json({message: 'no thought found with that id!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},

createThought({params,body},res) {
    Thought.create(body)
    .then(({_id}) => {
        return User.findByIdAndUpdate({_id: params.userId},{$push: {thoughts: _id}},{new: true});
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'no user with that id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},

updateThought({params,body},res) {
    Thought.findOneAndUpdate({_id: params.id},body,{new: true})
    .then(dbThoughtData=> {
        if(!dbThoughtData) {
            res.status(404).json({message: 'no Thought found with that id!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},

addReaction({ params, body }, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId},{$push: {reactions: body}},{new: true})
    .then(dbThoughtData => {
        if(!dbThoughtData) {
           return res.status(400).json({message: 'no thought found with that id'});
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},

// delete a reaction to a thought
deleteReaction({params}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId},{ $pull: {reactions: {reactionId: params.reactionId}} },{new: true})
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            return res.status(404).json({message: 'no thought found with that id!'})
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},

deleteThought({ params }, res) {
    Thought.findOneAndDelete({_id: params.thoughtId})
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({message:'no thought with that id!'});
            return;
        }
       return User.findOneAndUpdate(
           // its important in mongoose for id to be declared __id
           { _id: params.userId },
           { $pull: { thoughts: params.thoughtId }},
           { new: true}
            );
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({mesage: 'no user found with that id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    });
}

};



module.exports = ThoughtController;