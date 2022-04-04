const {Schema,model} = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: [1, 'you need at least one letter!'],
        max: 280
    },
    createdAt: {
        type:  Date,
        default: Date.now,
    }
})