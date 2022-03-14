const { Thought, User } = require('../models');

const thoughtController = {

  getThoughts(req, res) {
    User.find({})
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},
getThoughtsById({ params }, res) {
  User.findOne({ _id: params.id })
  .populate({
      path: 'reactions',
      select: '-__v'
  })
  .select('-__v')
  .then(dbThoughtData => res.json(dbThoughtData))
  .catch(err => {
      console.log(err);
      res.sendStatus(400);
  });
},
updateThought({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
  .then(dbThoughtData => {
      if(!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => res.json(err));
},
  addThought({ params, body }, res) {
    console.log(params);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        console.log(dbThoughtData);
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },


  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },


  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedthought => {
        if (!deletedthought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.UserId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;