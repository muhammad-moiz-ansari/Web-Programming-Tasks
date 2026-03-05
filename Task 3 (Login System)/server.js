// Import express
const express = require('express');

// Create app
const app = express();

// Telling express to understand data from requests
app.use(express.json());

// Route
app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    res.send(`Recieved: ${username}, ${password}`);
});

// Start server on posrt 3000
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});