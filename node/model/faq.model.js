const mongoose = require('mongoose');

const FAQsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });

const faqs = mongoose.model('FAQs', FAQsSchema);

module.exports = faqs;
