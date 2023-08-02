const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router(); 
const taskController = require('./task.controller');
const taskValidation = require('./task.validation');

router.post('/task', taskValidation.createTask, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, taskController.createTask);

router.put('/task/:id', taskValidation.updateTask, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, taskController.updateTask);

router.get('/tasks', taskController.getTasks);

router.get('/task/:id', taskValidation.getTaskById, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, taskController.getTaskById);

router.delete('/task/:id', taskValidation.deleteTask, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, taskController.deleteTask);

module.exports = router;