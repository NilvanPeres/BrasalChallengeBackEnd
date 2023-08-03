const User = require('./user.model');
const utils = require('../../utils')

const userController = {
  createUser: async (req, res) => {
    try {
      const user = new User(req.body);
      user.password = await utils.encryptPassword(user.password);
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: 'Failed to create user', error: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateUser: async (req, res) => {
      try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } catch (err) {
        res.status(400).json({ message: 'Failed to update user', error: err.message });
      }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(204).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = userController;