const Task = require('./task.model');

const taskController = {
  createTask: async (req, res) => {
    try {
      const { body } = req.body;
      const existingTask = await Task.findOne({ body });
      if (existingTask) {
        return res.status(409).json({ message: 'A tarefa com esse texto já existe.' });
      }
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: 'Falha ao criar tarefa', error: err.message });
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
        return res.status(404).json({ message: 'Tarefa não encontrada' });
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
        return res.status(404).json({ message: 'Tarefa não encontrada' });
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
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      res.status(204).json(task);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

};

module.exports = taskController;
