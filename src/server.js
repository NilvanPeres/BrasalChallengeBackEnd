const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
// connect to db
connectDB();

// cors
app.use(cors());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api', routes.taskRoutes);
app.use('/api', routes.userRoutes);


module.exports = app;