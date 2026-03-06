const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } // In a production app, use bcrypt to hash this!
}, { collection: 'users' });

module.exports = mongoose.model('UserModel', userSchema);