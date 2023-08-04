const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const taskController = require('./task.controller');
const taskValidation = require('./task.validation');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  '/task',
  taskValidation.createTask,
  handleValidationErrors,
  taskController.createTask
);

router.put(
  '/task/:id',
  taskValidation.updateTask,
  handleValidationErrors,
  taskController.updateTask
);

router.get('/tasks', taskController.getTasks);

router.get(
  '/task/:id',
  taskValidation.getTaskById,
  handleValidationErrors,
  taskController.getTaskById
);

router.delete(
  '/task/:id',
  taskValidation.deleteTask,
  handleValidationErrors,
  taskController.deleteTask
);

module.exports = router;