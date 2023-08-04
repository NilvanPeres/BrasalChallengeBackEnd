const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const userController = require('./user.controller');
const userValidation = require('./user.validation');
const authMiddleware = require('../auth/auth.middleware');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const setUpdatePermission = (req, res, next) => {
  req.permission = 'updateUser';
  next();
};

const setDeletePermission = (req, res, next) => {
  req.permission = 'deleteUser';
  next();
};

router.post(
  '/user',
  userValidation.createUser,
  handleValidationErrors,
  userController.createUser
);

router.put(
  '/user/:id',
  setUpdatePermission,
  authMiddleware,
  userValidation.updateUser,
  handleValidationErrors,
  userController.updateUser
);

router.get(
  '/user/:id',
  userValidation.getUser,
  handleValidationErrors,
  userController.getUser
);

router.delete(
  '/user/:id',
  setDeletePermission,
  authMiddleware,
  userValidation.deleteUser,
  handleValidationErrors,
  userController.deleteUser
);

module.exports = router