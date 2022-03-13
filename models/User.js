const { Schema, model, ObjectId } = require('mongoose');
const Thought = require('./Thought')

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

    thoughts: [ObjectId],

    friends: [ObjectId]
},

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

const User = model('User', userSchema)

module.exports = User;