const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    address:{
        type: String
    },
    userImage:{
        type: String,
        default:"https://via.placeholder.com/150"
    }
});

module.exports = mongoose.model('User', userSchema)