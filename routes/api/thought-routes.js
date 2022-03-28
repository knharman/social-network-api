const router = require('express').Router();
const {
    getAllThoughts,
    createNewThought,
    getThoughtById,  
    updateThoughtById, 
    deleteThoughtById,
    createReaction,
    deleteReactionById
} = require('../../controllers/thought-controller')

router.route('/')
    .get(getAllThoughts)
    .post(createNewThought)

router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById)

router.route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReactionById)

module.exports = router;