const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find()
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    },

    getUserById({ params }, res) {
        console.log('user')
        User.findById(params.userId)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.json(err);
            });
    },

    createNewUser({ body }, res) {
        User.create(body)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    updateUserById({ params, body }, res) {
        User.findByIdAndUpdate(params.userId, body, { new: true })
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.json(err);
            });
    },

    deleteUserById({ params }, res) {
        User.findByIdAndDelete(params.userId)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.json(err);
            });
    },

    addFriendToUser({ params }, res) {
        User.findByIdAndUpdate(
            params.userId,
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.json(err);
            });
    },

    deleteFriendById({ params }, res) {
        User.findByIdAndUpdate(
            params.userId,
            { $pull: { friends: params.friendId } },
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

module.exports = userController; 