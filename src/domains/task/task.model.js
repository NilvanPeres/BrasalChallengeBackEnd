const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  body: {type: String, required: true},
  status: {type: String, enum: ['TODO', 'DONE'], default: 'TODO'},
  isCollaborative: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Task', taskSchema);

