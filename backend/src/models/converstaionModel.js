const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    chatHistory: [
        {
            role: {
                type: String,
                enum: ['user', 'assistant'],
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
        },
    ],
    Timestamp: {
        type: Date,
        default: Date.now,
    }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;