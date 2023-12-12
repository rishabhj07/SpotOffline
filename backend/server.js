require('dotenv').config()

const express = require('express');
const routes = require('./routes');
const path = require('path');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 8080

// Middleware
app.use(morgan('dev'));

// Use the routes with your app
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});