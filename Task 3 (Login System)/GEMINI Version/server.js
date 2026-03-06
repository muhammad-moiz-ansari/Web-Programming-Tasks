// Load environment variables from the root folder
//require('dotenv').config({ path: '../.env' }); 
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const User = require('./classes/User');
const requireAuth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false
}));

// --- ROUTES ---

// 1. Register Route [cite: 30, 31, 32]
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const userInstance = new User(username, password);
    const result = await userInstance.register();

    if (result.success) {
        res.send('User registered successfully'); // [cite: 50]
    } else {
        res.status(400).send(result.message);
    }
});

// 2. Login Route [cite: 33, 34, 35, 36]
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userInstance = new User(username, password);
    const result = await userInstance.login();

    if (result.success) {
        // Create session [cite: 36, 38]
        req.session.user = username; 
        res.send('Login successful'); // [cite: 52]
    } else {
        res.status(401).send(result.message);
    }
});

// 3. Dashboard Route (Protected) [cite: 39, 40]
app.get('/dashboard', requireAuth, (req, res) => {
    // Only logged-in users can access this because of requireAuth middleware [cite: 41]
    res.send(`Welcome ${req.session.user}`); // [cite: 42, 54]
});

// 4. Logout Route [cite: 43, 44, 45]
app.get('/logout', (req, res) => {
    req.session.destroy((err) => { // Destroy session [cite: 45]
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.send('Logout successful'); // [cite: 56]
    });
});

// A simple home route so you don't get the "Cannot GET /" error
app.get('/', (req, res) => {
    res.send('Welcome to the Login System API! Try navigating to /dashboard');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});