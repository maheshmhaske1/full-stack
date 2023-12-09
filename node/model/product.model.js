const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    },
    price: {
        type: String
    },
    category: {
        type: mongoose.Types.ObjectId
    },
    totalQuantity: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

const products = mongoose.model('products', productSchema);

module.exports = products;
