const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
    addFriendToUser,
    deleteFriendById
} = require('../../controllers/user-controller')

router.route('/:userId/friends/:friendId')
    .post(addFriendToUser)
    .delete(deleteFriendById)

router.route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)

router.route('/')
    .get(getAllUsers)
    .post(createNewUser)





module.exports = router;