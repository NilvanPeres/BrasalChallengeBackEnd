const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../user/user.model');
require('dotenv').config();
const invalidTokens = new Set();

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }

      const payload = { userId: user._id, role: user.role }; 
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secret);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  logout: (req, res) => {
    try {
      const { authorization } = req.headers;
      const token = authorization && authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Nenhum token foi fornecido' });
      }

      const isTokenAdded = invalidTokens.add(token);;

      if (isTokenAdded) {
        res.json({ message: 'Logout realizado com sucesso' });
      } else {
        res.status(500).json({ message: 'Falha ao realizar logout' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = {
  authController,
  invalidTokens
};