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

    thoughts: [thoughtSchema.id],

    friends: [userSchema]
},

    {
        toJSON: {
            virtuals: true,
            getter: true,
            id: false
        }
    }
);

userSchema.virtual('friendCount').get(function(){
  return friends.length
})

const User = model('User', userSchema)

module.exports = User;