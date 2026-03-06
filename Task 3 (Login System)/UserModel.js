const mongoose = require('mongoose');

// Schema = define the shape of a user document
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Model = your interface to the "users" collection
const UserModel = mongoose.model('User', userSchema);
// It will automatically create collection named "users"

module.exports = UserModel;