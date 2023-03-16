const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongodb');
const User = require('../models/user');
const Thought = require('../models/thought');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single thought by its _id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  const { thoughtText, username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = user._id;

    const thought = new Thought({
      thoughtText,
      username,
      userId
    });

    await thought.save();
    user.thoughts.push(thought._id);
    await user.save();

    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  const { thoughtText } = req.body;

  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { thoughtText },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    await User.updateMany(
      { thoughts: new ObjectID(req.params.id) },
      { $pull: { thoughts: new ObjectID(req.params.id) } }
    );

    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
  const { reactionBody, username } = req.body;

  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.reactions.push({ reactionBody, username });
    await thought.save();

    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    await User.updateMany(
      { thoughts: new ObjectID(req.params.id) },
      { $pull: { thoughts: new ObjectID(req.params.id) } }
    );

    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
  const { reactionBody, username } = req.body;

  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.reactions.push({ reactionBody, username });
    await thought.save();

    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const reaction = thought.reactions.id(req.params.reactionId);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    reaction.remove();
    await thought.save();
    res.json({ message: 'Reaction removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

  