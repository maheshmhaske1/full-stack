const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const categories = mongoose.model('categories', categorySchema);

module.exports = categories;
