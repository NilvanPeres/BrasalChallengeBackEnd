const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const userController = require('./user.controller');
const userValidation = require('./user.validation');


router.post('/user', userValidation.createUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.createUser);

router.put('/user/:id', userValidation.updateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.updateUser);

router.get('/user/:id', userValidation.getUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.getUser);

router.delete('/user/:id', userValidation.deleteUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.deleteUser);

module.exports = router;
