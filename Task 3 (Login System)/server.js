// Import express
const express = require('express');
const connectDB = require('./db');

// Create app
const app = express();
app.use(express.json());

// Connect to MongoDB Database
connectDB();

// Telling express to understand data from requests
// It runs on every request and converts JSON body into req.body
app.use(express.json());

// Logger middleware (runs on every request)
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

////////////////////
//                //
//     ROUTES     //
//                //
////////////////////
app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password)
        return res.status(400).send('Username or password is missing!');
    res.json({message: 'User registered successfully', username});
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    // if URL is /user/42 → id = "42"
    res.send(`User ID: ${id}`);
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    res.json({message: "Login successful", username});
});

// Protected GET
app.get('/dashboard', isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.session.user.username} to the dashboard!`);
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout successful');
});


// Start server on port 3000
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});