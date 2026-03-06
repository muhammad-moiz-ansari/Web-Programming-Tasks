const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/studentDB');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;