const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },

    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        // Must match a valid email address (look into Mongoose's matching validation)
    },

    thoughts: [thoughtSchema],

    friends: //self-refernce
},

    {
        toJSON: {
            virtuals: true,
            getter: true,
            id: false
        }
    }
);

// UserSchema.virtual('username').get(function(){
//   this.email.split('@')
//   return username[0]
// })

const User = model('User', userSchema)

module.exports = User;