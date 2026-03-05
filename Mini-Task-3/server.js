// Import express
const express = require('express');

// Create app
const app = express();

// Import your user.js file
const userRoutes = require('./user');

// Telling express to understand data from requests
app.use(express.json());

// Route
app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

// Mount the user routes
// This tells Express: "Any request starting with /users, send it to user.js"
app.use('/users', userRoutes);

// Start server on port 3000
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});