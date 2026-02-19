var express = require('express');
var app = express();
const userRoute = express.Router(); 
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myproject';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true }); // Added useUnifiedTopology to hide terminal warnings

// --- Missing Functions Added Here ---
const insertUser = function(db, callback) {
  // 1. Point to a collection named 'users' (it will create it automatically if it doesn't exist)
  const collection = db.collection('users');
  
  // 2. Insert a single user document
  collection.insertOne({
    name: "Alex",
    email: "alex@example.com",
    course: "Web Programming"
  }, function(err, result) {
    // 3. Make sure there are no errors
    assert.equal(err, null);
    
    console.log("Successfully inserted a new user into the database!");
    callback(result);
  });
};

const findUser = function(db, callback) {
  console.log("Finding user...");
  callback();
};
// ------------------------------------

app.get('/', function (req, res) {
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to DB server");
    
    const db = client.db(dbName);

    insertUser(db, function() {
      findUser(db, function() {
        client.close();
        // Tell the browser the request is done
        res.send("Database connected, operations complete, and connection closed."); 
      });
    });
  });
});

// --- THIS IS THE MISSING STEP TO START EXPRESS ---
const port = 3000;
app.listen(port, () => {
  console.log(`Express server is running and listening at http://localhost:${port}`);
});