const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');

// POST to add a new friend to a user's friend list
router.post('/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    const newFriend = {
      friendId: friend._id,
      dateAdded: Date.now()
    };

    user.friends.push(newFriend);
    await user.save();

    res.status(201).json({ message: 'Friend added successfully', newFriend });
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

    user.friends = user.friends.filter(friend => friend.friendId.toString() !== req.params.friendId);
    await user.save();

    res.json({ message: 'Friend removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
