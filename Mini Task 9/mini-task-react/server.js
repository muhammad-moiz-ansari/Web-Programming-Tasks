const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. Middleware
app.use(express.json()); 
app.use(cors());

// 2. Create MongoDB Connection
mongoose.connect('mongodb://localhost:27001/myDatabase')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect", err));

// 3. Define a Schema and Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', UserSchema);

// 4. POST Route to insert data
app.post('/add-user', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email
  });
  
  await newUser.save();
  res.send({ message: "Data saved successfully!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));