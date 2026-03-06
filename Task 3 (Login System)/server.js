// Import express
const express = require('express');
const connectDB = require('./db');
const User = require('./User');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

// Create app
const app = express();

connectDB();                // Connect to MongoDB Database

///////////////////////////////////////////////
//                                           //
//     MIDDLEWARE (runs on every request)    //
//                                           //
///////////////////////////////////////////////

// Parse JSON bodies
// Telling express to understand data from requests
// It runs on every request and converts JSON body into req.body
app.use(express.json());    

// User session setup
app.use(session({
    secret: process.env.SESSION_SECRET,    // Used to sign/encrypt the cookie
    resave: false,                  // Dontt save session if unmodified
    saveUninitialized: false,       // Don't create session until some data is stored
    cookie: {
        maxAge: 1000 * 60 * 60      // 1 hour (in ms)
    }
}))

// Logger middleware 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Auth middleware function
function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next(); // user is logged in → continue to route
    } else {
        res.status(401).send('Please login first'); // block them
    }
}

app.use(cors({
    origin: true,           // Allow requests all origins
    credentials: true       // Allow cookies to be sent
}));

////////////////////
//                //
//     ROUTES     //
//                //
////////////////////
// ──────────────────────── Home Page ─────────────────────────
app.get('/', (req, res) => {
    res.send("Home Page");
});

// ───────────────────────── REGISTER ─────────────────────────
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User(username, password);
    const result = await user.register();
    if (result.success)
        return res.send(result.message);
    else
        res.status(400).send(result.message);
});

// ────────────────────────── LOGIN ───────────────────────────
app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = new User(username, password);
    const result = await user.login();

    if(result.success) {
        req.session.user = { username: result.username };
        res.send(result.message);
    }
    else
        res.status(401).send(result.message);
});

// ────────────────── DASHBOARD (Protected) ───────────────────
app.get('/dashboard', isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.session.user.username} to the dashboard!`);
});

// ────────────────────────── LOGOUT ──────────────────────────
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout successful');
});


// Start server on port 3000
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});