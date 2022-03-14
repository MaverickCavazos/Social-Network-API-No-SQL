const router = require('express').Router();
const {
  getThoughts,
  getThoughtsById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');


router 
.route('/')
.get(getThoughts);

router
.route('/:id')
.get(getThoughtsById)
.put(updateThought)
.delete(removeThought)

router
.route('/:userId')
.post(addThought);

router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);


router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;