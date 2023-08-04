const jwt = require('jsonwebtoken');
const { invalidTokens } = require('./auth.controller'); 
const userRoles = require('../user/user.roles');


const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'É necessário token de autorização para essa rota' });
  }

  if (invalidTokens.has(token)) {
    return res.status(401).json({ message: 'Token é inválido ou expirado' });
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    const role = userRoles[req.user.role];
    console.log('Req permission: ', req.permission);
    console.log('Role: ', role);

    if (!role || !role.can.includes(req.permission)) {
      return res.status(403).json({ message: 'Rota proibida. Usuário sem permissão para essa rota' });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token é inválido ou expirado' });
  }
};
module.exports = authMiddleware;


