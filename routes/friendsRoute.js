const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');

// POST to add a new friend to a user's friend list
router.post('/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.friends.includes(req.params.friendId)) {
      return res.status(400).json({ message: 'Friend already added' });
    }
    user.friends.push(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.friends.pull(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
