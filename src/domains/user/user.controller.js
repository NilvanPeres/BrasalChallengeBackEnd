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
      res.status(400).json({ message: 'Falha ao criar usuário', error: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
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
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        if (req.body.password) {
          user.password = await utils.encryptPassword(req.body.password);
          await user.save();
        }
        res.status(200).json(user);
      } catch (err) {
        res.status(400).json({ message: 'Falha ao atualizar usuário', error: err.message });
      }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.status(204).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = userController;