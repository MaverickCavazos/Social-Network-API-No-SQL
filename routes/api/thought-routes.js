const router = require('express').Router();
const {
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');


router.route('/:userId').post(addThought);


router
  .route('/:userId/:ThoughtId')
  .put(addReaction)
  .delete(removeThought);


router.route('/:userId/:ThoughtId/:reactionId').delete(removeReaction);

module.exports = router;