const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    useFirstName: {
        type: String,
        required: true,
    },
    userLastName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        min: [10, 'not valid mobile'],
        max: [10, 'not valid mobile']
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const users = mongoose.model('users', userSchema);

module.exports = users;
