const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: String,
        default: new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: 'Text is required',
        max: 280
    },

    username: {
        type: String,
        required: 'Username is required',
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Text is required',
        min: 1,
        max: 280
        //must be between 1-280 characters
    },

    createdAt: {
        type: Date,
        default: Date.now
        // getter method to format timestamp on query 
    },

    username: {
        type: String,
        required: 'Username is required'
    },

    reactions: [reactionSchema]

},
    {
        toJSON: {
            virtuals: true,
            getters: true,
            id: false
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought; 