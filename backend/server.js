require('dotenv').config()

const express = require('express');
const routes = require('./routes');
const path = require('path');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 8080
const ROOT_DIR_VIEWS = '../client'; 

// Middleware
app.use(morgan('dev'));

// Provide static server
app.use(express.static(path.join(__dirname, ROOT_DIR_VIEWS))); 

// Use the routes with your app
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});