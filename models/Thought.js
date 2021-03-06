const {Schema,model,Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Reaction_Schema = new Schema({
     reactionId: {
         type: Schema.Types.ObjectId,
         default: () => new Types.ObjectId()
     },
     reactionBody: {
         type: String,
         required: true,
         max: [280,'to many words! tone it down...'],
         trim: true
     },
     username: {
         type: String,
         required: true,
         trim: true 
     },
     createdAt: {
         type: Date,
         default: Date.now,
         get: () =>  dateFormat()
     }

},
{
    toJSON: {
        getters: true
    }
}
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: [1, 'you need at least one letter!'],
        max: 280,
        trim: true
    },
    createdAt: {
        type:  Date,
        default: Date.now,
        get: () =>  dateFormat()
    },
    username: {
        type: String,
        required: true,
        trim: true 
    },
    reactions:[Reaction_Schema]
},
{
    toJSON: {
        virtuals: true,
        getters: true 
    },
    id: false
}
);
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought',ThoughtSchema);

module.exports = Thought;