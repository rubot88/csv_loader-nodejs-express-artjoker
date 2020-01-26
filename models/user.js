const { Schema, model } = require('mongoose')

// set schema
const userSchema = new Schema({
    UserName: {
        type: String,
        required: true,
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    }
});

module.exports = model('User', userSchema);
