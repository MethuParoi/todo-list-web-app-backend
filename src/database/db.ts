const mongoose = require('mongoose');

// Load environment variables
require ('dotenv').config();
const databaseURL = process.env.DATABASE_URL;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(databaseURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },

    firstName: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 30,
    },

    lastName: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 30,
    }
});

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,

        //Reference to user
        ref: "User",
        require: true,
    },

    todo: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 100,
    }
});

//create model from schema 
const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
    User,
    Todo,
};