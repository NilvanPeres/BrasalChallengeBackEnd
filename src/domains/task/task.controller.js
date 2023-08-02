const Task = require('./task.model');

const taskController = {
  createTask: async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: 'Failed to create task', error: err.message });
    }
  },

  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ message: 'Failed to update task', error: err.message });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(204).json(task);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateTaskStatus: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ message: 'Failed to update task status', error: err.message });
    }
  },
};

module.exports = taskController;
