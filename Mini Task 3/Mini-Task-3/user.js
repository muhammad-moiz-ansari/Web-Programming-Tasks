// Import express
const express = require('express');

// Create router
const router = express.Router();

// Telling express to understand data from requests
router.use(express.json());


router.post('/register', (req, res) => {
    const { username, password } = req.body;
    res.send(`Recieved: ${username}, ${password}`);
});

// 1. GET a specific user by dynamic ID
// Access this via http://localhost:3000/users/42
router.get('/users/:id', (req, res) => {
    const userId = req.params.id; // Captures the 'id' from the URL
    res.send(`Fetching data for user with ID: ${userId}`);
});

// 2. PUT (Update) a specific user
router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username } = req.body; // Getting the new name from the JSON body
    res.send(`User ${userId} has been updated to ${username}`);
});

// 3. DELETE a specific user
router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} has been deleted.`);
});

// Export the router so server.js can see it
module.exports = router;