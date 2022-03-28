const router = require('express').Router();
const { User } = require('../../models');

//Get all users
router.get('/', (req, res) => {
    User.find()
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

//Get single user by id
router.get('/:userId', ({ params }, res) => {
    User.findById(params.userId)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
})

// Create a new user
router.post('/', ({ body }, res) => {
    User.create(body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

//Update a user by id
router.put('/:userId', ({ params, body }, res) => {
    User.findByIdAndUpdate(params.userId, body, { new: true })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
});

//delete a user by id
router.delete('/:userId', ({ params }, res) => {
    User.findByIdAndDelete(params.userId)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
})

//add a new friend to user
router.post('/:userId/friends/:friendId', ({ params}, res) => {
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
});

//delete a friend by id
router.delete('/:userId/friends/:friendId', ({ params}, res) => {
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
});

module.exports = router;