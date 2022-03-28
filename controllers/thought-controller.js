const { Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findById(params.thoughtId)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.json(err);
            });
    },

    createNewThought({ body }, res) {
        const userId = body.userId
        Thought.create(body)
            .then(({ _id }) => {
                return User.findByIdAndUpdate(
                    userId,
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((userData) => {
                res.json(userData)
            })
            .catch((err) => {
                res.json(err);
            });
    },

    updateThoughtById({params, body}, res) {
        Thought.findByIdAndUpdate(params.thoughtId, body, { new: true })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
    },

    deleteThoughtById({params}, res) {
        Thought.findByIdAndDelete(params.thoughtId)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
    },

    createReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $push: { reactions: body } },
            { new: true }
        )
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.json(err);
            });
    },

    deleteReactionById({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $pull: { reactions: body } },
            { new: true }
        )
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.json(err);
            });
    }
};

module.exports = thoughtController;