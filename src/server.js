const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const taskRoutes = require('./routes/index');

// connect to db
connectDB();

// cors
app.use(cors());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api', taskRoutes);


module.exports = app;