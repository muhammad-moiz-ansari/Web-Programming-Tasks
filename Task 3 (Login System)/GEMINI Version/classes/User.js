const UserModel = require('../models/UserSchema');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async register() {
        try {
            // Check if user already exists
            const existingUser = await UserModel.findOne({ username: this.username });
            if (existingUser) {
                return { success: false, message: 'Username already taken' };
            }

            // Save user to MongoDB
            const newUser = new UserModel({
                username: this.username,
                password: this.password
            });
            await newUser.save();
            
            return { success: true, message: 'User registered successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async login() {
        try {
            // Check user from MongoDB
            const user = await UserModel.findOne({ username: this.username, password: this.password });
            if (user) {
                return { success: true, message: 'Login successful' };
            } else {
                return { success: false, message: 'Invalid username or password' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = User;