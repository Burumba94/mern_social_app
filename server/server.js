// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serveStatic = require('serve-static');
const cors = require('cors');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, 'client')));

//Enable cors for routes
app.use(cors());



app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});