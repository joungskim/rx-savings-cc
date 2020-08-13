const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    address: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    city: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    state: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    zip: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Pharmacy', userSchema);