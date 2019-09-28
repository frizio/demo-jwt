// Model
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: String,
        email: String,
        password: String
    }
);

// Create collection
module.exports = model('User', userSchema);