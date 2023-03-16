const express = require(`express`)
const router = express.Router()
const User = require('../models/user')
const Thought = require('../models/thought');


//CREATE ROUTES
//getting routes for all subscribers
router.get('/', async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


//getting one subscriber by its ID , to do: populate thought and friend data
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//creating one subscriber using POST route
// POST a new user
router.post('/', async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
      });
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

//updating one subscriber
// PATCH to update a user by its _id
router.patch('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (req.body.username != null) {
        user.username = req.body.username;
      }
      if (req.body.email != null) {
        user.email = req.body.email;
      }
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//deleting one subscriber
// DELETE to remove user by its _id
router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      await Thought.deleteMany({ username: user.username });
      await user.remove();
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // DELETE route to remove associated Thoughts with deleted Users
  router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      await Thought.deleteMany({ username: deletedUser.username });
      res.json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  



module.exports = router