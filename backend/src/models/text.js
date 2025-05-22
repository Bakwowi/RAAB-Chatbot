const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const TextModel = mongoose.model("Text", textSchema);

module.exports = TextModel;