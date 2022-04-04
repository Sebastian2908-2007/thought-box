// require Schema constructor and model method from mongoose
const {Schema,model} = require('mongoose');

// function for email validation
const isEmail = email => {
const emailTester = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
return emailTester.test(email);
};

const UserSchema =  new Schema(
    {
       username: {
           type: String,
           unique: true,
           required: true,
           trim: true 
       },
       email: {
           type: String,
           required: true,
           unique: true,
           validate: [isEmail, 'Please use a valid email address!!!']
           // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
       },
       thoughts: [
           {
               type: Schema.Types.ObjectId,
               ref: 'Thought'
           }
       ],
       friends: [
           {
               type:Schema.Types.ObjectId,
               ref: 'User'
           }
       ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true 
        },
        id: false
    }
    );

    UserSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    })
   
    const User = model('User',UserSchema);

    module.exports = User;