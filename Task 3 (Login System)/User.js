const UserModel = require('./UserModel');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;   
    }

    // ──────────────────────── REGISTER ────────────────────────
    async register() {
        try {
            if(!this.username || !this.password)
                return {success: false, message: 'Username or password is missing!'};

            const existing = await UserModel.findOne({username: this.username});
            if (existing) {
                return {success: false, message: `Username \"${this.username}\" already exists.`};
            }
            const newUser = new UserModel({username: this.username, password: this.password});
            await newUser.save();
            return {success: true, message: 'User registered successfully', username: this.username};
        } 
        catch (error) {
            return {success: false, message: 'Registration failed'};
        }
    }

    // ──────────────────────── LOGIN ────────────────────────
    async login() {
        try {
            const exists = await UserModel.findOne({username: this.username});
            if (!exists) {
                return {success: false, message: `Username \"${this.username}\" doesn't exist.`};
            }
            const user = await UserModel.findOne({username: this.username, password: this.password});
            if (!user) {
                return {success: false, message: 'Incorrect password'};
            }
            return {success: true, message: "Login successful", username: this.username};
            }
            catch (error) {
                return {success: false, message: 'Login failed'};
        }
    }
}

module.exports = User;