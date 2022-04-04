const {getAllThoughts,getThoughtById,updateThought,createThought,deleteThought} = require('../../controllers/thought-controller');
const router = require('express').Router();

// get all thoughts /api/thoughts
router 
.route('/')
.get(getAllThoughts)

// get single thought /api/thoughts/:id
router 
.route('/:id')
.get(getThoughtById)
.put(updateThought);

// create thought and add to a particular user /api/thoughts/:userId
router 
.route('/:userId')
.post(createThought);

// delete thought /api/thoughts/:userId/:thoughtId
router 
.route('/:userId/:thoughtId')
.delete(deleteThought);





module.exports = router;